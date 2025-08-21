import React from 'react';

// Components
import TimeDisplay from './modules/clock/TimeDisplay';
import WeatherPanel from './modules/weather/WeatherPanel';
import CalendarPanel from './modules/calendar/CalendarPanel';
import WisdomPanel from './modules/wisdom/WisdomPanel';

function MirrorInterface() {
  return (
    <div className="w-full h-full bg-mirror-bg text-mirror-text font-mirror-primary">
      <div className="w-full h-full flex flex-col">
        {/* Time Display - Top Center */}
        <div className="flex justify-center items-center py-5 mb-mirror-gap">
          <TimeDisplay />
        </div>

        {/* Main Content Grid */}
        <div className="flex-1 grid grid-cols-3 gap-mirror-gap min-h-0 overflow-hidden">
          {/* Weather Panel */}
          <div className="weather-section">
            <WeatherPanel />
          </div>

          {/* Calendar Panel */}
          <div className="calendar-section">
            <CalendarPanel />
          </div>

          {/* Wisdom Panel */}
          <div className="wisdom-section">
            <WisdomPanel />
          </div>
        </div>
      </div>
    </div>
  );
}

export default MirrorInterface;
