// Import mock data from shared directory
const {
  calendarData,
  morningRoutine,
  eveningRoutine,
  newsData,
  horoscopeData
} = require('../../shared/data');

// Import real weather service
const WeatherService = require('./weatherService');
const weatherService = new WeatherService();

class MockDataService {
  /**
   * Get comprehensive daily summary
   * @param {string} location - Optional location override
   * @returns {Promise<Object>} - Complete daily data
   */
  static async getDailySummary(location) {
    let weather = null;
    let outfitSuggestion = null;
    
    try {
      // Get real weather data
      weather = await weatherService.getWeatherData(location);
      outfitSuggestion = weatherService.getOutfitRecommendation(
        weather.current.temperature,
        weather.current.condition,
        weather.forecast[0]?.chanceOfRain || 0
      );
    } catch (error) {
      console.error('Weather data unavailable:', error.message);
      weather = {
        error: true,
        message: 'Weather data unavailable',
        current: {
          temperature: null,
          condition: 'Unknown',
          icon: '❓'
        },
        forecast: [],
        location: location || 'Unknown',
        lastUpdated: new Date().toISOString()
      };
      outfitSuggestion = 'Weather data unavailable for outfit recommendations';
    }
    
    return {
      weather: weather,
      calendar: calendarData,
      routines: {
        morning: morningRoutine,
        evening: eveningRoutine
      },
      news: newsData,
      horoscope: horoscopeData,
      outfitSuggestion: outfitSuggestion
    };
  }

  /**
   * Get weather data
   * @param {string} location - Optional location override
   * @returns {Promise<Object>} - Weather information
   */
  static async getWeather(location) {
    try {
      return await weatherService.getWeatherData(location);
    } catch (error) {
      console.error('Weather data unavailable:', error.message);
      return {
        error: true,
        message: 'Weather data unavailable',
        current: {
          temperature: null,
          condition: 'Unknown',
          icon: '❓'
        },
        forecast: [],
        location: location || 'Unknown',
        lastUpdated: new Date().toISOString()
      };
    }
  }

  /**
   * Get calendar events
   * @returns {Promise<Array>} - Calendar events
   */
  static async getCalendarEvents() {
    return calendarData;
  }

  /**
   * Get routine by type
   * @param {string} type - 'morning' or 'evening'
   * @returns {Promise<Array|null>} - Routine tasks
   */
  static async getRoutine(type) {
    switch (type.toLowerCase()) {
      case 'morning':
        return morningRoutine;
      case 'evening':
        return eveningRoutine;
      default:
        return null;
    }
  }

  /**
   * Get news headlines
   * @returns {Promise<Array>} - News articles
   */
  static async getNews() {
    return newsData;
  }

  /**
   * Get horoscope data
   * @returns {Promise<Object>} - Horoscope information
   */
  static async getHoroscope() {
    return horoscopeData;
  }

  /**
   * Get outfit suggestion based on weather
   * @param {number} temperature - Current temperature
   * @param {string} condition - Weather condition
   * @returns {Promise<string>} - Outfit recommendation
   */
  static async getOutfitSuggestion(temperature, condition) {
    return weatherService.getOutfitRecommendation(temperature, condition);
  }

  /**
   * Get current time-based routine
   * @returns {Promise<Object>} - Current routine based on time
   */
  static async getCurrentRoutine() {
    const now = new Date();
    const hour = now.getHours();
    
    if (hour >= 6 && hour < 11) {
      return {
        type: 'morning',
        routine: morningRoutine,
        timeOfDay: 'morning'
      };
    } else if (hour >= 19 && hour < 23) {
      return {
        type: 'evening',
        routine: eveningRoutine,
        timeOfDay: 'evening'
      };
    } else {
      return {
        type: 'none',
        routine: [],
        timeOfDay: hour < 6 ? 'night' : hour < 19 ? 'day' : 'night'
      };
    }
  }

  /**
   * Get system status
   * @returns {Promise<Object>} - System status information
   */
  static async getSystemStatus() {
    return {
      status: 'operational',
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
      environment: process.env.NODE_ENV || 'development',
      version: '1.0.0'
    };
  }
}

module.exports = MockDataService;
