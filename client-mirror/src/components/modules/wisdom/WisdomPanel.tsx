import React from 'react';

const WisdomPanel: React.FC = () => {
  return (
    <div className="flex flex-col h-full">
      <h3 className="mirror-header">
        Daily Wisdom
      </h3>
      
      <div className="flex-1 flex items-center justify-center text-center">
        <p className="text-mirror-sm text-mirror-text font-mirror-primary">
          Your smart mirror is ready! Connect your phone to start getting AI-powered outfit recommendations.
        </p>
      </div>
    </div>
  );
};

export default WisdomPanel;
