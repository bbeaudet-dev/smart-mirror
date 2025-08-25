const axios = require('axios');
const { OpenAI } = require('openai');
const PromptService = require('./promptService');

class NewsService {
  constructor() {
    this.apiKey = process.env.NEWS_API_KEY;
    this.baseUrl = 'https://newsapi.org/v2';
    this.openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });
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

      const articles = response.data.articles.map(article => ({
        id: article.url, // Use URL as unique identifier
        title: article.title,
        description: article.description,
        source: article.source.name,
        url: article.url,
        publishedAt: article.publishedAt
      }));

      // Summarize headlines using AI
      const summarizedArticles = await this.summarizeHeadlines(articles);
      
      return summarizedArticles;

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
   * Summarize news headlines using AI
   */
  async summarizeHeadlines(headlines) {
    try {
      if (!process.env.OPENAI_API_KEY) {
        console.log('OpenAI API key not configured, returning original headlines');
        return headlines;
      }

      console.log('Summarizing headlines with AI...');

      const prompt = PromptService.generateNewsSummarizationPrompt(headlines);

      const response = await this.openai.chat.completions.create({
        model: 'gpt-4o-mini',
        messages: [
          {
            role: 'system',
            content: 'You are a news editor who creates concise, clear headlines. Remove fluff and unnecessary words while keeping the essential information.'
          },
          {
            role: 'user',
            content: prompt
          }
        ],
        max_tokens: 300,
        temperature: 0.3
      });

      const summarizedText = response.choices[0].message.content.trim();
      const summarizedHeadlines = summarizedText.split('\n').filter(line => line.trim());

      // Map summarized headlines back to original data
      return headlines.map((headline, index) => ({
        ...headline,
        title: summarizedHeadlines[index] || headline.title
      }));

    } catch (error) {
      console.error('Error summarizing headlines:', error);
      return headlines; // Fallback to original headlines
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
