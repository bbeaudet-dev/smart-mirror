import React from 'react';
import { WeatherData } from '../../../data/types';

interface CurrentWeatherProps {
  weather: WeatherData;
  isRefreshing?: boolean;
}

const CurrentWeather: React.FC<CurrentWeatherProps> = ({ weather, isRefreshing = false }) => {
  return (
    <div>
      {/* Current Temperature and Condition */}
      <div className="flex items-start justify-between mb-2">
        <div className="flex flex-col">
          <div className="flex items-baseline">
            <span className="text-mirror-2xl font-light text-mirror-text-bright font-mirror-primary">
              {weather.current.temperature}°
            </span>
            <span className="text-mirror-lg font-light text-mirror-text ml-1">
              F
            </span>
          </div>
          {/* Feels Like - Right under temperature */}
          <div className="mt-1">
            <span className="text-mirror-xs text-mirror-text-dimmed font-mirror-primary">Feels like </span>
            <span className="text-mirror-xs text-mirror-text font-mirror-primary">{weather.current.feelsLike}°F</span>
          </div>
        </div>
        
        <div className="flex flex-col items-center">
          <span className="text-mirror-lg mb-1">
            {weather.current.icon}
          </span>
          <span className="text-mirror-sm text-mirror-text font-mirror-primary">
            {weather.current.condition}
          </span>
        </div>
      </div>
      
      
      {/* Weather Details - Compact single line */}
      <div className="flex justify-center items-center space-x-4 mb-4">
        <div className="flex items-center space-x-1">
          <span className="text-mirror-xs text-mirror-text-dimmed font-mirror-primary">→</span>
          <span className="text-mirror-xs text-mirror-text font-mirror-primary">{weather.current.windSpeed}mph</span>
        </div>
        <div className="flex items-center space-x-1">
          <span className="text-mirror-xs text-mirror-text-dimmed font-mirror-primary">●</span>
          <span className="text-mirror-xs text-mirror-text font-mirror-primary">{weather.current.uvIndex}</span>
        </div>
        <div className="flex items-center space-x-1">
          <span className="text-mirror-xs text-mirror-text-dimmed font-mirror-primary">°</span>
          <span className="text-mirror-xs text-mirror-text font-mirror-primary">{weather.current.humidity}%</span>
        </div>
      </div>
    </div>
  );
};

export default CurrentWeather;
