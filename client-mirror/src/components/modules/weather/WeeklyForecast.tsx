import React from 'react';
import { WeatherData } from '../../../data/types';

interface WeeklyForecastProps {
  weather: WeatherData;
}

const WeeklyForecast: React.FC<WeeklyForecastProps> = ({ weather }) => {
  return (
    <div>
      <h4 className="mirror-header"></h4>
      <div className="grid grid-cols-3 gap-1">
        {weather.forecast.map((day, index) => (
          <div key={index} className="text-center">
            <div className="text-mirror-xs text-mirror-text font-mirror-primary mb-1">
              {day.day}
            </div>
            <div className="text-mirror-sm mb-1">
              {day.icon}
            </div>
            <div className="flex justify-center items-center space-x-2 text-mirror-xs">
              <span className="text-mirror-text-bright font-mirror-primary">
                {day.high}°
              </span>
              <span className="text-mirror-text-dimmed font-mirror-primary">
                {day.low}°
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WeeklyForecast;
