import React, { useState, useEffect } from 'react';
import CalendarClient from '../services/calendarClient';
import './CalendarPanel.css';

interface CalendarEvent {
  id: string;
  summary: string;
  description: string;
  start: string;
  end: string;
  location: string;
  attendees: any[];
  isAllDay: boolean;
}

interface CalendarPanelProps {
  events?: CalendarEvent[];
}

interface CalendarData {
  todayEvents: CalendarEvent[];
  nextEvent?: CalendarEvent & { minutesUntil?: number };
  todayCount: number;
  hasNextEvent: boolean;
  summary?: {
    todayEvents: number;
    nextEventIn: string | null;
  };
}

interface AuthStatus {
  authenticated: boolean;
  hasTokens: boolean;
}

interface AuthUrl {
  authUrl: string;
}

const CalendarPanel: React.FC<CalendarPanelProps> = ({ events: propEvents }) => {
  const [calendarData, setCalendarData] = useState<CalendarData | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Check authentication status and handle OAuth redirect
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const status = await CalendarClient.getAuthStatus() as AuthStatus;
        console.log('Auth status:', status);
        setIsAuthenticated(status.authenticated);
        
        // If we just came back from OAuth, refresh calendar data
        const urlParams = new URLSearchParams(window.location.search);
        console.log('URL params:', urlParams.toString());
        if (urlParams.get('calendar') === 'connected') {
          console.log('Calendar connected, refreshing data...');
          // Clear the URL parameter
          window.history.replaceState({}, document.title, window.location.pathname);
          // Refresh calendar data
          if (status.authenticated) {
            fetchCalendarData();
          }
        }
      } catch (error) {
        console.error('Error checking auth status:', error);
        setIsAuthenticated(false);
      }
    };
    checkAuth();
  }, []);

  // Extract fetchCalendarData function
  const fetchCalendarData = async () => {
    if (!isAuthenticated) {
      setIsLoading(false);
      return;
    }

    try {
      setIsLoading(true);
      const summary = await CalendarClient.getCalendarSummary() as CalendarData;
      setCalendarData(summary);
      setError(null);
    } catch (error) {
      console.error('Error fetching calendar data:', error);
      setError('Failed to load calendar data');
    } finally {
      setIsLoading(false);
    }
  };

  // Fetch calendar data
  useEffect(() => {
    fetchCalendarData();
  }, [isAuthenticated]);

  const getEventIcon = (event: CalendarEvent) => {
    const summary = event.summary?.toLowerCase() || '';
    if (summary.includes('meeting') || summary.includes('call')) {
      return '👥';
    } else if (summary.includes('appointment') || summary.includes('doctor')) {
      return '🏥';
    } else if (summary.includes('lunch') || summary.includes('dinner')) {
      return '🍽️';
    } else if (summary.includes('workout') || summary.includes('gym')) {
      return '💪';
    } else if (event.isAllDay) {
      return '📅';
    } else {
      return '📝';
    }
  };

  // Use prop events if provided, otherwise use fetched data
  const events = propEvents || calendarData?.todayEvents || [];

  if (!isAuthenticated) {
    return (
      <div className="calendar-panel">
        <h3 className="panel-title">Calendar</h3>
        <div className="calendar-auth">
          <div className="auth-icon">🔗</div>
          <p>Connect your Google Calendar</p>
          <button 
            className="auth-button"
            onClick={async () => {
              try {
                const { authUrl } = await CalendarClient.getAuthUrl() as AuthUrl;
                window.location.href = authUrl;
              } catch (error) {
                console.error('Error getting auth URL:', error);
              }
            }}
          >
            Connect Calendar
          </button>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="calendar-panel">
        <h3 className="panel-title">Today's Schedule</h3>
        <div className="loading">Loading calendar...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="calendar-panel">
        <h3 className="panel-title">Today's Schedule</h3>
        <div className="error">Error: {error}</div>
      </div>
    );
  }

  return (
    <div className="calendar-panel">
      <h3 className="panel-title">Today's Schedule</h3>
      
      {calendarData?.nextEvent && (
        <div className="next-event">
          <div className="next-event-icon">⏰</div>
          <div className="next-event-details">
            <div className="next-event-title">{calendarData.nextEvent.summary}</div>
            <div className="next-event-time">
              {calendarData.nextEvent.minutesUntil} minutes
            </div>
          </div>
        </div>
      )}
      
      <div className="events-list">
        {events.length > 0 ? (
          events.map((event: CalendarEvent) => (
            <div 
              key={event.id} 
              className="event-item"
            >
              <div className="event-icon">
                {getEventIcon(event)}
              </div>
              <div className="event-details">
                <div className="event-title">{event.summary}</div>
                <div className="event-time">
                  {CalendarClient.formatEventTime(event.start, event.end, event.isAllDay)}
                </div>
                {event.location && (
                  <div className="event-location">📍 {event.location}</div>
                )}
              </div>
            </div>
          ))
        ) : (
          <div className="no-events">
            <div className="no-events-icon">📅</div>
            <p>No events scheduled for today</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CalendarPanel;
