import React from 'react';

interface VideoFeedProps {
  stream: MediaStream | null;
  isInitialized: boolean;
  isCapturing: boolean;
  error: string | null;
  videoRef: React.RefObject<HTMLVideoElement | null>;
}

/**
 * VideoFeed Component
 * 
 * This component handles the display of the live webcam video feed.
 * It shows the video when available, loading states when initializing,
 * and error messages when the webcam is unavailable.
 */
const VideoFeed: React.FC<VideoFeedProps> = ({ 
  stream, 
  isInitialized, 
  isCapturing, 
  error, 
  videoRef 
}) => {
  return (
    <div className="flex-1 relative bg-black/20 rounded-lg overflow-hidden mb-4">
      {/* Live Video Feed */}
      {stream && isInitialized ? (
        <div className="w-full h-full flex items-center justify-center p-4">
          <video
            ref={videoRef}
            autoPlay
            playsInline
            muted
            className="h-48 w-auto"
            style={{
              transform: 'rotate(90deg)',
              transformOrigin: 'center center'
            }}
          />
        </div>
      ) : (
        /* Loading/Error State */
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <p className="text-mirror-xs text-mirror-text">
              {isCapturing ? "Starting webcam..." : "Webcam not available"}
            </p>
          </div>
        </div>
      )}

      {/* Error Display */}
      {error && (
        <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-2 mt-2">
          <p className="text-red-300 text-xs">{error}</p>
        </div>
      )}
    </div>
  );
};

export default VideoFeed;
