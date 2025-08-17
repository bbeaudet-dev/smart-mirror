import React from 'react';
import './OutfitPanel.css';

interface OutfitPanelProps {
  outfitRecommendation: string | null;
  weather: {
    temperature: number;
    condition: string;
  } | null;
  loading?: boolean;
}

const OutfitPanel: React.FC<OutfitPanelProps> = ({ 
  outfitRecommendation, 
  weather, 
  loading = false 
}) => {
  const getWeatherIcon = (condition: string | undefined) => {
    if (!condition) return '🌤️';
    
    switch (condition.toLowerCase()) {
      case 'rainy':
      case 'rain':
        return '☔';
      case 'sunny':
      case 'clear':
        return '☀️';
      case 'cloudy':
      case 'clouds':
        return '☁️';
      case 'snowy':
      case 'snow':
        return '❄️';
      default:
        return '🌤️';
    }
  };

  if (loading) {
    return (
      <div className="outfit-panel">
        <div className="outfit-header">
          <h3>Outfit Recommendation</h3>
          <div className="weather-info">
            <span className="weather-icon">🌤️</span>
            <span className="temperature">--°F</span>
          </div>
        </div>
        <div className="outfit-content loading">
          <div className="loading-dots">...</div>
        </div>
      </div>
    );
  }

  if (!outfitRecommendation || !weather) {
    return (
      <div className="outfit-panel">
        <div className="outfit-header">
          <h3>Outfit Recommendation</h3>
          <div className="weather-info">
            <span className="weather-icon">🌤️</span>
            <span className="temperature">72°F</span>
          </div>
        </div>
        <div className="outfit-content">
          <p>Loading outfit suggestions...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="outfit-panel">
      <div className="outfit-header">
        <h3>Outfit Recommendation</h3>
        <div className="weather-info">
          <span className="weather-icon">{getWeatherIcon(weather.condition)}</span>
          <span className="temperature">{weather.temperature}°F</span>
        </div>
      </div>
      <div className="outfit-content">
        <p>{outfitRecommendation}</p>
      </div>
    </div>
  );
};

export default OutfitPanel;
