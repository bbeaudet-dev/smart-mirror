import React from 'react';
import './App.css';

// Components
import TimeDisplay from './components/TimeDisplay';
import WeatherPanel from './components/WeatherPanel';
import CalendarPanel from './components/CalendarPanel';
import MotivationPanel from './components/MotivationPanel';
import OutfitPanel from './components/OutfitPanel';

// Custom Hook
import { useSmartMirrorData } from './hooks/useSmartMirrorData';

function App() {
  const { data, aiData, isInitialLoad, error, aiLoading, refreshingStates } = useSmartMirrorData();

  if (isInitialLoad) {
    return (
      <div className="smart-mirror">
        <div className="loading">Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="smart-mirror">
        <div className="error">Error: {error}</div>
      </div>
    );
  }

  return (
    <div className="smart-mirror">
      <div className="mirror-container">
        {/* Time Display - Top Center */}
        <div className="time-section">
          <TimeDisplay />
        </div>

        {/* Main Content Grid */}
        <div className="content-grid">
          {/* Weather Panel */}
          <div className="panel weather-section module">
            {data.weather && <WeatherPanel weather={data.weather} isRefreshing={refreshingStates.weather} />}
          </div>

          {/* Calendar Panel */}
          <div className="panel calendar-section module">
            <CalendarPanel />
          </div>

          {/* AI Motivation Panel */}
          <div className="panel motivation-section module">
            <MotivationPanel 
              motivation={aiData.motivation}
              timeOfDay={new Date().getHours() < 12 ? 'morning' : new Date().getHours() < 17 ? 'afternoon' : 'evening'}
              loading={aiLoading}
            />
          </div>

          {/* AI Outfit Panel */}
          <div className="panel outfit-section module">
            <OutfitPanel 
              outfitRecommendation={aiData.outfitRecommendation}
              weather={(data.weather as any)?.current ? { temperature: (data.weather as any).current.temperature, condition: (data.weather as any).current.condition } : null}
              loading={aiLoading}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
