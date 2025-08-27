import React from 'react';

interface WebcamStatusProps {
  isCapturing: boolean;
  isInitialized: boolean;
  error: string | null;
  stream: MediaStream | null;
  onStartWebcam: () => void;
  onStopWebcam: () => void;
}

const WebcamStatus: React.FC<WebcamStatusProps> = ({
  isCapturing,
  isInitialized,
  error,
  stream,
  onStartWebcam,
  onStopWebcam
}) => {
  // Get webcam status text and light color
  const getWebcamStatus = () => {
    console.log('Webcam state:', { isCapturing, isInitialized, error, stream: !!stream });
    
    if (isCapturing && !isInitialized) {
      return { text: "Starting webcam...", color: "bg-yellow-400" };
    }
    if (isInitialized && !error && stream) {
      return { text: "Webcam active", color: "bg-green-400" };
    }
    if (error) {
      return { text: `Webcam error: ${error}`, color: "bg-red-400" };
    }
    if (isCapturing && isInitialized && !stream) {
      return { text: "Webcam initialized but no stream", color: "bg-orange-400" };
    }
    return { text: "Webcam off", color: "bg-yellow-400" };
  };

  const webcamStatus = getWebcamStatus();

  return (
    <div className="flex items-center space-x-2">
      <div className={`w-2 h-2 rounded-full ${webcamStatus.color} animate-pulse`}></div>
      <div className="text-xs text-gray-400 font-mono">
        {webcamStatus.text}
      </div>
      <button
        onClick={isInitialized ? onStopWebcam : onStartWebcam}
        className={`px-2 py-1 rounded text-xs font-medium transition-colors ${
          isInitialized
            ? 'bg-gray-700 hover:bg-gray-600 text-gray-200 border border-gray-600'
            : 'bg-gray-600 hover:bg-gray-500 text-gray-200 border border-gray-500'
        }`}
      >
        {isInitialized ? 'Stop' : 'Start'}
      </button>
    </div>
  );
};

export default WebcamStatus;
