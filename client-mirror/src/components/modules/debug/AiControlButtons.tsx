import React from 'react';

interface AiControlButtonsProps {
  isAnalyzing: boolean;
  selectedVoice: string;
  voices: string[];
  isLoadingVoices: boolean;
  onAiAnalysis: (type: 'basic' | 'weather' | 'enhanced' | 'roboflow' | 'magic-mirror' | 'magic-mirror-tts' | 'snoop-tts') => void;
  onVoiceChange: (voice: string) => void;
}

const AiControlButtons: React.FC<AiControlButtonsProps> = ({
  isAnalyzing,
  selectedVoice,
  voices,
  isLoadingVoices,
  onAiAnalysis,
  onVoiceChange
}) => {
  return (
    <>
      {/* Row 1: Basic Analysis + Weather + Detect */}
      <div className="flex space-x-2 items-center">
        <button
          onClick={() => onAiAnalysis('basic')}
          disabled={isAnalyzing}
          className={`px-3 py-2 rounded text-xs font-medium transition-colors ${
            isAnalyzing
              ? 'bg-gray-500 cursor-not-allowed text-gray-400 border border-gray-500'
              : 'bg-gray-700 hover:bg-gray-600 text-gray-200 border border-gray-600'
          }`}
        >
          {isAnalyzing ? 'Processing...' : 'Basic'}
        </button>

        <button
          onClick={() => onAiAnalysis('weather')}
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
          onClick={() => onAiAnalysis('roboflow')}
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

      {/* Row 2: Advanced Analysis + Voice Selector */}
      <div className="flex space-x-2 items-center">
        <button
          onClick={() => onAiAnalysis('enhanced')}
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
          onClick={() => onAiAnalysis('magic-mirror')}
          disabled={isAnalyzing}
          className={`px-3 py-2 rounded text-xs font-medium transition-colors ${
            isAnalyzing
              ? 'bg-gray-500 cursor-not-allowed text-gray-400 border border-gray-500'
              : 'bg-gray-700 hover:bg-gray-600 text-gray-200 border border-gray-600'
          }`}
        >
          {isAnalyzing ? 'Processing...' : 'Magic Mirror'}
        </button>

        <button
          onClick={() => onAiAnalysis('snoop-tts')}
          disabled={isAnalyzing}
          className={`px-3 py-2 rounded text-xs font-medium transition-colors ${
            isAnalyzing
              ? 'bg-gray-500 cursor-not-allowed text-gray-400 border border-gray-500'
              : 'bg-gray-700 hover:bg-gray-600 text-gray-200 border border-gray-600'
          }`}
        >
          {isAnalyzing ? 'Processing...' : 'Snoop TTS'}
        </button>

        {/* Voice Selector */}
        <div className="flex items-center space-x-2 ml-2">
          <label className="text-xs text-gray-300 font-medium">Voice:</label>
          <select
            value={selectedVoice}
            onChange={(e) => onVoiceChange(e.target.value)}
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
    </>
  );
};

export default AiControlButtons;
