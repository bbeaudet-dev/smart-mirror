import React, { useState, useEffect } from 'react';
import { useWebcam } from '../../../hooks/useWebcam';

const WebcamPanel: React.FC = () => {
  const {
    stream,
    isCapturing,
    isInitialized,
    error,
    videoRef,
    startWebcam,
    stopWebcam,
    captureFrame,
    captureFrameAsBlob
  } = useWebcam();

  const [lastCapturedFrame, setLastCapturedFrame] = useState<string | null>(null);
  const [captureCount, setCaptureCount] = useState(0);

  // Auto-start webcam when component mounts
  useEffect(() => {
    startWebcam();
    
    // Cleanup on unmount
    return () => {
      stopWebcam();
    };
  }, []);

  const handleCaptureFrame = () => {
    const frameData = captureFrame();
    if (frameData) {
      setLastCapturedFrame(frameData);
      setCaptureCount(prev => prev + 1);
      console.log(`Frame captured! Total captures: ${captureCount + 1}`);
    } else {
      console.error("Failed to capture frame");
    }
  };

  const handleCaptureBlob = async () => {
    const blob = await captureFrameAsBlob();
    if (blob) {
      console.log("Captured blob:", blob.size, "bytes");
      // Convert blob to data URL for display
      const reader = new FileReader();
      reader.onload = (e) => {
        setLastCapturedFrame(e.target?.result as string);
        setCaptureCount(prev => prev + 1);
      };
      reader.readAsDataURL(blob);
    } else {
      console.error("Failed to capture blob");
    }
  };

  return (
    <div className="flex flex-col h-full">
      <h3 className="mirror-header">
        Webcam
        {isCapturing && <span className="text-mirror-xs text-mirror-text-dimmed animate-spin ml-1">⟳</span>}
      </h3>
      
      {/* Video Feed */}
      <div className="flex-1 relative bg-black/20 rounded-lg overflow-hidden mb-4">
        {stream && isInitialized ? (
          <video
            ref={videoRef}
            autoPlay
            playsInline
            muted
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <div className="text-mirror-lg text-mirror-text-dimmed mb-2">📷</div>
              <p className="text-mirror-xs text-mirror-text">
                {isCapturing ? "Starting webcam..." : "Webcam not available"}
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Error Display */}
      {error && (
        <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-2 mb-4">
          <p className="text-red-300 text-xs">{error}</p>
        </div>
      )}

      {/* Controls */}
      <div className="flex flex-col space-y-2 mb-4">
        <button
          onClick={isInitialized ? stopWebcam : startWebcam}
          className={`px-3 py-1 rounded text-xs font-medium transition-colors ${
            isInitialized
              ? 'bg-red-500 hover:bg-red-600 text-white'
              : 'bg-green-500 hover:bg-green-600 text-white'
          }`}
        >
          {isInitialized ? 'Stop Webcam' : 'Start Webcam'}
        </button>
        
        {isInitialized && (
          <div className="flex space-x-2">
            <button
              onClick={handleCaptureFrame}
              className="px-3 py-1 rounded text-xs font-medium bg-blue-500 hover:bg-blue-600 text-white transition-colors"
            >
              Capture Frame
            </button>
            <button
              onClick={handleCaptureBlob}
              className="px-3 py-1 rounded text-xs font-medium bg-purple-500 hover:bg-purple-600 text-white transition-colors"
            >
              Capture Blob
            </button>
          </div>
        )}
      </div>

      {/* Status Info */}
      <div className="bg-black/10 rounded-lg p-2 text-xs">
        <p className="text-mirror-text-dimmed mb-1">Status:</p>
        <p className="text-mirror-text">Webcam: {isInitialized ? 'Active' : 'Inactive'}</p>
        <p className="text-mirror-text">Captures: {captureCount}</p>
        {stream && (
          <p className="text-mirror-text">
            Resolution: {videoRef.current?.videoWidth || 0} x {videoRef.current?.videoHeight || 0}
          </p>
        )}
      </div>

      {/* Last Captured Frame Preview */}
      {lastCapturedFrame && (
        <div className="mt-4">
          <p className="text-mirror-xs text-mirror-text-dimmed mb-2">Last Capture:</p>
          <img
            src={lastCapturedFrame}
            alt="Captured frame"
            className="w-full h-20 object-cover rounded border border-white/20"
          />
        </div>
      )}
    </div>
  );
};

export default WebcamPanel;
