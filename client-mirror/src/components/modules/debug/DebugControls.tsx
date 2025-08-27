import React from 'react';

interface DebugControlsProps {
  isInitialized: boolean;
  isAnalyzing: boolean;
  onCaptureDebugImage: () => void;
  onTestMagicMirror: () => void;
}

const DebugControls: React.FC<DebugControlsProps> = ({
  isInitialized,
  isAnalyzing,
  onCaptureDebugImage,
  onTestMagicMirror
}) => {
  return (
    <div className="flex items-center space-x-2">
      <button
        onClick={onCaptureDebugImage}
        disabled={!isInitialized}
        className={`px-3 py-2 rounded text-xs font-medium transition-colors ${
          isInitialized
            ? 'bg-blue-700 hover:bg-blue-600 text-blue-200 border border-blue-600'
            : 'bg-gray-500 cursor-not-allowed text-gray-400 border border-gray-500'
        }`}
      >
        Capture Debug Image
      </button>
      
      <button
        onClick={onTestMagicMirror}
        disabled={isAnalyzing}
        className={`px-3 py-2 rounded text-xs font-medium transition-colors ${
          isAnalyzing
            ? 'bg-gray-500 cursor-not-allowed text-gray-400 border border-gray-500'
            : 'bg-gray-700 hover:bg-gray-600 text-gray-200 border border-gray-600'
        }`}
      >
        {isAnalyzing ? 'Processing...' : 'Magic Mirror TTS'}
      </button>
    </div>
  );
};

export default DebugControls;
