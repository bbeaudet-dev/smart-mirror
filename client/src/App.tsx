import React, { useState, useEffect } from 'react';
import './App.css';
import TimeDisplay from './components/TimeDisplay';
import WeatherPanel from './components/WeatherPanel';
import CalendarPanel from './components/CalendarPanel';
import RoutinePanel from './components/RoutinePanel';
import NewsPanel from './components/NewsPanel';
import HoroscopePanel from './components/HoroscopePanel';
import MotivationPanel from './components/MotivationPanel';
import OutfitPanel from './components/OutfitPanel';
import ApiClient from './services/apiClient';

function App() {
  const [data, setData] = useState({
    weather: null as any,
    calendar: [] as any[],
    routines: { morning: [] as any[], evening: [] as any[] },
    news: [] as any[],
    horoscope: null as any
  });
  const [aiData, setAiData] = useState({
    motivation: null as string | null,
    outfitRecommendation: null as string | null
  });
  const [loading, setLoading] = useState(true);
  const [aiLoading, setAiLoading] = useState(true);
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

  // Fetch AI data
  useEffect(() => {
    const fetchAiData = async () => {
      try {
        setAiLoading(true);
        
        // Get current time of day
        const hour = new Date().getHours();
        const timeOfDay = hour < 12 ? 'morning' : hour < 17 ? 'afternoon' : 'evening';
        
        // Fetch motivation
        const motivationResponse = await ApiClient.getMotivation(timeOfDay, 'neutral');
        
        // Fetch outfit recommendation (using mock weather for now)
        const outfitResponse = await ApiClient.getOutfitRecommendation(72, 'sunny');
        
        setAiData({
          motivation: (motivationResponse as any).motivation,
          outfitRecommendation: (outfitResponse as any).suggestion
        });
      } catch (err) {
        console.error('Failed to fetch AI data:', err);
        // Don't set error state for AI data, just log it
      } finally {
        setAiLoading(false);
      }
    };

    fetchAiData();

    // Refresh AI data every 60 seconds (less frequent than regular data)
    const interval = setInterval(fetchAiData, 60000);
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

          {/* AI Motivation Panel */}
          <div className="panel motivation-section">
            <MotivationPanel 
              motivation={aiData.motivation}
              timeOfDay={new Date().getHours() < 12 ? 'morning' : new Date().getHours() < 17 ? 'afternoon' : 'evening'}
              loading={aiLoading}
            />
          </div>

          {/* AI Outfit Panel */}
          <div className="panel outfit-section">
            <OutfitPanel 
              outfitRecommendation={aiData.outfitRecommendation}
              weather={data.weather ? { temperature: data.weather.current.temperature, condition: data.weather.current.condition } : null}
              loading={aiLoading}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
