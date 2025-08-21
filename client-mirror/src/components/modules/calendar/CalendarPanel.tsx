import React, { useState, useEffect } from 'react';
import CalendarClient from '../../../services/calendarClient';

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
      <div className="flex flex-col h-full">
        <h3 className="mirror-header">Calendar</h3>
        <div className="flex-1 flex flex-col items-center justify-center text-center">
          <div className="text-mirror-lg text-mirror-text-dimmed mb-2">🔗</div>
          <p className="text-mirror-sm text-mirror-text font-mirror-primary mb-4">
            Connect your Google Calendar
          </p>
          <button 
            className="border border-mirror-text-dimmed text-mirror-text px-3 py-1 text-mirror-xs font-mirror-primary hover:border-mirror-text hover:text-mirror-text-bright transition-colors"
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
      <div className="flex flex-col h-full">
        <h3 className="mirror-header">Today's Schedule</h3>
        <div className="flex-1 flex items-center justify-center">
          <div className="text-mirror-sm text-mirror-text-dimmed font-mirror-primary">
            Loading calendar...
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col h-full">
        <h3 className="mirror-header">Today's Schedule</h3>
        <div className="flex-1 flex items-center justify-center">
          <div className="text-mirror-sm text-mirror-text-dimmed font-mirror-primary">
            Error: {error}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full">
      <h3 className="mirror-header">Today's Schedule</h3>
      
      {calendarData?.nextEvent && (
        <div className="flex items-center mb-3 pl-2 border-l-2 border-mirror-text-bright">
          <div className="text-mirror-sm text-mirror-text-bright mr-2">⏰</div>
          <div className="flex-1">
            <div className="text-mirror-xs text-mirror-text-bright font-mirror-primary">
              {calendarData.nextEvent.summary}
            </div>
            <div className="text-mirror-xs text-mirror-text-bright font-mirror-primary">
              {calendarData.nextEvent.minutesUntil} minutes
            </div>
          </div>
        </div>
      )}
      
      <div className="flex-1">
        {events.length > 0 ? (
          <div className="space-y-1">
            {events.map((event: CalendarEvent) => (
              <div 
                key={event.id} 
                className="flex items-center"
              >
                <div className="text-mirror-sm text-mirror-text-dimmed mr-2">
                  {getEventIcon(event)}
                </div>
                <div className="flex-1">
                  <div className="text-mirror-xs text-mirror-text font-mirror-primary">
                    {event.summary}
                  </div>
                  <div className="text-mirror-xs text-mirror-text-dimmed font-mirror-primary">
                    {CalendarClient.formatEventTime(event.start, event.end, event.isAllDay)}
                  </div>
                  {event.location && (
                    <div className="text-mirror-xs text-mirror-text-dimmed font-mirror-primary">
                      📍 {event.location}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center text-center">
            <div className="text-mirror-lg text-mirror-text-dimmed mb-2">📅</div>
            <p className="text-mirror-sm text-mirror-text font-mirror-primary">
              No events scheduled for today
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CalendarPanel;
