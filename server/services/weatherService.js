const axios = require('axios');

class WeatherService {
  constructor() {
    this.apiKey = process.env.WEATHER_API_KEY;
    this.baseUrl = 'http://api.weatherapi.com/v1';
    
    // Default location (can be made configurable)
    this.defaultLocation = process.env.WEATHER_LOCATION || 'New York, NY';
  }

  /**
   * Get current weather and forecast
   * @param {string} location - City, state or coordinates
   * @returns {Promise<Object>} - Weather data
   */
  async getWeatherData(location = this.defaultLocation) {
    try {
      if (!this.apiKey) {
        console.warn('Weather API key not configured');
        throw new Error('Weather API key not configured');
      }

      const response = await axios.get(`${this.baseUrl}/forecast.json`, {
        params: {
          key: this.apiKey,
          q: location,
          days: 3,
          aqi: 'no'
        }
      });

      return this.formatWeatherData(response.data);
    } catch (error) {
      console.error('Weather API Error:', error.message);
      throw new Error(`Unable to retrieve weather data: ${error.message}`);
    }
  }

  /**
   * Format weather data from API response
   * @param {Object} apiData - Raw API response
   * @returns {Object} - Formatted weather data
   */
  formatWeatherData(apiData) {
    const current = apiData.current;
    const forecast = apiData.forecast.forecastday;

    return {
      current: {
        temperature: Math.round(current.temp_f),
        condition: current.condition.text,
        icon: this.getWeatherIcon(current.condition.code, current.is_day),
        humidity: current.humidity,
        windSpeed: Math.round(current.wind_mph),
        feelsLike: Math.round(current.feelslike_f)
      },
      forecast: forecast.map((day, index) => ({
        day: index === 0 ? 'Today' : index === 1 ? 'Tomorrow' : new Date(day.date).toLocaleDateString('en-US', { weekday: 'long' }),
        high: Math.round(day.day.maxtemp_f),
        low: Math.round(day.day.mintemp_f),
        condition: day.day.condition.text,
        icon: this.getWeatherIcon(day.day.condition.code, 1), // 1 for day
        chanceOfRain: day.day.daily_chance_of_rain
      })),
      location: apiData.location.name,
      lastUpdated: new Date().toISOString()
    };
  }

  /**
   * Get weather icon based on condition code
   * @param {number} code - Weather condition code from API
   * @param {number} isDay - 1 for day, 0 for night
   * @returns {string} - Weather icon emoji
   */
  getWeatherIcon(code, isDay) {
    // WeatherAPI.com condition codes
    const icons = {
      1000: isDay ? '☀️' : '🌙', // Clear
      1003: '⛅', // Partly cloudy
      1006: '☁️', // Cloudy
      1009: '☁️', // Overcast
      1030: '🌫️', // Mist
      1063: '🌦️', // Patchy rain
      1066: '🌨️', // Patchy snow
      1069: '🌨️', // Patchy sleet
      1087: '⛈️', // Thundery outbreaks
      1114: '🌨️', // Blowing snow
      1117: '❄️', // Blizzard
      1135: '🌫️', // Fog
      1147: '🌫️', // Freezing fog
      1150: '🌧️', // Patchy light drizzle
      1153: '🌧️', // Light drizzle
      1168: '🌧️', // Heavy drizzle
      1171: '🌧️', // Heavy drizzle
      1180: '🌧️', // Slight rain showers
      1183: '🌧️', // Light rain showers
      1186: '🌧️', // Moderate rain showers
      1189: '🌧️', // Heavy rain showers
      1192: '🌧️', // Torrential rain showers
      1195: '🌧️', // Heavy rain
      1225: '❄️', // Heavy snow
      1252: '🌨️', // Light sleet showers
      1255: '🌨️', // Moderate sleet showers
      1258: '🌨️', // Heavy sleet showers
      1261: '🌨️', // Light snow showers
      1264: '🌨️', // Moderate snow showers
      1273: '⛈️', // Patchy light rain with thunder
      1276: '⛈️', // Moderate or heavy rain with thunder
    };

    return icons[code] || '🌤️';
  }



  /**
   * Get outfit recommendation based on weather
   * @param {number} temperature - Temperature in Fahrenheit
   * @param {string} condition - Weather condition
   * @param {number} chanceOfRain - Chance of rain percentage
   * @returns {string} - Outfit recommendation
   */
  getOutfitRecommendation(temperature, condition, chanceOfRain = 0) {
    let recommendation = '';

    // Temperature-based recommendations
    if (temperature >= 80) {
      recommendation = 'Light, breathable clothing. Shorts and t-shirt recommended.';
    } else if (temperature >= 70) {
      recommendation = 'Comfortable clothing. T-shirt and light pants or shorts.';
    } else if (temperature >= 60) {
      recommendation = 'Light jacket or sweater. Long pants recommended.';
    } else if (temperature >= 50) {
      recommendation = 'Warm jacket or coat. Consider layers.';
    } else {
      recommendation = 'Heavy coat, hat, and gloves. Bundle up!';
    }

    // Weather condition adjustments
    if (condition.toLowerCase().includes('rain') || chanceOfRain > 50) {
      recommendation += ' Don\'t forget an umbrella!';
    } else if (condition.toLowerCase().includes('snow')) {
      recommendation += ' Wear waterproof boots and warm layers.';
    } else if (condition.toLowerCase().includes('wind')) {
      recommendation += ' Consider a windbreaker.';
    }

    return recommendation;
  }
}

module.exports = WeatherService;
