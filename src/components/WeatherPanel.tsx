import React from 'react';
import { WeatherData, getOutfitRecommendation } from '../data/mockData';
import './WeatherPanel.css';

interface WeatherPanelProps {
  weather: WeatherData;
}

const WeatherPanel: React.FC<WeatherPanelProps> = ({ weather }) => {
  const outfitRecommendation = getOutfitRecommendation(weather.current.temperature, weather.current.condition);

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

      <div className="outfit-recommendation">
        <h4>Outfit Suggestion</h4>
        <p className="outfit-text">{outfitRecommendation}</p>
      </div>
    </div>
  );
};

export default WeatherPanel;
