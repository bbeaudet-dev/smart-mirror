const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5500';

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
   * @returns {Promise<Object>} - Complete daily data
   */
  static async getDailySummary() {
    return this.get('/api/daily-summary');
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
   * @returns {Promise<Object>} - Outfit recommendation
   */
  static async getOutfitRecommendation(temperature = 72, condition = 'sunny') {
    return this.get(`/api/outfit-suggestion?temperature=${temperature}&condition=${condition}`);
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
}

export default ApiClient;
