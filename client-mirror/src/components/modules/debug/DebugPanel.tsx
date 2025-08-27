import React, { useState, useEffect, useRef } from 'react';
import { useWebcam } from '../../../hooks/useWebcam';
import { useMotionDetection } from '../../../hooks/useMotionDetection';
import ApiClient from '../../../services/apiClient';
import { speechService } from '../../../services/speechService';

// Import the smaller components
import WebcamStatus from './WebcamStatus';
import MotionStatus from './MotionStatus';
import AutomaticModeToggle from './AutomaticModeToggle';
import DebugControls from './DebugControls';
import AiControlButtons from './AiControlButtons';
import DebugImageDisplay from './DebugImageDisplay';

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

  const [selectedVoice, setSelectedVoice] = useState('nova');
  const [voices, setVoices] = useState<string[]>([]);
  const [isLoadingVoices, setIsLoadingVoices] = useState(true);
  const [isAutomaticMode, setIsAutomaticMode] = useState(true);
  const [lastCapturedImage, setLastCapturedImage] = useState<string | null>(null);
  const [isDebugPanelVisible, setIsDebugPanelVisible] = useState(true);

  // Enhanced motion detection hook with interaction logic
  const {
    isMotionDetected,
    motionLevel,
    isMotionDetectionRunning,
    error: motionError,
    isInteractionActive,
    isAnalyzing,
    analysisCompleteTime,
    startMotionDetection,
    stopMotionDetection,
    resetInteractionState,
    playMotionResponse,
    playWelcomeResponse,
    playSendoffResponse
  } = useMotionDetection(videoRef as React.RefObject<HTMLVideoElement>, {
    threshold: 0.075,
    interval: 100,
    minMotionDuration: 500,
    isAutomaticMode,
    onAiMessage,
    onAiLoading
  });

  // Auto-start webcam when component mounts
  useEffect(() => {
    startWebcam();
    fetchVoices();
    
    return () => {
      stopWebcam();
      stopMotionDetection();
    };
  }, []);

  // Start motion detection when webcam is initialized
  useEffect(() => {
    if (isInitialized && !isMotionDetectionRunning) {
      startMotionDetection();
    }
  }, [isInitialized, isMotionDetectionRunning, startMotionDetection]);

  // Keyboard shortcut to toggle debug panel
  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (event.ctrlKey && event.shiftKey && event.key === 'D') {
        setIsDebugPanelVisible(!isDebugPanelVisible);
        console.log('Debug panel visibility toggled:', !isDebugPanelVisible);
      }
    };

    document.addEventListener('keydown', handleKeyPress);
    return () => document.removeEventListener('keydown', handleKeyPress);
  }, [isDebugPanelVisible]);

  // Set up video element when stream is available
  useEffect(() => {
    if (videoRef.current && stream) {
      videoRef.current.srcObject = stream;
      console.log('Video element stream set');
      
      const handleLoadedMetadata = () => {
        console.log('Video element ready:', {
          videoWidth: videoRef.current?.videoWidth,
          videoHeight: videoRef.current?.videoHeight,
          readyState: videoRef.current?.readyState
        });
      };
      
      videoRef.current.addEventListener('loadedmetadata', handleLoadedMetadata);
      
      return () => {
        if (videoRef.current) {
          videoRef.current.removeEventListener('loadedmetadata', handleLoadedMetadata);
        }
      };
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

  // Debug function to capture and display current frame
  const captureDebugImage = async () => {
    if (!isInitialized || !videoRef.current) {
      console.error("Webcam not initialized or video element not available");
      return;
    }

    try {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      
      if (!ctx) {
        console.error('Could not get canvas context');
        return;
      }

      const video = videoRef.current;
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      
      ctx.drawImage(video, 0, 0);
      
      canvas.toBlob((blob) => {
        if (blob) {
          const imageUrl = URL.createObjectURL(blob);
          setLastCapturedImage(imageUrl);
          console.log('Debug image captured from video:', blob.size, 'bytes');
        }
      }, 'image/jpeg', 0.8);
      
    } catch (error) {
      console.error('Failed to capture debug image:', error);
    }
  };

  // Shared AI Analysis Handler
  const handleAiAnalysis = async (analysisType: 'basic' | 'weather' | 'enhanced' | 'roboflow' | 'magic-mirror' | 'magic-mirror-tts' | 'snoop-tts') => {
    if (!isInitialized) {
      console.error("Webcam not initialized");
      onAiMessage?.("Webcam not initialized. Please start the webcam first.", 'ai-response');
      return;
    }

    onAiLoading?.(true);

    try {
      const blob = await captureFrameAsBlob();
      if (!blob) {
        throw new Error("Failed to capture frame");
      }

      const imageFile = new File([blob], 'analysis.jpg', { type: 'image/jpeg' });
      let result;

      switch (analysisType) {
        case 'basic':
          result = await ApiClient.analyzeOutfit(imageFile) as { analysis: string; audio?: string };
          break;
        case 'weather':
          result = await ApiClient.analyzeOutfitWithWeather(imageFile) as { analysis: string; audio?: string };
          break;
        case 'enhanced':
          result = await ApiClient.analyzeOutfitEnhanced(imageFile) as { analysis: string; audio?: string };
          break;
        case 'roboflow':
          result = await ApiClient.detectClothing(imageFile) as { analysis: string; audio?: string };
          break;
        case 'magic-mirror':
          result = await ApiClient.magicMirrorAnalysis(imageFile) as { analysis: string; audio?: string };
          break;
        case 'magic-mirror-tts':
          result = await ApiClient.magicMirrorTTS(imageFile) as { analysis: string; audio?: string };
          break;
        case 'snoop-tts':
          result = await ApiClient.snoopAnalysis(imageFile) as { analysis: string; audio?: string };
          break;
        default:
          throw new Error(`Unknown analysis type: ${analysisType}`);
      }

      onAiMessage?.(result.analysis, 'ai-response');

      if (result.audio) {
        try {
          const audioBlob = new Blob([Uint8Array.from(atob(result.audio), c => c.charCodeAt(0))], { type: 'audio/opus' });
          const audioUrl = URL.createObjectURL(audioBlob);
          const audio = new Audio(audioUrl);
          
          await audio.play();
          console.log(`Playing ${analysisType} TTS audio with default voice`);
          
          audio.onended = () => {
            URL.revokeObjectURL(audioUrl);
          };
        } catch (audioError) {
          console.error(`Failed to play ${analysisType} TTS audio:`, audioError);
        }
      }

    } catch (error) {
      console.error(`${analysisType} analysis failed:`, error);
      onAiMessage?.(`${analysisType} analysis failed: ${error instanceof Error ? error.message : 'Unknown error'}`, 'ai-response');
    } finally {
      onAiLoading?.(false);
    }
  };

  return (
    <div className="fixed bottom-4 right-6 z-50">
      {/* Video element for frame capture and display */}
      <video
        ref={videoRef}
        autoPlay
        playsInline
        muted
        className={isDebugPanelVisible ? "w-32 h-24 object-cover rounded" : "hidden"}
        style={{
          transform: 'rotate(90deg)',
          transformOrigin: 'center center'
        }}
      />
      
      {/* Debug Panel */}
      {isDebugPanelVisible && (
        <div className="flex flex-col items-end space-y-2 mt-2">
          {/* Webcam Status */}
          <WebcamStatus
            isCapturing={isCapturing}
            isInitialized={isInitialized}
            error={error}
            stream={stream}
            onStartWebcam={startWebcam}
            onStopWebcam={stopWebcam}
          />

          {/* Motion Detection Status */}
          <MotionStatus
            isMotionDetectionActive={isMotionDetectionRunning}
            isMotionDetected={isMotionDetected}
            motionLevel={motionLevel}
          />

          {/* Automatic Mode Toggle */}
          <AutomaticModeToggle
            isAutomaticMode={isAutomaticMode}
            isAnalyzing={isAnalyzing}
            onToggleAutomaticMode={() => {
              const newMode = !isAutomaticMode;
              setIsAutomaticMode(newMode);
              // Reset interaction state when toggling auto mode
              if (newMode) {
                resetInteractionState();
                console.log('Auto mode enabled - interaction state reset');
              }
            }}
          />

          {/* Debug Controls */}
          <DebugControls
            isInitialized={isInitialized}
            isAnalyzing={isAnalyzing}
            onCaptureDebugImage={captureDebugImage}
            onTestMagicMirror={() => handleAiAnalysis('magic-mirror-tts')}
            onTestMotionAudio={playMotionResponse}
            onTestWelcomeAudio={playWelcomeResponse}
            onTestSendoffAudio={playSendoffResponse}
            onResetInteractionState={resetInteractionState}
          />

          {/* AI Control Buttons */}
          <AiControlButtons
            isAnalyzing={isAnalyzing}
            selectedVoice={selectedVoice}
            voices={voices}
            isLoadingVoices={isLoadingVoices}
            onAiAnalysis={handleAiAnalysis}
            onVoiceChange={handleVoiceChange}
          />

          {/* Debug Image Display */}
          <DebugImageDisplay lastCapturedImage={lastCapturedImage} />
        </div>
      )}
    </div>
  );
};

export default DebugPanel;
