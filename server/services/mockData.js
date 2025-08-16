// Import mock data from shared directory
const {
  weatherData,
  calendarData,
  morningRoutine,
  eveningRoutine,
  newsData,
  horoscopeData,
  getOutfitRecommendation
} = require('../../shared/mockData');

class MockDataService {
  /**
   * Get comprehensive daily summary
   * @returns {Promise<Object>} - Complete daily data
   */
  static async getDailySummary() {
    return {
      weather: weatherData,
      calendar: calendarData,
      routines: {
        morning: morningRoutine,
        evening: eveningRoutine
      },
      news: newsData,
      horoscope: horoscopeData,
      outfitSuggestion: getOutfitRecommendation(
        weatherData.current.temperature,
        weatherData.current.condition
      )
    };
  }

  /**
   * Get weather data
   * @returns {Promise<Object>} - Weather information
   */
  static async getWeather() {
    return weatherData;
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
    return getOutfitRecommendation(temperature, condition);
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
