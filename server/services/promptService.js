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
   * Generate Snoop Dogg outfit analysis prompt
   * @param {Object} weatherData - Weather information
   * @returns {string} - Formatted prompt for AI
   */
  static generateSnoopPrompt(weatherData) {
    if (!weatherData || weatherData.error || !weatherData.current) {
      return `You are Snoop Dogg. Look at this person's outfit and compliment them on what you see. Be specific about colors, items, or style. Keep it under 50 words and be entertaining.`;
    }
    
    const { temperature, condition } = weatherData.current;
    return `You are Snoop Dogg. It's ${temperature}°F and ${condition} today. Look at this person's outfit and compliment them on what you see. Be specific about colors, items, or style. Keep it under 50 words and be entertaining.`;
  }

  /**
   * Generate Magic Mirror outfit analysis prompt
   * @param {Object} weatherData - Weather information
   * @returns {string} - Formatted prompt for AI
   */
  static generateMagicMirrorPrompt(weatherData) {
    if (!weatherData || weatherData.error || !weatherData.current) {
      return `You are the Magic Mirror from Snow White. Look at this person's outfit and compliment them on what you see. Be specific about colors, items, or style. Keep it under 50 words and be encouraging.`;
    }
    
    const { temperature, condition } = weatherData.current;
    return `You are the Magic Mirror from Snow White. It's ${temperature}°F and ${condition} today. Look at this person's outfit and compliment them on what you see. Be specific about colors, items, or style. Keep it under 40 words and be encouraging. Maintain consistent, warm enthusiasm throughout.`;
  }

  /**
   * Generate Snoop Dogg outfit analysis prompt
   * @param {Object} weatherData - Weather information
   * @returns {string} - Formatted prompt for AI
   */
  static generateSnoopDoggPrompt(weatherData) {
    if (!weatherData || weatherData.error || !weatherData.current) {
      return `You are Snoop Dogg. Look at this person's outfit and give them a cool, hip-hop style compliment. Be specific about colors, items, or style. Use Snoop's signature style - laid back, cool, and positive. Keep it under 40 words.`;
    }
    
    const { temperature, condition } = weatherData.current;
    return `You are Snoop Dogg. It's ${temperature}°F and ${condition} today. Look at this person's outfit and give them a cool, hip-hop style compliment. Be specific about colors, items, or style. Use Snoop's signature style - laid back, cool, and positive. Keep it under 40 words.`;
  }

  /**
   * Generate Apathetic Fashion Critic prompt
   * @param {Object} weatherData - Weather information
   * @returns {string} - Formatted prompt for AI
   */
  static generateApatheticPrompt(weatherData) {
    if (!weatherData || weatherData.error || !weatherData.current) {
      return `You are the most bored, apathetic person alive who couldn't care less about fashion. Look at this person's outfit and give them the most monotone, unenthusiastic response possible. Be specific about what you see but sound like you're about to fall asleep from boredom. Use phrases like "whatever", "I guess", "sure", "fine". Keep it under 40 words and make it so boring it's funny.`;
    }
    
    const { temperature, condition } = weatherData.current;
    return `You are the most bored, apathetic person alive who couldn't care less about fashion. It's ${temperature}°F and ${condition} today. Look at this person's outfit and give them the most monotone, unenthusiastic response possible. Be specific about what you see but sound like you're about to fall asleep from boredom. Use phrases like "whatever", "I guess", "sure", "fine". Keep it under 40 words and make it so boring it's funny.`;
  }

  /**
   * Generate random personality-based outfit analysis prompt
   * @param {Object} weatherData - Weather information
   * @returns {string} - Formatted prompt for AI
   */
  static generateRandomPersonalityPrompt(weatherData) {
    const personalities = [
      { name: 'Magic Mirror', generator: this.generateMagicMirrorPrompt },
      { name: 'Snoop Dogg', generator: this.generateSnoopDoggPrompt },
      { name: 'Apathetic', generator: this.generateApatheticPrompt }
    ];
    
    const randomIndex = Math.floor(Math.random() * personalities.length);
    const selectedPersonality = personalities[randomIndex];
    
    console.log(`🎭 Selected personality: ${selectedPersonality.name}`);
    
    return selectedPersonality.generator.call(this, weatherData);
  }

  /**
   * Generate weather-aware outfit analysis prompt
   * @param {Object} weatherData - Weather information
   * @returns {string} - Formatted prompt for AI
   */
  static generateWeatherAwareOutfitPrompt(weatherData) {
    if (!weatherData || weatherData.error || !weatherData.current) {
      return "Analyze this outfit.";
    }
    
    const { temperature, condition } = weatherData.current;
    return `It's ${temperature}°F and ${condition}. Analyze this outfit.`;
  }

  /**
   * Generate basic outfit analysis prompt
   * @returns {string} - Formatted prompt for AI
   */
  static generateOutfitAnalysisPrompt() {
    return "Analyze this outfit.";
  }

  /**
   * Generate news headline summarization prompt
   * @param {Array} headlines - Array of news headlines with titles and descriptions
   * @returns {string} - Formatted prompt for AI
   */
  static generateNewsSummarizationPrompt(headlines) {
    const headlinesText = headlines.map((headline, index) => 
      `${index + 1}. ${headline.title}\n   ${headline.description || 'No description'}`
    ).join('\n\n');

    return `Summarize these news headlines. For each headline:
1. Remove unnecessary words and fluff
2. Keep the core news story
3. Make it concise (max 60 characters)
4. Keep it factual and clear
5. Remove source names from titles

Format each response as just the summarized headline, one per line.

Headlines:
${headlinesText}`;
  }

}

module.exports = PromptService;
