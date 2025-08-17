import React, { useState, useEffect } from 'react';
import './App.css';
import TimeDisplay from './components/TimeDisplay';
import WeatherPanel from './components/WeatherPanel';
import CalendarPanel from './components/CalendarPanel';
import RoutinePanel from './components/RoutinePanel';
import NewsPanel from './components/NewsPanel';
import HoroscopePanel from './components/HoroscopePanel';
import ApiClient from './services/apiClient';

function App() {
  const [data, setData] = useState({
    weather: null as any,
    calendar: [] as any[],
    routines: { morning: [] as any[], evening: [] as any[] },
    news: [] as any[],
    horoscope: null as any
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const summary = await ApiClient.getDailySummary() as any;
        setData({
          weather: summary.weather,
          calendar: summary.calendar,
          routines: summary.routines,
          news: summary.news,
          horoscope: summary.horoscope
        });
        setError(null);
      } catch (err) {
        console.error('Failed to fetch data:', err);
        setError('Failed to load data');
      } finally {
        setLoading(false);
      }
    };

    fetchData();

    // Refresh data every 30 seconds
    const interval = setInterval(fetchData, 30000);
    return () => clearInterval(interval);
  }, []);

  if (loading) {
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
          <div className="panel weather-section">
            {data.weather && <WeatherPanel weather={data.weather} />}
          </div>

          {/* Calendar Panel */}
          <div className="panel calendar-section">
            <CalendarPanel events={data.calendar} />
          </div>

          {/* Routine Panel */}
          <div className="panel routine-section">
            <RoutinePanel 
              morningRoutine={data.routines.morning}
              eveningRoutine={data.routines.evening}
            />
          </div>

          {/* News Panel */}
          <div className="panel news-section">
            <NewsPanel news={data.news} />
          </div>

          {/* Horoscope Panel */}
          <div className="panel horoscope-section">
            {data.horoscope && <HoroscopePanel horoscope={data.horoscope} />}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
