/**
 * Centralized prompt service for AI interactions
 * Eliminates duplicate prompts and provides consistent AI interactions
 */

class PromptService {
  /**
   * Generate outfit recommendation prompt
   * @param {Object} weatherData - Weather information
   * @param {number} weatherData.temperature - Temperature in Fahrenheit
   * @param {string} weatherData.condition - Weather condition
   * @param {number} weatherData.chanceOfRain - Chance of rain percentage
   * @param {string} weatherData.location - Location
   * @param {string} weatherData.timeOfDay - Time of day (morning/afternoon/evening/night)
   * @param {string} weatherData.recommendationType - Type of recommendation (current/tomorrow)
   * @param {Object} weatherData.forecast - Weather forecast for context
   * @returns {string} - Formatted prompt for AI
   */
  static generateOutfitRecommendationPrompt(weatherData) {
    const { 
      temperature, 
      condition, 
      chanceOfRain, 
      location, 
      timeOfDay,
      recommendationType,
      forecast,
      todayHigh,
      todayLow,
      humidity,
      windSpeed,
      windDirection,
      uvIndex,
      visibility,
      feelsLike
    } = weatherData;
    
    let timeContext = '';
    let forecastContext = '';
    
    // Time-based context
    switch (timeOfDay) {
      case 'morning':
        timeContext = 'It\'s morning, so recommend an outfit for the day ahead.';
        break;
      case 'afternoon':
        timeContext = 'It\'s afternoon, so recommend an outfit for the rest of the day.';
        break;
      case 'evening':
        timeContext = 'It\'s evening, so recommend an outfit for evening activities.';
        break;
      case 'night':
        if (recommendationType === 'tomorrow') {
          timeContext = 'It\'s late, so recommend an outfit to lay out for tomorrow morning.';
        } else {
          timeContext = 'It\'s late evening, so recommend comfortable evening wear.';
        }
        break;
      default:
        timeContext = 'Recommend an appropriate outfit for the current time.';
    }
    
    // Add forecast context if available
    if (forecast && forecast.length > 0) {
      const tomorrow = forecast.find(day => day.day === 'Tomorrow');
      if (tomorrow) {
        forecastContext = ` Tomorrow's forecast: ${tomorrow.high}°F high, ${tomorrow.low}°F low, ${tomorrow.condition}.`;
      }
    }
    
    return `Based on the current weather conditions, suggest an appropriate outfit:

Weather Details:
- Current Temperature: ${temperature}°F
- Today's Range: ${todayHigh ? `${todayLow}°F - ${todayHigh}°F` : 'Unknown'}
- Condition: ${condition}
- Chance of Rain: ${chanceOfRain}%
- Humidity: ${humidity || 'Unknown'}%
- Wind: ${windSpeed || 'Unknown'} mph ${windDirection || ''}
- UV Index: ${uvIndex || 'Unknown'}
- Visibility: ${visibility || 'Unknown'} miles
- Feels Like: ${feelsLike || 'Unknown'}°F
- Location: ${location}
- Time: ${timeOfDay}
- Recommendation: ${recommendationType === 'tomorrow' ? 'for tomorrow' : 'for now'}${forecastContext}

Context: ${timeContext}

Please provide a friendly, practical outfit recommendation that considers:
1. Current temperature and today's temperature range
2. Weather conditions (rain, snow, wind, etc.)
3. Humidity and comfort factors
4. UV protection needs
5. Wind and visibility considerations
6. Time of day and activities
7. Any specific items to consider or avoid

Keep the recommendation concise (under 100 words) and encouraging. This is for a smart mirror display.`;
  }


  /**
   * Generate weather-aware outfit analysis prompt
   * @param {Object} weatherData - Weather information
   * @returns {string} - Formatted prompt for AI
   */
  static generateWeatherAwareOutfitPrompt(weatherData) {
    if (!weatherData || weatherData.error || !weatherData.current) {
      return "Analyze this outfit and give fashion advice. Be encouraging and constructive.";
    }
    
    const { temperature, condition } = weatherData.current;
    return `Yo! It's ${temperature}°F and ${condition} out there. Check this outfit and tell me what's good, what's not, and how to keep it fresh for the weather. Keep it real but encouraging, like Snoop Dogg giving fashion advice. Make it short and sweet, nephew!`;
  }

  /**
   * Generate basic outfit analysis prompt
   * @returns {string} - Formatted prompt for AI
   */
  static generateOutfitAnalysisPrompt() {
    return "Analyze this outfit and provide fashion advice in the style of Snoop Dogg. Use his mannerisms, slang, and style - keep it real, be encouraging and positive. Give genuine fashion advice while maintaining his personality.";
  }

}

module.exports = PromptService;
