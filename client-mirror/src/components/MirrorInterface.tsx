import React, { useState } from 'react';

// Components
import TimeDisplay from './modules/TimeDisplay';
import WeatherPanel from './modules/weather/WeatherPanel';
import CalendarPanel from './modules/CalendarPanel';
import RotatingNewsPanel from './modules/RotatingNewsPanel';
import WebcamPanel from './modules/webcam/WebcamPanel';
import MessagePanel from './modules/MessagePanel';

function MirrorInterface() {
  const [aiMessage, setAiMessage] = useState<string | null>(null);
  const [isAiLoading, setIsAiLoading] = useState(false);
  const [isWebcamInitialized, setIsWebcamInitialized] = useState(false);
  const [isWebcamAnalyzing, setIsWebcamAnalyzing] = useState(false);

  return (
    <div className="w-full h-full bg-mirror-bg text-mirror-text font-mirror-primary">
      <div className="w-full h-full flex flex-col">
        {/* Time Display - Top Left */}
        <div className="flex justify-start py-1 px-1">
          <TimeDisplay />
        </div>
        
        {/* Spacing between time and weather */}
        <div className="h-8"></div>
        
        {/* Weather and Calendar - Under time */}
        <div className="flex justify-between px-1">
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
        
        {/* News Panel - Underneath calendar */}
        <div className="flex justify-end px-1 mt-4">
          <div className="w-[30%]">
            <RotatingNewsPanel />
          </div>
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
