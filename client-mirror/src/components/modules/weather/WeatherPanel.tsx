import React, { useState, useEffect } from 'react';
import { WeatherData } from '../../../data/types';
import CurrentWeather from './CurrentWeather';
import WeeklyForecast from './WeeklyForecast';
import OutfitRecs from './OutfitRecs';

const WeatherPanel: React.FC = () => {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Try to fetch weather data, but don't block the UI if it fails
    const fetchWeather = async () => {
      try {
        const response = await fetch('http://localhost:5005/api/weather');
        if (response.ok) {
          const data = await response.json();
          setWeather(data.weather);
        } else {
          setError('Weather API unavailable');
        }
      } catch (err) {
        setError('Weather service unavailable');
      } finally {
        setIsLoading(false);
      }
    };

    fetchWeather();
  }, []);

  // Show loading state briefly
  if (isLoading) {
    return (
      <div className="flex flex-col h-full">
        <h3 className="mirror-header">Weather</h3>
        <div className="flex-1 flex flex-col items-center justify-center text-center">
          <div className="text-mirror-lg text-mirror-text-dimmed mb-2">🌤️</div>
          <div className="text-mirror-xs text-mirror-text font-mirror-primary">
            <p>Loading weather...</p>
          </div>
        </div>
      </div>
    );
  }

  // Show error state
  if (error || !weather) {
    return (
      <div className="flex flex-col h-full">
        <h3 className="mirror-header">Weather</h3>
        <div className="flex-1 flex flex-col items-center justify-center text-center">
          <div className="text-mirror-lg text-mirror-text-dimmed mb-2">🌤️</div>
          <div className="text-mirror-xs text-mirror-text font-mirror-primary">
            <p>Weather data unavailable</p>
            <p className="text-mirror-text-dimmed">Check API configuration</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full">
      <h3 className="mirror-header">Weather</h3>
      
      {/* Current Weather */}
      <CurrentWeather weather={weather} isRefreshing={false} />
      
      {/* Weekly Forecast */}
      <WeeklyForecast weather={weather} />
      
      {/* Outfit Recommendations */}
      <div className="mt-4 flex-1">
        <OutfitRecs 
          outfitRecommendation={null}
          weather={{
            temperature: weather.current.temperature,
            condition: weather.current.condition
          }}
          loading={false}
        />
      </div>
    </div>
  );
};

export default WeatherPanel;
