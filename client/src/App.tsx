import React from 'react';

// Components
import TimeDisplay from './components/modules/clock/TimeDisplay';
import WeatherPanel from './components/modules/weather/WeatherPanel';
import CalendarPanel from './components/modules/calendar/CalendarPanel';
import WisdomPanel from './components/modules/wisdom/WisdomPanel';

// Custom Hook
import { useSmartMirrorData } from './hooks/useSmartMirrorData';

function App() {
  const { data, aiData, isInitialLoad, error, aiLoading, refreshingStates } = useSmartMirrorData();

  if (isInitialLoad) {
    return (
      <div className="w-full h-full bg-mirror-bg text-mirror-text font-mirror-primary">
        <div className="flex justify-center items-center h-full text-mirror-lg text-mirror-text">
          Loading...
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full h-full bg-mirror-bg text-mirror-text font-mirror-primary">
        <div className="flex justify-center items-center h-full text-mirror-lg text-red-400">
          Error: {error}
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-full bg-mirror-bg text-mirror-text font-mirror-primary">
      <div className="w-full h-full flex flex-col">
        {/* Time Display - Top Center */}
        <div className="flex justify-center items-center py-5 mb-mirror-gap">
          <TimeDisplay />
        </div>

        {/* Main Content Grid */}
        <div className="flex-1 grid grid-cols-3 gap-mirror-gap min-h-0 overflow-hidden">
          {/* Weather Panel (includes outfit recommendations) */}
          <div className="weather-section">
            {data.weather && (
              <WeatherPanel 
                weather={data.weather} 
                isRefreshing={refreshingStates.weather}
                outfitRecommendation={aiData.outfitRecommendation}
                outfitLoading={aiLoading}
              />
            )}
          </div>

          {/* Calendar Panel */}
          <div className="calendar-section">
            <CalendarPanel />
          </div>

          {/* Wisdom Panel */}
          <div className="wisdom-section">
            <WisdomPanel 
              motivation={aiData.motivation}
              loading={aiLoading}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
