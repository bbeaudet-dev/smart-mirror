import React from 'react';

interface AiControlButtonsProps {
  isInitialized: boolean;
  isAnalyzing: boolean;
  onTestAI: () => void;
  onOutfitAnalysis: () => void;
  onWeatherOutfitAnalysis: () => void;
  onMotivation: () => void;
  onSnoopStyle: () => void;
  onSnoopWeather: () => void;
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
  onTestAI,
  onOutfitAnalysis,
  onWeatherOutfitAnalysis,
  onMotivation,
  onSnoopStyle,
  onSnoopWeather,
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

        {/* AI Analysis Buttons */}
        <button
          onClick={onTestAI}
          disabled={isAnalyzing}
          className={`px-3 py-2 rounded text-xs font-medium transition-colors ${
            isAnalyzing
              ? 'bg-gray-500 cursor-not-allowed'
              : 'bg-green-600 hover:bg-green-700 text-white'
          }`}
        >
          {isAnalyzing ? 'Processing...' : 'AI Analysis'}
        </button>

        <button
          onClick={onOutfitAnalysis}
          disabled={isAnalyzing}
          className={`px-3 py-2 rounded text-xs font-medium transition-colors ${
            isAnalyzing
              ? 'bg-gray-500 cursor-not-allowed'
              : 'bg-purple-600 hover:bg-purple-700 text-white'
          }`}
        >
          {isAnalyzing ? 'Processing...' : 'Fashion'}
        </button>

        <button
          onClick={onWeatherOutfitAnalysis}
          disabled={isAnalyzing}
          className={`px-3 py-2 rounded text-xs font-medium transition-colors ${
            isAnalyzing
              ? 'bg-gray-500 cursor-not-allowed'
              : 'bg-orange-600 hover:bg-orange-700 text-white'
          }`}
        >
          {isAnalyzing ? 'Processing...' : 'Critical Fashion'}
        </button>

        <button
          onClick={onMotivation}
          disabled={isAnalyzing}
          className={`px-3 py-2 rounded text-xs font-medium transition-colors ${
            isAnalyzing
              ? 'bg-gray-500 cursor-not-allowed'
              : 'bg-blue-600 hover:bg-blue-700 text-white'
          }`}
        >
          {isAnalyzing ? 'Processing...' : 'Inspire'}
        </button>

        <button
          onClick={onSnoopStyle}
          disabled={isAnalyzing}
          className={`px-3 py-2 rounded text-xs font-medium transition-colors ${
            isAnalyzing
              ? 'bg-gray-500 cursor-not-allowed'
              : 'bg-yellow-600 hover:bg-yellow-700 text-white'
          }`}
        >
          {isAnalyzing ? 'Processing...' : 'Snoop Style'}
        </button>

        <button
          onClick={onSnoopWeather}
          disabled={isAnalyzing}
          className={`px-3 py-2 rounded text-xs font-medium transition-colors ${
            isAnalyzing
              ? 'bg-gray-500 cursor-not-allowed'
              : 'bg-indigo-600 hover:bg-indigo-700 text-white'
          }`}
        >
          {isAnalyzing ? 'Processing...' : 'Snoop Weather'}
        </button>
      </div>
    </div>
  );
};

export default AiControlButtons;
