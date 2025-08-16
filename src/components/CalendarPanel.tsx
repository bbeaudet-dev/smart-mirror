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

  return (
    <div className="calendar-panel">
      <h3 className="panel-title">Today's Schedule</h3>
      
      <div className="events-list">
        {events.length > 0 ? (
          events.map((event) => (
            <div 
              key={event.id} 
              className="event-item"
            >
              <div className="event-icon">
                {getEventIcon(event.type)}
              </div>
              <div className="event-details">
                <div className="event-title">{event.title}</div>
                <div className="event-time">{event.time}</div>
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
