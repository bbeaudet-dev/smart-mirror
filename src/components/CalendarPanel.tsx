import React from 'react';
import { CalendarEvent } from '../data/mockData';
import './CalendarPanel.css';

interface CalendarPanelProps {
  events: CalendarEvent[];
}

const CalendarPanel: React.FC<CalendarPanelProps> = ({ events }) => {
  const getEventIcon = (type: string) => {
    switch (type) {
      case 'meeting':
        return '👥';
      case 'appointment':
        return '📅';
      case 'reminder':
        return '⏰';
      default:
        return '📝';
    }
  };

  const getEventColor = (type: string) => {
    switch (type) {
      case 'meeting':
        return '#74b9ff';
      case 'appointment':
        return '#fd79a8';
      case 'reminder':
        return '#fdcb6e';
      default:
        return '#a29bfe';
    }
  };

  return (
    <div className="calendar-panel">
      <h3 className="panel-title">Today's Schedule</h3>
      
      <div className="events-list">
        {events.length > 0 ? (
          events.map((event) => (
            <div 
              key={event.id} 
              className="event-item"
              style={{ borderLeftColor: getEventColor(event.type) }}
            >
              <div className="event-icon">
                {getEventIcon(event.type)}
              </div>
              <div className="event-details">
                <div className="event-title">{event.title}</div>
                <div className="event-time">{event.time}</div>
              </div>
              <div className="event-type">
                {event.type.charAt(0).toUpperCase() + event.type.slice(1)}
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

      <div className="calendar-summary">
        <div className="summary-item">
          <span className="summary-label">Total Events:</span>
          <span className="summary-value">{events.length}</span>
        </div>
        <div className="summary-item">
          <span className="summary-label">Next Event:</span>
          <span className="summary-value">
            {events.length > 0 ? events[0].time : 'None'}
          </span>
        </div>
      </div>
    </div>
  );
};

export default CalendarPanel;
