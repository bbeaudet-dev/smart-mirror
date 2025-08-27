import React from 'react';

interface AiLoadingSpinnerProps {
  isVisible: boolean;
}

const AiLoadingSpinner: React.FC<AiLoadingSpinnerProps> = ({ isVisible }) => {
  if (!isVisible) return null;

  return (
    <div className="flex items-center justify-center space-x-2">
      <div className="relative">
        {/* Outer ring */}
        <div className="w-6 h-6 border-2 border-blue-200 rounded-full animate-spin">
          <div className="absolute top-0 left-0 w-6 h-6 border-2 border-transparent border-t-blue-500 rounded-full animate-spin"></div>
        </div>
        
        {/* Inner pulse */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
        </div>
      </div>
      
      <span className="text-blue-400 text-sm font-medium">AI thinking...</span>
    </div>
  );
};

export default AiLoadingSpinner;
