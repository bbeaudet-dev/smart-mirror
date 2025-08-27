import React from 'react';

interface DebugControlsProps {
  isInitialized: boolean;
  isAnalyzing: boolean;
  onCaptureDebugImage: () => void;
  onTestMagicMirror: () => void;
  onTestMotionAudio: () => Promise<void>;
  onTestWelcomeAudio: () => Promise<void>;
  onTestSendoffAudio: () => Promise<void>;
  onResetInteractionState: () => void;
}

const DebugControls: React.FC<DebugControlsProps> = ({
  isInitialized,
  isAnalyzing,
  onCaptureDebugImage,
  onTestMagicMirror,
  onTestMotionAudio,
  onTestWelcomeAudio,
  onTestSendoffAudio,
  onResetInteractionState
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
      
      <button
        onClick={onTestMotionAudio}
        disabled={isAnalyzing}
        className={`px-3 py-2 rounded text-xs font-medium transition-colors ${
          isAnalyzing
            ? 'bg-gray-500 cursor-not-allowed text-gray-400 border border-gray-500'
            : 'bg-green-700 hover:bg-green-600 text-green-200 border border-green-600'
        }`}
      >
        Test Motion Audio
      </button>
      
      <button
        onClick={onTestWelcomeAudio}
        disabled={isAnalyzing}
        className={`px-3 py-2 rounded text-xs font-medium transition-colors ${
          isAnalyzing
            ? 'bg-gray-500 cursor-not-allowed text-gray-400 border border-gray-500'
            : 'bg-blue-700 hover:bg-blue-600 text-blue-200 border border-blue-600'
        }`}
      >
        Test Welcome Audio
      </button>
      
      <button
        onClick={onTestSendoffAudio}
        disabled={isAnalyzing}
        className={`px-3 py-2 rounded text-xs font-medium transition-colors ${
          isAnalyzing
            ? 'bg-gray-500 cursor-not-allowed text-gray-400 border border-gray-500'
            : 'bg-purple-700 hover:bg-purple-600 text-purple-200 border border-purple-600'
        }`}
      >
        Test Sendoff Audio
      </button>
      
      <button
        onClick={onResetInteractionState}
        disabled={isAnalyzing}
        className={`px-3 py-2 rounded text-xs font-medium transition-colors ${
          isAnalyzing
            ? 'bg-gray-500 cursor-not-allowed text-gray-400 border border-gray-500'
            : 'bg-red-700 hover:bg-red-600 text-red-200 border border-red-600'
        }`}
      >
        Reset Interaction State
      </button>
    </div>
  );
};

export default DebugControls;
