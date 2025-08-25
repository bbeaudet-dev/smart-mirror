const axios = require('axios');

class NewsService {
  constructor() {
    this.apiKey = process.env.NEWS_API_KEY;
    this.baseUrl = 'https://newsapi.org/v2';
  }

  /**
   * Check if the service is properly configured
   */
  isConfigured() {
    return !!this.apiKey;
  }

  /**
   * Get top headlines from NewsAPI
   */
  async getTopHeadlines(count = 5) {
    try {
      if (!this.isConfigured()) {
        throw new Error('News API not configured. Please set NEWS_API_KEY environment variable.');
      }

      console.log('Fetching top headlines from NewsAPI...');

      const response = await axios.get(`${this.baseUrl}/top-headlines`, {
        params: {
          country: 'us',
          apiKey: this.apiKey,
          pageSize: count
        }
      });

      console.log('NewsAPI response:', response.data);

      if (response.data.status !== 'ok') {
        throw new Error(`NewsAPI error: ${response.data.message || 'Unknown error'}`);
      }

      return response.data.articles.map(article => ({
        id: article.url, // Use URL as unique identifier
        title: article.title,
        description: article.description,
        source: article.source.name,
        url: article.url,
        publishedAt: article.publishedAt
      }));

    } catch (error) {
      console.error('Error fetching news:', error);
      
      if (error.response?.status === 401) {
        throw new Error('News API key is invalid. Please check your API key.');
      } else if (error.response?.status === 429) {
        throw new Error('News API rate limit exceeded. Please wait before trying again.');
      } else if (error.message.includes('not configured')) {
        throw error;
      } else {
        throw new Error(`Failed to fetch news: ${error.message}`);
      }
    }
  }

  /**
   * Get news by category
   */
  async getNewsByCategory(category, count = 5) {
    try {
      if (!this.isConfigured()) {
        throw new Error('News API not configured. Please set NEWS_API_KEY environment variable.');
      }

      console.log(`Fetching ${category} news from NewsAPI...`);

      const response = await axios.get(`${this.baseUrl}/top-headlines`, {
        params: {
          country: 'us',
          category: category,
          apiKey: this.apiKey,
          pageSize: count
        }
      });

      if (response.data.status !== 'ok') {
        throw new Error(`NewsAPI error: ${response.data.message || 'Unknown error'}`);
      }

      return response.data.articles.map(article => ({
        id: article.url,
        title: article.title,
        description: article.description,
        source: article.source.name,
        url: article.url,
        publishedAt: article.publishedAt
      }));

    } catch (error) {
      console.error(`Error fetching ${category} news:`, error);
      throw new Error(`Failed to fetch ${category} news: ${error.message}`);
    }
  }
}

module.exports = new NewsService();
