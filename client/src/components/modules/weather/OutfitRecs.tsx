import React from 'react';

interface OutfitRecsProps {
  outfitRecommendation: string | null;
  weather: {
    temperature: number | null;
    condition: string;
    error?: boolean;
  } | null;
  loading?: boolean;
}

const OutfitRecs: React.FC<OutfitRecsProps> = ({ 
  outfitRecommendation, 
  weather, 
  loading = false 
}) => {
  const getWeatherIcon = (condition: string) => {
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

  // Show error if weather data is unavailable
  if (weather?.error) {
    return (
      <div className="flex flex-col h-full">
        <div className="flex justify-between items-center mb-2 border-b border-mirror-text-dimmed pb-1">
          <h3 className="mirror-header">Outfit Recommendation</h3>
          <div className="flex items-center gap-1 text-mirror-xs text-mirror-text-dimmed font-mirror-primary">
            <span>--°F</span>
          </div>
        </div>
        <div className="flex-1 flex items-center justify-center text-center">
          <p className="text-mirror-sm text-mirror-text font-mirror-primary">
            Weather data unavailable for outfit recommendations
          </p>
        </div>
      </div>
    );
  }

  // Show loading or waiting for data
  if (loading || !weather || !outfitRecommendation) {
    return (
      <div className="flex flex-col h-full">
        <div className="flex justify-between items-center mb-2 border-b border-mirror-text-dimmed pb-1">
          <h3 className="mirror-header">Outfit Recommendation</h3>
          <div className="flex items-center gap-1 text-mirror-xs text-mirror-text-dimmed font-mirror-primary">
            {weather ? (
              <>
                <span>{getWeatherIcon(weather.condition)}</span>
                <span>{weather.temperature}°F</span>
              </>
            ) : (
              <span>--°F</span>
            )}
          </div>
        </div>
        <div className="flex-1 flex items-center justify-center text-center">
          <p className="text-mirror-sm text-mirror-text font-mirror-primary">
            {loading ? 'Loading...' : !weather ? 'Waiting for weather data...' : 'Generating outfit suggestions...'}
          </p>
        </div>
      </div>
    );
  }

  // Show the outfit recommendation
  return (
    <div className="flex flex-col h-full">
      <div className="flex justify-between items-center mb-2 border-b border-mirror-text-dimmed pb-1">
        <h3 className="mirror-header">Outfit Recommendation</h3>
        <div className="flex items-center gap-1 text-mirror-xs text-mirror-text font-mirror-primary">
          <span>{getWeatherIcon(weather.condition)}</span>
          <span>{weather.temperature}°F</span>
        </div>
      </div>
      <div className="flex-1 flex items-center justify-center text-center">
        <p className="text-mirror-sm text-mirror-text font-mirror-primary leading-relaxed">
          {outfitRecommendation}
        </p>
      </div>
    </div>
  );
};

export default OutfitRecs;
