import React, { useState } from 'react';

// Components
import TimeDisplay from './modules/clock/TimeDisplay';
import WeatherPanel from './modules/weather/WeatherPanel';
import CalendarPanel from './modules/calendar/CalendarPanel';
import WebcamPanel from './modules/webcam/WebcamPanel';
import MessagePanel from './modules/message/MessagePanel';

function MirrorInterface() {
  const [aiMessage, setAiMessage] = useState<string | null>(null);
  const [isAiLoading, setIsAiLoading] = useState(false);

  return (
    <div className="w-full h-full bg-mirror-bg text-mirror-text font-mirror-primary">
      <div className="w-full h-full flex flex-col">
        {/* Time Display - Top Center */}
        <div className="flex justify-center items-center py-4 mb-2">
          <TimeDisplay />
        </div>

        {/* Main Content - Portrait Layout */}
        <div className="flex-1 flex flex-col gap-4 min-h-0 overflow-hidden px-4">
          {/* Top Row - Weather and Calendar */}
          <div className="grid grid-cols-2 gap-4 h-1/3">
            {/* Weather Panel */}
            <div className="weather-section">
              <WeatherPanel />
            </div>

            {/* Calendar Panel */}
            <div className="calendar-section">
              <CalendarPanel />
            </div>
          </div>

          {/* Bottom Row - Webcam Only */}
          <div className="h-1/3">
            {/* Webcam Panel */}
            <div className="webcam-section h-full">
              <WebcamPanel 
                onAiMessage={setAiMessage}
                onAiLoading={setIsAiLoading}
              />
            </div>
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
