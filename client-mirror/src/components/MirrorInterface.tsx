import React, { useState } from 'react';

// Components
import TimeDisplay from './modules/TimeDisplay';
import WeatherPanel from './modules/weather/WeatherPanel';
// import CalendarPanel from './modules/CalendarPanel'; // Temporarily disabled
import RotatingNewsPanel from './modules/RotatingNewsPanel';
import DebugPanel from './modules/debug/DebugPanel';
import MessagePanel from './modules/messages/MessagePanel';

function MirrorInterface() {
  const [aiMessage, setAiMessage] = useState<string | null>(null);
  const [isAiLoading, setIsAiLoading] = useState(false);
  const [isWebcamInitialized, setIsWebcamInitialized] = useState(false);
  const [isWebcamAnalyzing, setIsWebcamAnalyzing] = useState(false);

  // Debug loading state
  console.log('MirrorInterface: isAiLoading =', isAiLoading);

  return (
    <div className="w-full h-full bg-mirror-bg text-mirror-text font-mirror-primary pl-14 pr-2 pt-2 pb-2">
      <div className="w-full h-full flex flex-col">
        {/* Time Display - Top Left */}
        <div className="flex justify-start py-1 px-1">
          <TimeDisplay />
        </div>
        
        {/* Spacing between time and weather */}
        <div className="h-8"></div>
        
        {/* Weather Panel - Left justified (Calendar temporarily disabled) */}
        <div className="flex justify-start px-1">
          {/* Weather Panel - Left 60% */}
          <div className="w-[60%]">
            <WeatherPanel />
          </div>
        </div>
        
        {/* News Panel - Underneath weather, left justified */}
        <div className="flex justify-start px-1 mt-4">
          <div className="w-[60%]">
            <RotatingNewsPanel />
          </div>
        </div>
        
        {/* Spacer to push content to bottom */}
        <div className="flex-1"></div>

        {/* Debug Panel - Bottom Right */}
        <div className="flex justify-end mb-4">
          <DebugPanel 
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
