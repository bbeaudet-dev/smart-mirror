import React, { useRef, useEffect } from "react";
import useCameraStatus from "./CameraStatus";

interface PhoneInterfaceProps {}

const PhoneInterface: React.FC<PhoneInterfaceProps> = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  
  const {
    isStreaming,
    isConnecting,
    isConnected,
    stream,
    error,
    startStream,
    stopStream,
    clearError
  } = useCameraStatus();

  // Display phone's own video feed
  useEffect(() => {
    if (videoRef.current && stream) {
      videoRef.current.srcObject = stream;
    }
  }, [stream]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 to-purple-600 text-white font-sans p-3 flex flex-col items-center justify-start pt-8">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold mb-3 text-shadow-lg">Smart Mirror Camera</h2>
        <div className={`inline-block px-4 py-2 rounded-full text-sm font-medium ${
          error ? 'bg-red-500/20 border border-red-500/50 text-red-400' : 
          isConnected ? 'bg-green-500/20 border border-green-500/50 text-green-400' : 
          'bg-blue-500/20 border border-blue-500/50 text-blue-400'
        }`}>
          {error ? "❌ Error" : 
           isConnected ? "Connected to Server" : 
           "Not Connected"}
        </div>
      </div>

      {/* Video Display */}
      <div className="relative w-full max-w-sm h-64 bg-black/30 rounded-2xl overflow-hidden mb-6 flex items-center justify-center">
        <video 
          ref={videoRef} 
          autoPlay 
          playsInline 
          muted 
          className="w-full h-full object-cover"
        />
        {!stream && (
          <div className="absolute inset-0 flex items-center justify-center p-4">
            <p className="text-white/70 text-center text-sm">
              {!isStreaming ? "Press Start button to begin" : "Camera feed loading..."}
            </p>
          </div>
        )}
      </div>

      {/* Camera Controls */}
      <div className="mb-6">
        {!isStreaming ? (
          <button 
            onClick={startStream} 
            disabled={!isConnected || isConnecting}
            className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 min-w-32 ${
              isConnected && !isConnecting
                ? 'bg-green-500 hover:bg-green-600 hover:-translate-y-0.5 hover:shadow-lg'
                : 'bg-gray-500 cursor-not-allowed'
            }`}
          >
            {isConnecting ? 'Connecting...' : 'Start Camera'}
          </button>
        ) : (
          <button 
            onClick={stopStream} 
            className="px-6 py-3 rounded-full font-semibold bg-red-500 hover:bg-red-600 hover:-translate-y-0.5 hover:shadow-lg transition-all duration-300 min-w-32"
          >
            Stop Camera
          </button>
        )}
      </div>

      {/* Error Display */}
      {error && (
        <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4 mb-6 text-center max-w-sm">
          <p className="text-red-300 text-sm">{error}</p>
          <button 
            onClick={clearError}
            className="mt-2 text-red-400 text-xs hover:text-red-300"
          >
            Dismiss
          </button>
        </div>
      )}

      {/* Debug Information */}
      <div className="bg-black/20 border border-white/20 rounded-lg p-3 mb-4 text-center max-w-sm">
        <p className="text-white/70 text-xs mb-1">Debug:</p>
        <p className="text-white/60 text-xs">Server: {window.location.hostname}:5005</p>
        <p className="text-white/60 text-xs">Connected: {isConnected ? 'Yes' : 'No'}</p>
        <p className="text-white/60 text-xs">Streaming: {isStreaming ? 'Yes' : 'No'}</p>
        <p className="text-white/60 text-xs">Camera: {stream ? 'Active' : 'Inactive'}</p>
      </div>
    </div>
  );
};

export default PhoneInterface;
