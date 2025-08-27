import React from 'react';

interface AutomaticModeToggleProps {
  isAutomaticMode: boolean;
  isAnalyzing: boolean;
  onToggleAutomaticMode: () => void;
}

const AutomaticModeToggle: React.FC<AutomaticModeToggleProps> = ({
  isAutomaticMode,
  isAnalyzing,
  onToggleAutomaticMode
}) => {
  return (
    <div className="flex items-center space-x-2">
      <button
        onClick={onToggleAutomaticMode}
        className={`px-3 py-2 rounded text-xs font-medium transition-colors ${
          isAutomaticMode
            ? 'bg-green-700 hover:bg-green-600 text-green-200 border border-green-600'
            : 'bg-gray-700 hover:bg-gray-600 text-gray-200 border border-gray-600'
        }`}
      >
        {isAutomaticMode ? 'Auto Mode: ON' : 'Auto Mode: OFF'}
      </button>
      {isAutomaticMode && (
        <div className="text-xs text-gray-400 font-mono">
          {isAnalyzing ? 'Analyzing...' : 'Waiting for motion...'}
        </div>
      )}
    </div>
  );
};

export default AutomaticModeToggle;
