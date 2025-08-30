import React, { useState, useEffect, useRef } from 'react';
import { useWebcam } from '../../../hooks/useWebcam';
import { useMotionDetection } from '../../../hooks/useMotionDetection';
import ApiClient from '../../../services/apiClient';
import { speechService } from '../../../services/speechService';

// Import the smaller components
// import WebcamStatus from './WebcamStatus';
// import MotionStatus from './MotionStatus';

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

  // Auto mode is always on for production
  const isAutomaticMode = true;
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

  // Keyboard shortcut removed - not working properly
  // useEffect(() => {
  //   const handleKeyPress = (event: KeyboardEvent) => {
  //     if (event.ctrlKey && event.shiftKey && event.key === 'D') {
  //       setIsDebugPanelVisible(!isDebugPanelVisible);
  //       console.log('Debug panel visibility toggled:', !isDebugPanelVisible);
  //     }
  //   };

  //   document.addEventListener('keydown', handleKeyPress);
  //   return () => document.removeEventListener('keydown', handleKeyPress);
  // }, [isDebugPanelVisible]);

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

  return (
    <div className="fixed bottom-4 right-6 z-50">
      {/* Video element for frame capture (hidden for production) */}
      <video
        ref={videoRef}
        autoPlay
        playsInline
        muted
        className="hidden"
        style={{
          transform: 'rotate(90deg)',
          transformOrigin: 'center center'
        }}
      />
      
      {/* Debug Panel - Status elements removed for cleaner interface */}
      {isDebugPanelVisible && (
        <div className="flex flex-col items-end space-y-2 mt-2">
          {/* Status elements removed - will be added back in future */}
          {/* WebcamStatus and MotionStatus components commented out */}
          
          {/* Debug Image Display */}
          <DebugImageDisplay lastCapturedImage={lastCapturedImage} />
        </div>
      )}
    </div>
  );
};

export default DebugPanel;
