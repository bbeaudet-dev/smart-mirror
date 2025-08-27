import React from 'react';

interface MotionStatusProps {
  isMotionDetectionActive: boolean;
  isMotionDetected: boolean;
  motionLevel: number;
}

const MotionStatus: React.FC<MotionStatusProps> = ({
  isMotionDetectionActive,
  isMotionDetected,
  motionLevel
}) => {
  return (
    <div className="flex items-center space-x-2">
      <div className={`w-2 h-2 rounded-full ${
        isMotionDetectionActive 
          ? (isMotionDetected ? 'bg-green-500' : 'bg-yellow-500') 
          : 'bg-red-500'
      } animate-pulse`}></div>
      <div className="text-xs text-gray-400 font-mono">
        {isMotionDetectionActive 
          ? (isMotionDetected ? 'Motion Detected' : 'Motion Active') 
          : 'Motion Off'
        }
        {isMotionDetectionActive && ` (${(motionLevel * 100).toFixed(1)}%)`}
      </div>
    </div>
  );
};

export default MotionStatus;
