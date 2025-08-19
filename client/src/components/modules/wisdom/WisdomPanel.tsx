import React from 'react';

interface WisdomPanelProps {
  motivation: string | null;
  loading?: boolean;
}

const WisdomPanel: React.FC<WisdomPanelProps> = ({ 
  motivation, 
  loading = false 
}) => {
  return (
    <div className="flex flex-col h-full">
      <h3 className="mirror-header">
        Daily Wisdom
      </h3>
      
      <div className="flex-1 flex items-center justify-center text-center">
        <p className="text-mirror-sm text-mirror-text font-mirror-primary">
          {loading || !motivation ? 'Loading your daily inspiration...' : motivation}
        </p>
      </div>
    </div>
  );
};

export default WisdomPanel;
