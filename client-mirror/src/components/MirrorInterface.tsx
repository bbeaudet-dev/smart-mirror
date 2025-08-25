import React, { useState } from 'react';

// Components
import TimeDisplay from './modules/TimeDisplay';
import WeatherPanel from './modules/weather/WeatherPanel';
import CalendarPanel from './modules/CalendarPanel';
import WebcamPanel from './modules/webcam/WebcamPanel';
import MessagePanel from './modules/MessagePanel';

function MirrorInterface() {
  const [aiMessage, setAiMessage] = useState<string | null>(null);
  const [isAiLoading, setIsAiLoading] = useState(false);

  return (
    <div className="w-full h-full bg-mirror-bg text-mirror-text font-mirror-primary">
      <div className="w-full h-full flex flex-col">
        {/* Time Display - Top Left */}
        <div className="flex justify-start py-1 px-1">
          <TimeDisplay />
        </div>
        
        {/* Spacer to push content to bottom */}
        <div className="flex-1"></div>

        {/* Webcam Panel - Bottom */}
        <div className="flex flex-col h-full">
          <WebcamPanel 
            onAiMessage={setAiMessage}
            onAiLoading={setIsAiLoading}
          />
        </div>

        {/* AI Message Panel - Bottom Center */}
        <MessagePanel 
          message={aiMessage}
          isLoading={isAiLoading}
          type="ai-response"
        />
      </div>
    </div>
  );
}

export default MirrorInterface;
