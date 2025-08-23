import React from 'react';

interface AiControlButtonsProps {
  isInitialized: boolean;
  isAnalyzing: boolean;
  onOutfitAnalysis: () => void;
  onWeatherOutfitAnalysis: () => void;
  onEnhancedAnalysis: () => void;
  onStartWebcam: () => void;
  onStopWebcam: () => void;
}

/**
 * AiControlButtons Component
 * 
 * This component provides all the AI analysis control buttons.
 * Each button triggers a different AI personality or analysis type.
 * Buttons are disabled during analysis to prevent multiple requests.
 */
const AiControlButtons: React.FC<AiControlButtonsProps> = ({
  isInitialized,
  isAnalyzing,

  onOutfitAnalysis,
  onWeatherOutfitAnalysis,
  onEnhancedAnalysis,
  
  onStartWebcam,
  onStopWebcam
}) => {
  return (
    <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 z-40">
      <div className="flex space-x-2">
        {/* Webcam Control Button */}
        <button
          onClick={isInitialized ? onStopWebcam : onStartWebcam}
          className={`px-3 py-2 rounded text-xs font-medium transition-colors ${
            isInitialized
              ? 'bg-red-600 hover:bg-red-700 text-white'
              : 'bg-green-600 hover:bg-green-700 text-white'
          }`}
        >
          {isInitialized ? 'Stop Webcam' : 'Start Webcam'}
        </button>

        <button
          onClick={onOutfitAnalysis}
          disabled={isAnalyzing}
          className={`px-3 py-2 rounded text-xs font-medium transition-colors ${
            isAnalyzing
              ? 'bg-gray-500 cursor-not-allowed'
              : 'bg-yellow-600 hover:bg-yellow-700 text-white'
          }`}
        >
          {isAnalyzing ? 'Processing...' : 'Outfit'}
        </button>

        <button
          onClick={onWeatherOutfitAnalysis}
          disabled={isAnalyzing}
          className={`px-3 py-2 rounded text-xs font-medium transition-colors ${
            isAnalyzing
              ? 'bg-gray-500 cursor-not-allowed'
              : 'bg-indigo-600 hover:bg-indigo-700 text-white'
          }`}
        >
          {isAnalyzing ? 'Processing...' : 'Outfit + Weather'}
        </button>

        <button
          onClick={onEnhancedAnalysis}
          disabled={isAnalyzing}
          className={`px-3 py-2 rounded text-xs font-medium transition-colors ${
            isAnalyzing
              ? 'bg-gray-500 cursor-not-allowed'
              : 'bg-purple-600 hover:bg-purple-700 text-white'
          }`}
        >
          {isAnalyzing ? 'Processing...' : 'Roboflow'}
        </button>
      </div>
    </div>
  );
};

export default AiControlButtons;
