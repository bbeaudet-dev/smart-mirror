import React, { useState, useEffect, useRef } from 'react';
import { useWebcam } from '../../../hooks/useWebcam';
import ApiClient from '../../../services/apiClient';
import { speechService } from '../../../services/speechService';

interface DebugPanelProps {
  onAiMessage?: (message: string, type: 'ai-response' | 'outfit-analysis' | 'general') => void;
  onAiLoading?: (loading: boolean) => void;
}

const DebugPanel: React.FC<DebugPanelProps> = ({ onAiMessage, onAiLoading }) => {
  const {
    stream,
    isCapturing,
    isInitialized,
    error,
    videoRef,
    startWebcam,
    stopWebcam,
    captureFrameAsBlob
  } = useWebcam();

  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [detections, setDetections] = useState<any[]>([]);
  const [selectedVoice, setSelectedVoice] = useState('nova');
  const [voices, setVoices] = useState<string[]>([]);
  const [isLoadingVoices, setIsLoadingVoices] = useState(true);
  const devVideoRef = useRef<HTMLVideoElement>(null);

  // Auto-start webcam when component mounts
  useEffect(() => {
    startWebcam();
    fetchVoices();
    
    // Cleanup on unmount
    return () => {
      stopWebcam();
    };
  }, []); // Empty dependency array - only run once

  // Set up development video element when stream is available
  useEffect(() => {
    if (devVideoRef.current && stream) {
      devVideoRef.current.srcObject = stream;
    }
  }, [stream]);

  const fetchVoices = async () => {
    try {
      const response = await fetch('http://localhost:5005/api/tts/voices');
      const data = await response.json();
      setVoices(data.voices || []);
    } catch (error) {
      console.error('Error fetching voices:', error);
    } finally {
      setIsLoadingVoices(false);
    }
  };

  const handleVoiceChange = (voice: string) => {
    setSelectedVoice(voice);
  };

  /**
   * Shared AI Analysis Handler
   * 
   * This function handles basic outfit analysis, weather-aware outfit analysis, and enhanced analysis.
   * It captures a webcam frame and sends it to the appropriate AI service based on the type.
   */
  const handleAiAnalysis = async (analysisType: 'basic' | 'weather' | 'enhanced' | 'roboflow' | 'magic-mirror' | 'magic-mirror-tts' | 'snoop-tts') => {
    if (!isInitialized) {
      console.error("Webcam not initialized");
      onAiMessage?.("Webcam not initialized. Please start the webcam first.", 'ai-response');
      return;
    }

    setIsAnalyzing(true);
    onAiLoading?.(true);

    try {
      // Step 1: Capture current webcam frame as a blob
      const blob = await captureFrameAsBlob();
      if (!blob) {
        throw new Error("Failed to capture frame");
      }

      // Step 2: Convert blob to File object for API transmission
      const filename = analysisType === 'weather' ? 'weather-outfit-analysis.jpg' 
        : analysisType === 'enhanced' ? 'enhanced-analysis.jpg' 
        : analysisType === 'magic-mirror' ? 'magic-mirror-analysis.jpg'
        : analysisType === 'magic-mirror-tts' ? 'magic-mirror-tts-analysis.jpg'
        : analysisType === 'snoop-tts' ? 'snoop-tts-analysis.jpg'
        : 'outfit-analysis.jpg';
      const imageFile = new File([blob], filename, { type: 'image/jpeg' });
      
      // Step 3: Send to appropriate AI service with voice preference
      let result;
      if (analysisType === 'enhanced') {
        result = await ApiClient.analyzeOutfitEnhanced(imageFile) as any;
        // Update detections state for overlay display
        setDetections(result.detections || []);
      } else if (analysisType === 'weather') {
        // Create FormData with voice preference
        const formData = new FormData();
        formData.append('image', imageFile);
        formData.append('voice', selectedVoice);
        
        const response = await fetch('http://localhost:5005/api/ai/analyze-outfit-with-weather', {
          method: 'POST',
          body: formData,
        });
        result = await response.json();
      } else if (analysisType === 'magic-mirror') {
        // Magic Mirror - text only, no voice needed
        result = await ApiClient.magicMirrorAnalysis(imageFile) as any;
      } else if (analysisType === 'magic-mirror-tts') {
        // Magic Mirror with TTS - uses fable voice
        result = await ApiClient.magicMirrorTTS(imageFile) as any;
      } else if (analysisType === 'snoop-tts') {
        // Snoop TTS - uses onyx voice
        result = await ApiClient.snoopAnalysis(imageFile) as any;
      } else if (analysisType === 'roboflow') {
        result = await ApiClient.detectClothing(imageFile) as any;
        // Update detections state for overlay display
        setDetections(result.detections || []);
      } else {
        // Create FormData with voice preference
        const formData = new FormData();
        formData.append('image', imageFile);
        formData.append('voice', selectedVoice);
        
        const response = await fetch('http://localhost:5005/api/ai/analyze-outfit', {
          method: 'POST',
          body: formData,
        });
        result = await response.json();
      }
      
      // Step 4: Display the response and play audio if available
      if (analysisType === 'roboflow') {
        // Pure Roboflow detection - format the response
        if (result.detections && result.detections.length > 0) {
          const detectedItems = result.detections.map((d: any) => 
            `${d.label} (${(d.confidence * 100).toFixed(0)}% confidence)`
          ).join(', ');
          
          const roboflowMessage = `ROBOFLOW DETECTION: I detected the following clothing items: ${detectedItems}`;
          onAiMessage?.(roboflowMessage, 'ai-response');
          speechService.speak(roboflowMessage);
        } else {
          const noDetectionMessage = "ROBOFLOW DETECTION: No clothing items detected in the image.";
          onAiMessage?.(noDetectionMessage, 'ai-response');
          speechService.speak(noDetectionMessage);
        }
      } else if (analysisType === 'magic-mirror') {
        // Magic Mirror - text only, no audio
        onAiMessage?.(result.analysis, 'ai-response');
        // No TTS for speed
      } else if (analysisType === 'magic-mirror-tts') {
        // Magic Mirror with TTS - play audio if available
        onAiMessage?.(result.analysis, 'ai-response');
        
        // Play audio immediately if provided in response
        if (result.audio) {
          try {
            const audioBlob = new Blob([Uint8Array.from(atob(result.audio), c => c.charCodeAt(0))], { type: 'audio/opus' });
            const audioUrl = URL.createObjectURL(audioBlob);
            const audio = new Audio(audioUrl);
            
            await audio.play();
            console.log('Playing Magic Mirror TTS audio with fable voice');
            
            // Clean up URL when audio finishes
            audio.onended = () => {
              URL.revokeObjectURL(audioUrl);
            };
          } catch (audioError) {
            console.error('Failed to play Magic Mirror TTS audio:', audioError);
          }
        }
      } else if (analysisType === 'snoop-tts') {
        // Snoop TTS - play audio if available
        onAiMessage?.(result.analysis, 'ai-response');
        
        // Play audio immediately if provided in response
        if (result.audio) {
          try {
            const audioBlob = new Blob([Uint8Array.from(atob(result.audio), c => c.charCodeAt(0))], { type: 'audio/opus' });
            const audioUrl = URL.createObjectURL(audioBlob);
            const audio = new Audio(audioUrl);
            
            await audio.play();
            console.log('Playing Snoop TTS audio with onyx voice');
            
            // Clean up URL when audio finishes
            audio.onended = () => {
              URL.revokeObjectURL(audioUrl);
            };
          } catch (audioError) {
            console.error('Failed to play Snoop TTS audio:', audioError);
          }
        }
      } else {
        // AI analysis responses with combined audio
        onAiMessage?.(result.analysis, 'ai-response');
        
        // Play audio immediately if provided in response
        if (result.audio) {
          try {
            const audioBlob = new Blob([Uint8Array.from(atob(result.audio), c => c.charCodeAt(0))], { type: 'audio/opus' });
            const audioUrl = URL.createObjectURL(audioBlob);
            const audio = new Audio(audioUrl);
            
            await audio.play();
            console.log('Playing pre-generated opus audio with voice:', result.voice);
            
            // Clean up URL when audio finishes
            audio.onended = () => {
              URL.revokeObjectURL(audioUrl);
            };
          } catch (audioError) {
            console.error('Failed to play pre-generated audio, falling back to TTS:', audioError);
            speechService.speak(result.analysis);
          }
        } else {
          // Fallback to TTS if no audio provided
          speechService.speak(result.analysis);
        }
      }
      
    } catch (error) {
      const errorType = analysisType === 'weather' ? 'Weather outfit analysis' 
        : analysisType === 'enhanced' ? 'Enhanced analysis' 
        : analysisType === 'roboflow' ? 'Roboflow detection'
        : analysisType === 'magic-mirror' ? 'Magic Mirror analysis'
        : analysisType === 'magic-mirror-tts' ? 'Magic Mirror TTS analysis'
        : analysisType === 'snoop-tts' ? 'Snoop TTS analysis'
        : 'Outfit analysis';
      console.error(`${errorType} failed:`, error);
      const errorMessage = error instanceof Error ? error.message : `${errorType} failed. Please try again.`;
      onAiMessage?.(errorMessage, 'ai-response');
    } finally {
      setIsAnalyzing(false);
      onAiLoading?.(false);
    }
  };

  // Wrapper functions for the buttons
  const handleOutfitAnalysis = () => handleAiAnalysis('basic');
  const handleWeatherOutfitAnalysis = () => handleAiAnalysis('weather');
  const handleEnhancedAnalysis = () => handleAiAnalysis('enhanced');
  const handleRoboflowDetection = () => handleAiAnalysis('roboflow');
  const handleMagicMirrorAnalysis = () => handleAiAnalysis('magic-mirror');
  const handleMagicMirrorTTS = () => handleAiAnalysis('magic-mirror-tts');
  const handleSnoopTTS = () => handleAiAnalysis('snoop-tts');

  // Get webcam status text and light color
  const getWebcamStatus = () => {
    console.log('Webcam state:', { isCapturing, isInitialized, error });
    
    if (isCapturing) {
      return { text: "Starting webcam...", color: "bg-yellow-400" };
    }
    if (isInitialized && !error) {
      return { text: "Webcam active", color: "bg-green-400" };
    }
    if (error) {
      return { text: "Webcam unavailable", color: "bg-red-400" };
    }
    return { text: "Webcam off", color: "bg-yellow-400" };
  };

  const webcamStatus = getWebcamStatus();

  return (
    <div className="fixed bottom-4 right-6 z-50">
      {/* Hidden video element for frame capture */}
      <video
        ref={videoRef}
        autoPlay
        playsInline
        muted
        className="hidden"
        style={{ width: '1px', height: '1px' }}
      />
      
      {/* Development-only video feed */}
      {process.env.NODE_ENV === 'development' && (
        <div className="mb-4 p-2 bg-black/20 rounded border border-gray-600">
          <div className="text-xs text-gray-400 mb-2">DEV: Webcam Feed</div>
          <video
            ref={devVideoRef}
            autoPlay
            playsInline
            muted
            className="w-32 h-24 object-cover rounded"
            style={{
              transform: 'rotate(90deg)',
              transformOrigin: 'center center'
            }}
          />
        </div>
      )}
      
      <div className="flex flex-col items-end space-y-2">
        {/* Webcam Status */}
        <div className="flex items-center space-x-2">
          {/* Status Light */}
          <div className={`w-2 h-2 rounded-full ${webcamStatus.color} animate-pulse`}></div>
          {/* Status Text */}
          <div className="text-xs text-gray-400 font-mono">
            {webcamStatus.text}
          </div>
        </div>
        
        {/* Row 1: Webcam Control + Basic Analysis */}
        <div className="flex space-x-2">
          <button
            onClick={isInitialized ? stopWebcam : startWebcam}
            className={`px-3 py-2 rounded text-xs font-medium transition-colors ${
              isInitialized
                ? 'bg-gray-700 hover:bg-gray-600 text-gray-200 border border-gray-600'
                : 'bg-gray-600 hover:bg-gray-500 text-gray-200 border border-gray-500'
            }`}
          >
            {isInitialized ? 'Stop Webcam' : 'Start Webcam'}
          </button>

          <button
            onClick={handleOutfitAnalysis}
            disabled={isAnalyzing}
            className={`px-3 py-2 rounded text-xs font-medium transition-colors ${
              isAnalyzing
                ? 'bg-gray-500 cursor-not-allowed text-gray-400 border border-gray-500'
                : 'bg-gray-700 hover:bg-gray-600 text-gray-200 border border-gray-600'
            }`}
          >
            {isAnalyzing ? 'Processing...' : 'Outfit'}
          </button>

          <button
            onClick={handleWeatherOutfitAnalysis}
            disabled={isAnalyzing}
            className={`px-3 py-2 rounded text-xs font-medium transition-colors ${
              isAnalyzing
                ? 'bg-gray-500 cursor-not-allowed text-gray-400 border border-gray-500'
                : 'bg-gray-700 hover:bg-gray-600 text-gray-200 border border-gray-600'
            }`}
          >
            {isAnalyzing ? 'Processing...' : 'Weather + Outfit'}
          </button>

          <button
            onClick={handleRoboflowDetection}
            disabled={isAnalyzing}
            className={`px-3 py-2 rounded text-xs font-medium transition-colors ${
              isAnalyzing
                ? 'bg-gray-500 cursor-not-allowed text-gray-400 border border-gray-500'
                : 'bg-gray-700 hover:bg-gray-600 text-gray-200 border border-gray-600'
            }`}
          >
            {isAnalyzing ? 'Processing...' : 'Detect'}
          </button>
        </div>

        {/* Row 2: Advanced Analysis + Voice Selector */}
        <div className="flex space-x-2 items-center">
          <button
            onClick={handleEnhancedAnalysis}
            disabled={isAnalyzing}
            className={`px-3 py-2 rounded text-xs font-medium transition-colors ${
              isAnalyzing
                ? 'bg-gray-500 cursor-not-allowed text-gray-400 border border-gray-500'
                : 'bg-gray-700 hover:bg-gray-600 text-gray-200 border border-gray-600'
            }`}
          >
            {isAnalyzing ? 'Processing...' : 'Enhanced'}
          </button>

          <button
            onClick={handleMagicMirrorAnalysis}
            disabled={isAnalyzing}
            className={`px-3 py-2 rounded text-xs font-medium transition-colors ${
              isAnalyzing
                ? 'bg-gray-500 cursor-not-allowed text-gray-400 border border-gray-500'
                : 'bg-gray-700 hover:bg-gray-600 text-gray-200 border border-gray-600'
            }`}
          >
            {isAnalyzing ? 'Processing...' : 'Magic Mirror'}
          </button>

          <button
            onClick={handleMagicMirrorTTS}
            disabled={isAnalyzing}
            className={`px-3 py-2 rounded text-xs font-medium transition-colors ${
              isAnalyzing
                ? 'bg-gray-500 cursor-not-allowed text-gray-400 border border-gray-500'
                : 'bg-gray-700 hover:bg-gray-600 text-gray-200 border border-gray-600'
            }`}
          >
            {isAnalyzing ? 'Processing...' : 'Magic Mirror TTS'}
          </button>

          <button
            onClick={handleSnoopTTS}
            disabled={isAnalyzing}
            className={`px-3 py-2 rounded text-xs font-medium transition-colors ${
              isAnalyzing
                ? 'bg-gray-500 cursor-not-allowed text-gray-400 border border-gray-500'
                : 'bg-gray-700 hover:bg-gray-600 text-gray-200 border border-gray-600'
            }`}
          >
            {isAnalyzing ? 'Processing...' : 'Snoop TTS'}
          </button>

          {/* Voice Selector */}
          <div className="flex items-center space-x-2 ml-2">
            <label className="text-xs text-gray-300 font-medium">Voice:</label>
            <select
              value={selectedVoice}
              onChange={(e) => handleVoiceChange(e.target.value)}
              disabled={isLoadingVoices}
              className="px-2 py-1 rounded text-xs bg-gray-700 text-gray-200 border border-gray-600 focus:outline-none focus:border-gray-500"
            >
              {isLoadingVoices ? (
                <option>Loading...</option>
              ) : (
                voices.map((voice) => (
                  <option key={voice} value={voice}>
                    {voice}
                  </option>
                ))
              )}
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DebugPanel;
