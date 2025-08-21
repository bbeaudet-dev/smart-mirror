import React from 'react';
import { WeatherData } from '../../../data/types';
import CurrentWeather from './CurrentWeather';
import WeeklyForecast from './WeeklyForecast';
import OutfitRecs from './OutfitRecs';

interface WeatherPanelProps {
  weather: WeatherData;
  isRefreshing?: boolean;
  outfitRecommendation?: string | null;
  outfitLoading?: boolean;
}

const WeatherPanel: React.FC<WeatherPanelProps> = ({ 
  weather, 
  isRefreshing = false,
  outfitRecommendation = null,
  outfitLoading = false
}) => {
  // Check if weather data has an error
  if (weather.error) {
    return (
      <div className="flex flex-col h-full">
        <h3 className="mirror-header">
          Weather
          {isRefreshing && <span className="text-mirror-xs text-mirror-text-dimmed animate-spin ml-1">⟳</span>}
        </h3>
        <div className="flex-1 flex flex-col items-center justify-center text-center">
          <div className="text-mirror-lg text-mirror-text-dimmed mb-2">❓</div>
          <div className="text-mirror-xs text-mirror-text font-mirror-primary">
            <p>Weather data unavailable</p>
            <p className="text-mirror-text-dimmed">Check API configuration</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`flex flex-col h-full ${isRefreshing ? 'opacity-80' : ''}`}>
      <h3 className="mirror-header">
        Weather
        {isRefreshing && <span className="text-mirror-xs text-mirror-text-dimmed animate-spin ml-1">⟳</span>}
      </h3>
      
      {/* Current Weather */}
      <CurrentWeather weather={weather} isRefreshing={isRefreshing} />
      
      {/* Weekly Forecast */}
      <WeeklyForecast weather={weather} />
      
      {/* Outfit Recommendations */}
      <div className="mt-4 flex-1">
        <OutfitRecs 
          outfitRecommendation={outfitRecommendation}
          weather={{
            temperature: weather.current.temperature,
            condition: weather.current.condition
          }}
          loading={outfitLoading}
        />
      </div>
    </div>
  );
};

export default WeatherPanel;
