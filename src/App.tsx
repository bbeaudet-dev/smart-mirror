import React, { useState, useEffect } from 'react';
import './App.css';
import TimeDisplay from './components/TimeDisplay';
import WeatherPanel from './components/WeatherPanel';
import CalendarPanel from './components/CalendarPanel';
import RoutinePanel from './components/RoutinePanel';
import NewsPanel from './components/NewsPanel';
import HoroscopePanel from './components/HoroscopePanel';
import {
  weatherData,
  calendarData,
  morningRoutine,
  eveningRoutine,
  newsData,
  horoscopeData
} from './data/mockData';

function App() {
  const [refreshKey, setRefreshKey] = useState(0);

  // Auto-refresh every 30 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setRefreshKey(prev => prev + 1);
    }, 30000);

    return () => clearInterval(interval);
  }, []);

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
          <div className="panel weather-section">
            <WeatherPanel weather={weatherData} />
          </div>

          {/* Calendar Panel */}
          <div className="panel calendar-section">
            <CalendarPanel events={calendarData} />
          </div>

          {/* Routine Panel */}
          <div className="panel routine-section">
            <RoutinePanel 
              morningRoutine={morningRoutine}
              eveningRoutine={eveningRoutine}
            />
          </div>

          {/* News Panel */}
          <div className="panel news-section">
            <NewsPanel news={newsData} />
          </div>

          {/* Horoscope Panel */}
          <div className="panel horoscope-section">
            <HoroscopePanel horoscope={horoscopeData} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
