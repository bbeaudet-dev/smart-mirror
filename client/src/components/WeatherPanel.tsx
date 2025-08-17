import React from 'react';
import { WeatherData } from '../data/types';
import './WeatherPanel.css';

interface WeatherPanelProps {
  weather: WeatherData;
}

const WeatherPanel: React.FC<WeatherPanelProps> = ({ weather }) => {
  // Check if weather data has an error
  if (weather.error) {
    return (
      <div className="weather-panel">
        <h3 className="panel-title">Weather</h3>
        <div className="weather-error">
          <div className="error-icon">❓</div>
          <div className="error-message">
            <p>Weather data unavailable</p>
            <p className="error-details">Check API configuration</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="weather-panel">
      <h3 className="panel-title">Weather</h3>
      
      <div className="current-weather">
        <div className="current-temp">
          <span className="temp-number">{weather.current.temperature}°</span>
          <span className="temp-unit">F</span>
        </div>
        <div className="current-condition">
          <span className="weather-icon">{weather.current.icon}</span>
          <span className="condition-text">{weather.current.condition}</span>
        </div>
      </div>

      <div className="forecast">
        <h4>3-Day Forecast</h4>
        <div className="forecast-items">
          {weather.forecast.map((day, index) => (
            <div key={index} className="forecast-item">
              <div className="forecast-day">{day.day}</div>
              <div className="forecast-icon">{day.icon}</div>
              <div className="forecast-temps">
                <span className="high">{day.high}°</span>
                <span className="low">{day.low}°</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WeatherPanel;
