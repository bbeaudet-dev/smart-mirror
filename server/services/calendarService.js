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
    
    // Load stored tokens on initialization
    this.loadStoredTokens();
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
   * Set credentials from stored tokens with automatic refresh
   */
  setCredentials(tokens) {
    this.oAuth2Client.setCredentials(tokens);
    
    // Set up automatic token refresh
    this.oAuth2Client.on('tokens', (newTokens) => {
      console.log('Tokens refreshed automatically');
      // Save the new tokens
      this.saveTokens(newTokens);
    });
  }

  /**
   * Load stored tokens from file
   */
  loadStoredTokens() {
    const fs = require('fs');
    const path = require('path');
    
    try {
      const tokensFile = path.join(__dirname, '..', 'data', 'tokens.json');
      if (fs.existsSync(tokensFile)) {
        const tokensData = fs.readFileSync(tokensFile, 'utf8');
        const tokens = JSON.parse(tokensData);
        this.setCredentials(tokens);
        console.log('Loaded stored tokens successfully');
        return true;
      }
    } catch (error) {
      console.log('No stored tokens found or error loading tokens:', error.message);
    }
    return false;
  }

  /**
   * Save tokens to file
   */
  saveTokens(tokens) {
    const fs = require('fs');
    const path = require('path');
    
    try {
      const dataDir = path.join(__dirname, '..', 'data');
      if (!fs.existsSync(dataDir)) {
        fs.mkdirSync(dataDir, { recursive: true });
      }
      
      fs.writeFileSync(
        path.join(dataDir, 'tokens.json'),
        JSON.stringify(tokens, null, 2)
      );
      console.log('Tokens saved successfully');
    } catch (error) {
      console.error('Error saving tokens:', error);
    }
  }

  /**
   * Refresh tokens if needed
   */
  async refreshTokensIfNeeded() {
    try {
      if (this.oAuth2Client.credentials && this.oAuth2Client.credentials.refresh_token) {
        await this.oAuth2Client.refreshAccessToken();
        console.log('Tokens refreshed successfully');
        return true;
      }
      return false;
    } catch (error) {
      console.error('Error refreshing tokens:', error);
      return false;
    }
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

      // Try to refresh tokens if they might be expired
      await this.refreshTokensIfNeeded();

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
    try {
      const now = new Date();
      return await this.getEventsForDate(now);
    } catch (error) {
      console.log('Calendar service failed, returning dummy data:', error.message);
      return this.getDummyTodayEvents();
    }
  }

  /**
   * Get dummy calendar events for demo purposes
   */
  getDummyTodayEvents() {
    const now = new Date();
    const today = now.toISOString().split('T')[0]; // YYYY-MM-DD format
    
    return [
      {
        id: 'dummy-1',
        summary: 'Team Standup',
        description: 'Daily team sync meeting',
        start: `${today}T09:00:00Z`,
        end: `${today}T09:30:00Z`,
        location: 'Conference Room A',
        attendees: [],
        isAllDay: false
      },
      {
        id: 'dummy-2',
        summary: 'Lunch with Sarah',
        description: 'Discuss project updates',
        start: `${today}T12:00:00Z`,
        end: `${today}T13:00:00Z`,
        location: 'Downtown Cafe',
        attendees: [],
        isAllDay: false
      },
      {
        id: 'dummy-3',
        summary: 'Client Meeting',
        description: 'Quarterly review with ABC Corp',
        start: `${today}T14:30:00Z`,
        end: `${today}T15:30:00Z`,
        location: 'Virtual',
        attendees: [],
        isAllDay: false
      },
      {
        id: 'dummy-4',
        summary: 'Gym Session',
        description: 'Cardio and strength training',
        start: `${today}T17:00:00Z`,
        end: `${today}T18:00:00Z`,
        location: 'Fitness Center',
        attendees: [],
        isAllDay: false
      }
    ];
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
        return this.getDummyNextEvent();
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
      console.log('Calendar service failed, returning dummy next event:', error.message);
      return this.getDummyNextEvent();
    }
  }

  /**
   * Get dummy next event for demo purposes
   */
  getDummyNextEvent() {
    const now = new Date();
    const today = now.toISOString().split('T')[0];
    
    // Find the next event from today's dummy events
    const todayEvents = this.getDummyTodayEvents();
    const nowTime = now.getTime();
    
    for (const event of todayEvents) {
      const eventTime = new Date(event.start).getTime();
      if (eventTime > nowTime) {
        return event;
      }
    }
    
    // If no upcoming events today, return tomorrow's first event
    const tomorrow = new Date(now);
    tomorrow.setDate(now.getDate() + 1);
    const tomorrowStr = tomorrow.toISOString().split('T')[0];
    
    return {
      id: 'dummy-next',
      summary: 'Product Review',
      description: 'Review new features',
      start: `${tomorrowStr}T10:00:00Z`,
      end: `${tomorrowStr}T11:00:00Z`,
      location: 'Meeting Room B',
      attendees: [],
      isAllDay: false
    };
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
      console.log('Calendar service failed, returning dummy upcoming events:', error.message);
      return this.getDummyUpcomingEvents(days);
    }
  }

  /**
   * Get dummy upcoming events for demo purposes
   */
  getDummyUpcomingEvents(days = 7) {
    const now = new Date();
    const events = [];
    
    // Add today's events
    const today = now.toISOString().split('T')[0];
    events.push(
      {
        id: 'dummy-today-1',
        summary: 'Team Standup',
        description: 'Daily team sync meeting',
        start: `${today}T09:00:00Z`,
        end: `${today}T09:30:00Z`,
        location: 'Conference Room A',
        attendees: [],
        isAllDay: false
      },
      {
        id: 'dummy-today-2',
        summary: 'Lunch with Sarah',
        description: 'Discuss project updates',
        start: `${today}T12:00:00Z`,
        end: `${today}T13:00:00Z`,
        location: 'Downtown Cafe',
        attendees: [],
        isAllDay: false
      }
    );

    // Add tomorrow's events
    const tomorrow = new Date(now);
    tomorrow.setDate(now.getDate() + 1);
    const tomorrowStr = tomorrow.toISOString().split('T')[0];
    events.push(
      {
        id: 'dummy-tomorrow-1',
        summary: 'Product Review',
        description: 'Review new features',
        start: `${tomorrowStr}T10:00:00Z`,
        end: `${tomorrowStr}T11:00:00Z`,
        location: 'Meeting Room B',
        attendees: [],
        isAllDay: false
      },
      {
        id: 'dummy-tomorrow-2',
        summary: 'Dentist Appointment',
        description: 'Regular checkup',
        start: `${tomorrowStr}T14:00:00Z`,
        end: `${tomorrowStr}T15:00:00Z`,
        location: 'Dr. Smith Office',
        attendees: [],
        isAllDay: false
      }
    );

    // Add a few more days
    for (let i = 2; i < Math.min(days, 5); i++) {
      const futureDate = new Date(now);
      futureDate.setDate(now.getDate() + i);
      const futureStr = futureDate.toISOString().split('T')[0];
      
      events.push({
        id: `dummy-future-${i}`,
        summary: `Future Event ${i}`,
        description: `Demo event for day ${i + 1}`,
        start: `${futureStr}T15:00:00Z`,
        end: `${futureStr}T16:00:00Z`,
        location: 'TBD',
        attendees: [],
        isAllDay: false
      });
    }

    return events;
  }
}

module.exports = new CalendarService();
