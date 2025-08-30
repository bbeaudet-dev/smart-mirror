import React from 'react';

interface AiLoadingSpinnerProps {
  isVisible: boolean;
}

const AiLoadingSpinner: React.FC<AiLoadingSpinnerProps> = ({ isVisible }) => {
  if (!isVisible) return null;

  return (
    <div className="flex items-center justify-center space-x-4">
      <div className="relative">
        {/* Outer ring */}
        <div className="w-8 h-8 border-3 border-blue-300 rounded-full animate-spin">
          <div className="absolute top-0 left-0 w-8 h-8 border-3 border-transparent border-t-blue-500 rounded-full animate-spin"></div>
        </div>
        
        {/* Inner pulse */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <div className="w-3 h-3 bg-blue-400 rounded-full animate-pulse"></div>
        </div>
      </div>
      
      <span className="text-blue-400 text-lg font-bold">AI thinking...</span>
    </div>
  );
};

export default AiLoadingSpinner;
