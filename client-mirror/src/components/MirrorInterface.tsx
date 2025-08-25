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
        {/* Time Display - Top Center */}
        <div className="flex justify-center items-center py-2 mb-1">
          <TimeDisplay />
        </div>

        {/* Main Content - Portrait Layout */}
        <div className="flex-1 flex flex-col gap-2 min-h-0 overflow-hidden px-2">
          {/* Top Row */}
          <div className="h-1/4 flex justify-between">
            {/* Weather Panel - Left 1/3 */}
            <div className="w-1/3">
              <WeatherPanel />
            </div>
            
            {/* Blank Space - Middle 1/3 */}
            <div className="w-1/3"></div>
            
            {/* Calendar Panel - Right 1/3 */}
            <div className="w-1/3">
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
