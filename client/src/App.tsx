import React, { useState } from 'react';

// Components
import TimeDisplay from './components/modules/clock/TimeDisplay';
import WeatherPanel from './components/modules/weather/WeatherPanel';
import CalendarPanel from './components/modules/calendar/CalendarPanel';
import WisdomPanel from './components/modules/wisdom/WisdomPanel';
import WebcamOverlay from './components/modules/webcam/WebcamOverlay';

// Custom Hook
import { useSmartMirrorData } from './hooks/useSmartMirrorData';

function App() {
  const { data, aiData, isInitialLoad, error, aiLoading, refreshingStates } = useSmartMirrorData();
  const [isWebcamOpen, setIsWebcamOpen] = useState(false);

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

        {/* Webcam Button - Top Right */}
        <div className="absolute top-4 right-4 z-10">
          <button
            onClick={() => setIsWebcamOpen(true)}
            className="px-4 py-2 bg-mirror-accent text-mirror-bg rounded-lg hover:bg-mirror-accent-hover transition-colors"
          >
            📷 Outfit Analysis
          </button>
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

      {/* Webcam Overlay */}
      <WebcamOverlay 
        isOpen={isWebcamOpen} 
        onClose={() => setIsWebcamOpen(false)} 
      />
    </div>
  );
}

export default App;
