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
        <div className="flex justify-start items-center py-2 px-2">
          <TimeDisplay />
        </div>
        
        {/* Spacing between time and weather */}
        <div className="h-8"></div>
        
        {/* Main Content - Portrait Layout */}
        <div className="flex-1 flex flex-col gap-2 min-h-0 overflow-hidden px-2">
          {/* Top Row */}
          <div className="h-1/4 flex justify-between">
            {/* Weather Panel - Left 30% */}
            <div className="w-[30%]">
              <WeatherPanel />
            </div>
            
            {/* Blank Space - Middle 40% */}
            <div className="w-[40%]"></div>
            
            {/* Calendar Panel - Right 30% */}
            <div className="w-[30%]">
              <CalendarPanel />
            </div>
          </div>

          {/* Webcam Panel - Bottom */}
          <div className="flex-1">
            <WebcamPanel 
              onAiMessage={setAiMessage}
              onAiLoading={setIsAiLoading}
            />
          </div>
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
