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

  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [selectedVoice, setSelectedVoice] = useState('nova');
  const [voices, setVoices] = useState<string[]>([]);
  const [isLoadingVoices, setIsLoadingVoices] = useState(true);
  const [isAutomaticMode, setIsAutomaticMode] = useState(true);
  const [lastCapturedImage, setLastCapturedImage] = useState<string | null>(null);
  const [isDebugPanelVisible, setIsDebugPanelVisible] = useState(true);
  const [analysisCompleteTime, setAnalysisCompleteTime] = useState(0);
  const [isInteractionActive, setIsInteractionActive] = useState(false); // Track if we're in an active interaction
  const isAnalysisRunningRef = useRef(false);
  const lastAnalysisTimeRef = useRef(0);
  const currentInteractionVoiceRef = useRef<string>('coral'); // Track voice for current interaction

  // Pre-generated responses (will be loaded from server)
  const [motionResponses, setMotionResponses] = useState<string[]>([]);
  const [welcomeResponses, setWelcomeResponses] = useState<string[]>([]);
  const [sendoffResponses, setSendoffResponses] = useState<string[]>([]);

  // Motion detection hook
  const {
    isMotionDetected,
    motionLevel,
    isActive: isMotionDetectionActive,
    error: motionError,
    startMotionDetection,
    stopMotionDetection,
    resetMotionDetection
  } = useMotionDetection(videoRef as React.RefObject<HTMLVideoElement>, {
    threshold: 0.075, // 7.5% of pixels must change (balanced sensitivity)
    interval: 100, // 100ms interval
    minMotionDuration: 500 // 0.5 second minimum motion duration
  });

  // Auto-start webcam when component mounts
  useEffect(() => {
    startWebcam();
    fetchVoices();
    loadPreGeneratedResponses();
    
    return () => {
      stopWebcam();
      stopMotionDetection();
    };
  }, []);

  // Load pre-generated responses from server
  const loadPreGeneratedResponses = async () => {
    try {
      const response = await ApiClient.getResponses() as any;
      if (response.success) {
        setMotionResponses(response.responses.motion);
        setWelcomeResponses(response.responses.welcome);
        setSendoffResponses(response.responses.sendoff);
      }
    } catch (error) {
      console.error('Failed to load pre-generated responses:', error);
    }
  };

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

  // Start motion detection when webcam is initialized
  useEffect(() => {
    if (isInitialized && !isMotionDetectionActive) {
      startMotionDetection();
    }
  }, [isInitialized, isMotionDetectionActive, startMotionDetection]);

  // Handle motion detection with proper four-stage flow
  useEffect(() => {
    const now = Date.now();
    const timeSinceLastAnalysis = now - analysisCompleteTime;
    const minTimeBetweenAnalyses = 10000; // 10 seconds as per spec
    
    console.log('Motion detection check:', {
      isAutomaticMode,
      isMotionDetected,
      isAnalyzing,
      isAnalysisRunning: isAnalysisRunningRef.current,
      timeSinceLastAnalysis,
      minTimeBetweenAnalyses,
      canTrigger: timeSinceLastAnalysis > minTimeBetweenAnalyses,
      isInteractionActive
    });
    
    if (isAutomaticMode && isMotionDetected && !isAnalyzing && !isAnalysisRunningRef.current && 
        timeSinceLastAnalysis > minTimeBetweenAnalyses && !isInteractionActive) {
      console.log('Motion detected - starting four-stage flow');
      
      // Set interaction as active immediately
      setIsInteractionActive(true);
      isAnalysisRunningRef.current = true;
      
      // Stage 1: Immediate motion response (pre-generated audio only)
      playMotionResponse();
      
      // Stage 2: Start AI analysis immediately (before welcome message)
      setTimeout(() => {
        console.log('Starting AI analysis before welcome message');
        handleAutomaticAnalysis();
      }, 500); // Start analysis 500ms after motion response
      
      // Stage 3: Welcome message with pause (3 seconds after motion response)
      setTimeout(() => {
        console.log('Playing welcome message');
        playWelcomeResponse();
      }, 3000); // 3 seconds after motion response (increased pause)
    }
  }, [isAutomaticMode, isMotionDetected, isAnalyzing, analysisCompleteTime, isInteractionActive]);

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

  // Pre-generated response functions
  const playMotionResponse = async () => {
    try {
      // Choose a random voice for this interaction cycle
      const voices = ['coral']; // (removed ash for testing)
      const selectedVoice = voices[Math.floor(Math.random() * voices.length)];
      currentInteractionVoiceRef.current = selectedVoice;
      
      console.log(`Starting new interaction with voice: ${selectedVoice}`);
      
      // Get motion response audio with the selected voice
      const audioResponse = await fetch(`${ApiClient.getMotionAudioUrl()}?voice=${selectedVoice}`);
      
      if (audioResponse.ok) {
        const audioBlob = await audioResponse.blob();
        
        console.log(`Playing motion response audio with voice: ${selectedVoice}`);
        console.log('Audio blob size:', audioBlob.size, 'bytes');
        
        // Play the audio (no text display)
        const audioUrl = URL.createObjectURL(audioBlob);
        const audio = new Audio(audioUrl);
        
        // Add error handling for audio playback
        audio.onerror = (e) => {
          console.error('Audio playback error:', e);
          console.error('Audio error details:', audio.error);
        };
        
        audio.onloadstart = () => console.log('Audio loading started');
        audio.oncanplay = () => console.log('Audio can play');
        audio.onplay = () => console.log('Audio playback started');
        
        try {
          await audio.play();
          console.log('Audio play() resolved successfully');
        } catch (playError) {
          console.error('Audio play() failed:', playError);
        }
        
        // Clean up URL when audio finishes
        audio.onended = () => {
          URL.revokeObjectURL(audioUrl);
        };
      }
    } catch (error) {
      console.error('Error playing motion response:', error);
    }
  };

  const playWelcomeResponse = async () => {
    try {
      // Use the same voice as the motion response
      const selectedVoice = currentInteractionVoiceRef.current;
      
      // Get welcome response audio with the same voice
      const audioResponse = await fetch(`${ApiClient.getWelcomeAudioUrl()}?voice=${selectedVoice}`);
      
      if (audioResponse.ok) {
        const audioBlob = await audioResponse.blob();
        
        console.log(`Playing welcome response audio with voice: ${selectedVoice}`);
        console.log('Welcome audio blob size:', audioBlob.size, 'bytes');
        
        // Play the audio (no text display)
        const audioUrl = URL.createObjectURL(audioBlob);
        const audio = new Audio(audioUrl);
        
        // Add error handling for audio playback
        audio.onerror = (e) => {
          console.error('Welcome audio playback error:', e);
          console.error('Welcome audio error details:', audio.error);
        };
        
        audio.onloadstart = () => console.log('Welcome audio loading started');
        audio.oncanplay = () => console.log('Welcome audio can play');
        audio.onplay = () => console.log('Welcome audio playback started');
        
        try {
          await audio.play();
          console.log('Welcome audio play() resolved successfully');
        } catch (playError) {
          console.error('Welcome audio play() failed:', playError);
        }
        
        // Clean up URL when audio finishes
        audio.onended = () => {
          URL.revokeObjectURL(audioUrl);
        };
      }
    } catch (error) {
      console.error('Error playing welcome response:', error);
    }
  };

  const playSendoffResponse = async () => {
    try {
      // Use the same voice as the current interaction
      const selectedVoice = currentInteractionVoiceRef.current;
      
      // Get sendoff response audio with the same voice
      const audioResponse = await fetch(`${ApiClient.getSendoffAudioUrl()}?voice=${selectedVoice}`);
      
      if (audioResponse.ok) {
        const audioBlob = await audioResponse.blob();
        
        console.log(`Playing sendoff response audio with voice: ${selectedVoice}`);
        console.log('Sendoff audio blob size:', audioBlob.size, 'bytes');
        
        // Reset interaction state IMMEDIATELY when sendoff starts (allows new interactions)
        setIsInteractionActive(false);
        isAnalysisRunningRef.current = false;
        setIsAnalyzing(false);
        
        console.log('Interaction state reset immediately when sendoff starts');
        
        // Play the audio (no text display)
        const audioUrl = URL.createObjectURL(audioBlob);
        const audio = new Audio(audioUrl);
        
        // Add error handling for audio playback
        audio.onerror = (e) => {
          console.error('Sendoff audio playback error:', e);
          console.error('Sendoff audio error details:', audio.error);
        };
        
        audio.onloadstart = () => console.log('Sendoff audio loading started');
        audio.oncanplay = () => console.log('Sendoff audio can play');
        audio.onplay = () => console.log('Sendoff audio playback started');
        
        try {
          await audio.play();
          console.log('Sendoff audio play() resolved successfully');
        } catch (playError) {
          console.error('Sendoff audio play() failed:', playError);
        }
        
        // Clean up URL when audio finishes
        audio.onended = () => {
          URL.revokeObjectURL(audioUrl);
          
          // Reset motion detection after sendoff completes
          const now = Date.now();
          lastAnalysisTimeRef.current = now;
          setAnalysisCompleteTime(now);
          resetMotionDetection();
          
          console.log('Motion detection reset after sendoff completes');
        };
      }
    } catch (error) {
      console.error('Error playing sendoff response:', error);
    }
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

  // Automatic Analysis Handler
  const handleAutomaticAnalysis = async () => {
    if (!isInitialized) {
      console.error("Webcam not initialized");
      return;
    }

    // Note: isAnalysisRunningRef.current is already set in motion detection
    console.log('Starting automatic analysis (state already set)');
    setIsAnalyzing(true);
    onAiLoading?.(true);

    try {
      const blob = await captureFrameAsBlob();
      if (!blob) {
        throw new Error("Failed to capture frame");
      }

      const imageFile = new File([blob], 'automatic-analysis.jpg', { type: 'image/jpeg' });
      const result = await ApiClient.automaticAnalysis(imageFile) as { analysis: string; audio?: string };
      
      onAiMessage?.(result.analysis, 'ai-response');
      
      if (result.audio) {
        try {
          const audioBlob = new Blob([Uint8Array.from(atob(result.audio), c => c.charCodeAt(0))], { type: 'audio/opus' });
          const audioUrl = URL.createObjectURL(audioBlob);
          const audio = new Audio(audioUrl);
          
          await audio.play();
          console.log('Playing automatic analysis TTS audio');
          
          audio.onended = () => {
            URL.revokeObjectURL(audioUrl);
            // Play sendoff after analysis audio completes with delay
            setTimeout(() => {
              playSendoffResponse();
            }, 500); // 0.5 second delay between analysis and sendoff
          };
        } catch (audioError) {
          console.error('Failed to play automatic analysis TTS audio:', audioError);
          // Still play sendoff even if analysis audio fails
          playSendoffResponse();
        }
      } else {
        // Play sendoff if no analysis audio
        playSendoffResponse();
      }

    } catch (error) {
      console.error('Automatic analysis failed:', error);
      onAiMessage?.(`Automatic analysis failed: ${error instanceof Error ? error.message : 'Unknown error'}`, 'ai-response');
      // Play sendoff even if analysis fails
      playSendoffResponse();
    } finally {
      isAnalysisRunningRef.current = false;
      onAiLoading?.(false);
      // Note: isAnalyzing and motion detection reset are now handled in playSendoffResponse
    }
  };

  // Shared AI Analysis Handler
  const handleAiAnalysis = async (analysisType: 'basic' | 'weather' | 'enhanced' | 'roboflow' | 'magic-mirror' | 'magic-mirror-tts' | 'snoop-tts') => {
    if (!isInitialized) {
      console.error("Webcam not initialized");
      onAiMessage?.("Webcam not initialized. Please start the webcam first.", 'ai-response');
      return;
    }

    setIsAnalyzing(true);
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
      setIsAnalyzing(false);
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
            isMotionDetectionActive={isMotionDetectionActive}
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
              // Reset analysis time when toggling auto mode to allow immediate motion detection
              if (newMode) {
                setAnalysisCompleteTime(0);
                setIsInteractionActive(false);
                isAnalysisRunningRef.current = false;
                console.log('Auto mode enabled - motion detection and interaction state reset');
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
            onTestAudioSystem={() => {
              console.log('Testing audio system...');
              const testAudio = new Audio('data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhBSuBzvLZiTYIG2m98OScTgwOUarm7blmGgU7k9n1unEiBC13yO/eizEIHWq+8+OWT');
              testAudio.onerror = (e) => console.error('Test audio error:', e);
              testAudio.onloadstart = () => console.log('Test audio loading');
              testAudio.oncanplay = () => console.log('Test audio can play');
              testAudio.onplay = () => console.log('Test audio playing');
              testAudio.play().then(() => console.log('Test audio started')).catch(e => console.error('Test audio failed:', e));
            }}
            onResetMotionDetection={() => {
              setAnalysisCompleteTime(0);
              setIsInteractionActive(false);
              isAnalysisRunningRef.current = false;
              resetMotionDetection();
              console.log('Motion detection and interaction state manually reset');
            }}
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
