const { google } = require('googleapis');
const { OAuth2Client } = require('google-auth-library');

class CalendarService {
  constructor() {
    this.oAuth2Client = new OAuth2Client(
      process.env.GOOGLE_CLIENT_ID,
      process.env.GOOGLE_CLIENT_SECRET,
      process.env.GOOGLE_REDIRECT_URI || 'http://localhost:5005/api/auth/google/callback'
    );
    
    this.calendar = google.calendar({ version: 'v3' });
  }

  /**
   * Generate OAuth URL for Google Calendar authorization
   */
  generateAuthUrl() {
    const scopes = [
      'https://www.googleapis.com/auth/calendar.readonly',
      'https://www.googleapis.com/auth/calendar.events.readonly'
    ];

    return this.oAuth2Client.generateAuthUrl({
      access_type: 'offline',
      scope: scopes,
      prompt: 'consent'
    });
  }

  /**
   * Exchange authorization code for tokens
   */
  async getTokensFromCode(code) {
    try {
      const { tokens } = await this.oAuth2Client.getToken(code);
      this.oAuth2Client.setCredentials(tokens);
      return tokens;
    } catch (error) {
      console.error('Error getting tokens:', error);
      throw new Error('Failed to get access tokens');
    }
  }

  /**
   * Set credentials from stored tokens
   */
  setCredentials(tokens) {
    this.oAuth2Client.setCredentials(tokens);
  }

  /**
   * Get events for a specific date
   */
  async getEventsForDate(date) {
    try {
      // Check if credentials are properly configured
      if (!this.oAuth2Client.credentials || !this.oAuth2Client.credentials.access_token) {
        throw new Error('Google Calendar not authenticated. Please complete OAuth setup.');
      }

      // Get the date in UTC and let Google Calendar handle timezone conversion
      const startOfDay = new Date(date.getFullYear(), date.getMonth(), date.getDate());
      const endOfDay = new Date(startOfDay.getTime() + (24 * 60 * 60 * 1000));

      console.log('Fetching events from:', startOfDay.toISOString(), 'to:', endOfDay.toISOString());

      const response = await this.calendar.events.list({
        auth: this.oAuth2Client,
        calendarId: 'primary',
        timeMin: startOfDay.toISOString(),
        timeMax: endOfDay.toISOString(),
        singleEvents: true,
        orderBy: 'startTime',
        maxResults: 10
      });

      console.log('Raw calendar response:', response.data.items);

      return response.data.items.map(event => {
        const startDate = event.start.dateTime || event.start.date;
        const endDate = event.end.dateTime || event.end.date;
        
        console.log('Processing event:', event.summary, 'start:', startDate, 'end:', endDate);
        
        return {
          id: event.id,
          summary: event.summary || 'No Title',
          description: event.description || '',
          start: startDate,
          end: endDate,
          location: event.location || '',
          attendees: event.attendees || [],
          isAllDay: !event.start.dateTime
        };
      });
    } catch (error) {
      console.error('Error fetching calendar events:', error);
      
      // Provide more specific error messages
      if (error.message.includes('invalid_grant')) {
        throw new Error('Google Calendar access token expired. Please re-authenticate.');
      } else if (error.message.includes('access_denied')) {
        throw new Error('Google Calendar access denied. Please check permissions.');
      } else if (error.message.includes('not authenticated')) {
        throw new Error('Google Calendar not authenticated. Please complete OAuth setup.');
      } else {
        throw new Error(`Failed to fetch calendar events: ${error.message}`);
      }
    }
  }

  /**
   * Get today's calendar events
   */
  async getTodayEvents() {
    const now = new Date();
    return this.getEventsForDate(now);
  }

  /**
   * Get tomorrow's calendar events
   */
  async getTomorrowEvents() {
    const now = new Date();
    const tomorrow = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1);
    return this.getEventsForDate(tomorrow);
  }

  /**
   * Get next upcoming event
   */
  async getNextEvent() {
    try {
      const now = new Date();
      const response = await this.calendar.events.list({
        auth: this.oAuth2Client,
        calendarId: 'primary',
        timeMin: now.toISOString(),
        singleEvents: true,
        orderBy: 'startTime',
        maxResults: 1
      });

      if (response.data.items.length === 0) {
        return null;
      }

      const event = response.data.items[0];
      return {
        id: event.id,
        summary: event.summary || 'No Title',
        description: event.description || '',
        start: event.start.dateTime || event.start.date,
        end: event.end.dateTime || event.end.date,
        location: event.location || '',
        attendees: event.attendees || [],
        isAllDay: !event.start.dateTime
      };
    } catch (error) {
      console.error('Error fetching next event:', error);
      throw new Error('Failed to fetch next event');
    }
  }

  /**
   * Get events for the next 7 days
   */
  async getUpcomingEvents(days = 7) {
    try {
      const now = new Date();
      const endDate = new Date();
      endDate.setDate(now.getDate() + days);

      const response = await this.calendar.events.list({
        auth: this.oAuth2Client,
        calendarId: 'primary',
        timeMin: now.toISOString(),
        timeMax: endDate.toISOString(),
        singleEvents: true,
        orderBy: 'startTime',
        maxResults: 20
      });

      return response.data.items.map(event => ({
        id: event.id,
        summary: event.summary || 'No Title',
        description: event.description || '',
        start: event.start.dateTime || event.start.date,
        end: event.end.dateTime || event.end.date,
        location: event.location || '',
        attendees: event.attendees || [],
        isAllDay: !event.start.dateTime
      }));
    } catch (error) {
      console.error('Error fetching upcoming events:', error);
      throw new Error('Failed to fetch upcoming events');
    }
  }
}

module.exports = new CalendarService();
