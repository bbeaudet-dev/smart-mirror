import React, { useState, useEffect } from 'react';

interface AiControlButtonsProps {
  isInitialized: boolean;
  isAnalyzing: boolean;
  onOutfitAnalysis: () => void;
  onWeatherOutfitAnalysis: () => void;
  onEnhancedAnalysis: () => void;
  onRoboflowDetection: () => void;
  onStartWebcam: () => void;
  onStopWebcam: () => void;
  onVoiceChange?: (voice: string) => void;
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
  onRoboflowDetection,
  
  onStartWebcam,
  onStopWebcam,
  onVoiceChange
}) => {
  const [voices, setVoices] = useState<string[]>([]);
  const [selectedVoice, setSelectedVoice] = useState('nova');
  const [isLoadingVoices, setIsLoadingVoices] = useState(true);

  useEffect(() => {
    fetchVoices();
  }, []);

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
    onVoiceChange?.(voice);
  };
  
  return (
    <div className="fixed bottom-4 left-6 right-6 z-50">
      <div className="flex flex-col items-center space-y-2">
        <div className="flex space-x-2">
          {/* Webcam Control Button */}
          <button
            onClick={isInitialized ? onStopWebcam : onStartWebcam}
            className={`px-3 py-2 rounded text-xs font-medium transition-colors ${
              isInitialized
                ? 'bg-gray-700 hover:bg-gray-600 text-gray-200 border border-gray-600'
                : 'bg-gray-600 hover:bg-gray-500 text-gray-200 border border-gray-500'
            }`}
          >
            {isInitialized ? 'Stop Webcam' : 'Start Webcam'}
          </button>

          <button
            onClick={onOutfitAnalysis}
            disabled={isAnalyzing}
            className={`px-3 py-2 rounded text-xs font-medium transition-colors ${
              isAnalyzing
                ? 'bg-gray-500 cursor-not-allowed text-gray-400 border border-gray-500'
                : 'bg-gray-700 hover:bg-gray-600 text-gray-200 border border-gray-600'
            }`}
          >
            {isAnalyzing ? 'Processing...' : 'Outfit'}
          </button>

          <button
            onClick={onWeatherOutfitAnalysis}
            disabled={isAnalyzing}
            className={`px-3 py-2 rounded text-xs font-medium transition-colors ${
              isAnalyzing
                ? 'bg-gray-500 cursor-not-allowed text-gray-400 border border-gray-500'
                : 'bg-gray-700 hover:bg-gray-600 text-gray-200 border border-gray-600'
            }`}
          >
            {isAnalyzing ? 'Processing...' : 'Weather + Outfit'}
          </button>

          <button
            onClick={onEnhancedAnalysis}
            disabled={isAnalyzing}
            className={`px-3 py-2 rounded text-xs font-medium transition-colors ${
              isAnalyzing
                ? 'bg-gray-500 cursor-not-allowed text-gray-400 border border-gray-500'
                : 'bg-gray-700 hover:bg-gray-600 text-gray-200 border border-gray-600'
            }`}
          >
            {isAnalyzing ? 'Processing...' : 'Enhanced'}
          </button>

          <button
            onClick={onRoboflowDetection}
            disabled={isAnalyzing}
            className={`px-3 py-2 rounded text-xs font-medium transition-colors ${
              isAnalyzing
                ? 'bg-gray-500 cursor-not-allowed text-gray-400 border border-gray-500'
                : 'bg-gray-700 hover:bg-gray-600 text-gray-200 border border-gray-600'
            }`}
          >
            {isAnalyzing ? 'Processing...' : 'Detect'}
          </button>
        </div>

        {/* Voice Selector */}
        <div className="flex items-center space-x-2">
          <label className="text-xs text-gray-300 font-medium">Voice:</label>
          <select
            value={selectedVoice}
            onChange={(e) => handleVoiceChange(e.target.value)}
            disabled={isLoadingVoices}
            className="px-2 py-1 rounded text-xs bg-gray-700 text-gray-200 border border-gray-600 focus:outline-none focus:border-gray-500"
          >
            {isLoadingVoices ? (
              <option>Loading...</option>
            ) : (
              voices.map((voice) => (
                <option key={voice} value={voice}>
                  {voice}
                </option>
              ))
            )}
          </select>
        </div>
      </div>
    </div>
  );
};

export default AiControlButtons;
