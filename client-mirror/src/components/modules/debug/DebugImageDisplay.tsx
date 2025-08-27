import React from 'react';

interface DebugImageDisplayProps {
  lastCapturedImage: string | null;
}

const DebugImageDisplay: React.FC<DebugImageDisplayProps> = ({ lastCapturedImage }) => {
  if (!lastCapturedImage) {
    return null;
  }

  return (
    <div className="mt-2">
      <div className="text-xs text-gray-400 mb-1">Last Captured Image:</div>
      <img 
        src={lastCapturedImage} 
        alt="Debug capture" 
        className="w-32 h-24 object-cover rounded border border-gray-600"
      />
    </div>
  );
};

export default DebugImageDisplay;
