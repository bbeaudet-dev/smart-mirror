import ApiClient from './apiClient';

class NewsClient {
  /**
   * Get top headlines
   */
  static async getHeadlines(count = 5) {
    return ApiClient.get(`/api/news/headlines?count=${count}`);
  }

  /**
   * Get news by category
   */
  static async getNewsByCategory(category, count = 5) {
    return ApiClient.get(`/api/news/category/${category}?count=${count}`);
  }

  /**
   * Format news timestamp
   */
  static formatTimestamp(timestamp) {
    try {
      const date = new Date(timestamp);
      const now = new Date();
      const diffMs = now - date;
      const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
      const diffMinutes = Math.floor(diffMs / (1000 * 60));

      if (diffHours > 0) {
        return `${diffHours}h ago`;
      } else if (diffMinutes > 0) {
        return `${diffMinutes}m ago`;
      } else {
        return 'Just now';
      }
    } catch (error) {
      console.error('Error formatting timestamp:', error);
      return '';
    }
  }

  /**
   * Truncate headline text
   */
  static truncateHeadline(text, maxLength = 80) {
    if (!text) return '';
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
  }
}

export default NewsClient;
