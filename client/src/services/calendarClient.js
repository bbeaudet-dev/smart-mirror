import ApiClient from './apiClient';

class CalendarClient {
  /**
   * Get Google OAuth URL
   */
  static async getAuthUrl() {
    return ApiClient.get('/api/auth/google');
  }

  /**
   * Check authentication status
   */
  static async getAuthStatus() {
    return ApiClient.get('/api/auth/google/status');
  }

  /**
   * Logout from Google Calendar
   */
  static async logout() {
    return ApiClient.post('/api/auth/google/logout');
  }

  /**
   * Get today's calendar events
   */
  static async getTodayEvents() {
    return ApiClient.get('/api/calendar/today');
  }

  /**
   * Get next upcoming event
   */
  static async getNextEvent() {
    return ApiClient.get('/api/calendar/next');
  }

  /**
   * Get upcoming events
   */
  static async getUpcomingEvents(days = 7) {
    return ApiClient.get(`/api/calendar/upcoming?days=${days}`);
  }

  /**
   * Get calendar summary
   */
  static async getCalendarSummary() {
    return ApiClient.get('/api/calendar/summary');
  }

  /**
   * Format event time for display
   */
  static formatEventTime(startTime, endTime, isAllDay = false) {
    if (isAllDay) {
      return 'All Day';
    }

    // Handle cases where startTime or endTime might be null/undefined
    if (!startTime || !endTime) {
      return 'Time TBD';
    }

    try {
      const start = new Date(startTime);
      const end = new Date(endTime);
      
      // Check if dates are valid
      if (isNaN(start.getTime()) || isNaN(end.getTime())) {
        return 'Invalid Time';
      }
      
      const startStr = start.toLocaleTimeString('en-US', { 
        hour: 'numeric', 
        minute: '2-digit',
        hour12: true 
      });
      
      const endStr = end.toLocaleTimeString('en-US', { 
        hour: 'numeric', 
        minute: '2-digit',
        hour12: true 
      });

      return `${startStr} - ${endStr}`;
    } catch (error) {
      console.error('Error formatting event time:', error, { startTime, endTime });
      return 'Time Error';
    }
  }

  /**
   * Get time until next event
   */
  static getTimeUntilEvent(eventTime) {
    const now = new Date();
    const event = new Date(eventTime);
    const diffMs = event - now;
    
    if (diffMs <= 0) {
      return 'Now';
    }

    const diffMins = Math.floor(diffMs / (1000 * 60));
    const diffHours = Math.floor(diffMins / 60);
    const diffDays = Math.floor(diffHours / 24);

    if (diffDays > 0) {
      return `${diffDays} day${diffDays > 1 ? 's' : ''}`;
    } else if (diffHours > 0) {
      return `${diffHours} hour${diffHours > 1 ? 's' : ''}`;
    } else {
      return `${diffMins} minute${diffMins > 1 ? 's' : ''}`;
    }
  }
}

export default CalendarClient;
