const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5005';

class ApiClient {
  /**
   * Make a GET request to the API
   * @param {string} endpoint - API endpoint
   * @returns {Promise<Object>} - Response data
   */
  static async get(endpoint) {
    try {
      const response = await fetch(`${API_BASE_URL}${endpoint}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error(`API GET Error (${endpoint}):`, error);
      throw error;
    }
  }

  /**
   * Make a POST request to the API
   * @param {string} endpoint - API endpoint
   * @param {Object} data - Request body
   * @returns {Promise<Object>} - Response data
   */
  static async post(endpoint, data) {
    try {
      const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error(`API POST Error (${endpoint}):`, error);
      throw error;
    }
  }

  /**
   * Get daily summary data
   * @param {string} location - Optional location override
   * @returns {Promise<Object>} - Complete daily data
   */
  static async getDailySummary(location = null) {
    const params = location ? `?location=${encodeURIComponent(location)}` : '';
    return this.get(`/api/daily-summary${params}`);
  }

  /**
   * Get weather data
   * @returns {Promise<Object>} - Weather information
   */
  static async getWeather() {
    return this.get('/api/weather');
  }

  /**
   * Get calendar events
   * @returns {Promise<Array>} - Calendar events
   */
  static async getCalendar() {
    return this.get('/api/calendar');
  }

  /**
   * Get routine by type
   * @param {string} type - 'morning' or 'evening'
   * @returns {Promise<Array>} - Routine tasks
   */
  static async getRoutine(type) {
    return this.get(`/api/routine/${type}`);
  }

  /**
   * Get news headlines
   * @returns {Promise<Array>} - News articles
   */
  static async getNews() {
    return this.get('/api/news');
  }

  /**
   * Get horoscope data
   * @returns {Promise<Object>} - Horoscope information
   */
  static async getHoroscope() {
    return this.get('/api/horoscope');
  }

  /**
   * Get outfit recommendation based on weather
   * @param {number} temperature - Temperature in Fahrenheit
   * @param {string} condition - Weather condition
   * @param {string} timeOfDay - Time of day (morning/afternoon/evening/night)
   * @param {string} recommendationType - Type of recommendation (current/tomorrow)
   * @param {Array} forecast - Weather forecast data
   * @returns {Promise<Object>} - Outfit recommendation
   */
  static async getOutfitRecommendation(temperature, condition, timeOfDay, recommendationType, forecast) {
    if (!temperature || !condition) {
      throw new Error('Temperature and condition are required for outfit recommendations');
    }
    return this.post('/api/ai/outfit-recommendation', {
      temperature,
      condition,
      timeOfDay,
      recommendationType,
      forecast
    });
  }

  /**
   * Send AI chat message
   * @param {string} message - User message
   * @param {string} context - AI context
   * @returns {Promise<Object>} - AI response
   */
  static async sendAiChat(message, context = 'smart-mirror') {
    return this.post('/api/ai/chat', { message, context });
  }

  /**
   * Get motivational message
   * @param {string} timeOfDay - 'morning' or 'evening'
   * @param {string} mood - User mood
   * @returns {Promise<Object>} - Motivational message
   */
  static async getMotivation(timeOfDay = 'morning', mood = 'neutral') {
    return this.post('/api/ai/motivation', { timeOfDay, mood });
  }

  /**
   * Analyze image with AI
   * @param {File} imageFile - Image file
   * @param {string} prompt - Analysis prompt
   * @param {string} context - Analysis context
   * @returns {Promise<Object>} - Analysis result
   */
  static async analyzeImage(imageFile, prompt, context = 'outfit-analysis') {
    const formData = new FormData();
    formData.append('image', imageFile);
    formData.append('prompt', prompt);
    formData.append('context', context);

    try {
      const response = await fetch(`${API_BASE_URL}/api/ai/analyze-image`, {
        method: 'POST',
        body: formData,
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error('Image Analysis Error:', error);
      throw error;
    }
  }

  /**
   * Test image recognition (simple analysis)
   * @param {File} imageFile - Image file
   * @returns {Promise<Object>} - Test analysis result
   */
  static async testImage(imageFile) {
    const formData = new FormData();
    formData.append('image', imageFile);

    try {
      const response = await fetch(`${API_BASE_URL}/api/ai/test-image`, {
        method: 'POST',
        body: formData,
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error('Test Image Analysis Error:', error);
      throw error;
    }
  }

}

export default ApiClient;
