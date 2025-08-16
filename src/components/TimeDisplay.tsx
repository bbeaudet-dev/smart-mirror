import React, { useState, useEffect } from 'react';
import './TimeDisplay.css';

const TimeDisplay: React.FC = () => {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (date: Date): { hours: string; minutes: string; seconds: string; period: string } => {
    let hours = date.getHours();
    const period = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12; // Convert 0 to 12
    
    const hoursStr = hours.toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const seconds = date.getSeconds().toString().padStart(2, '0');
    
    return { hours: hoursStr, minutes, seconds, period };
  };

  const formatDate = (date: Date): string => {
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const { hours, minutes, seconds, period } = formatTime(currentTime);

  return (
    <div className="time-display">
      <div className="time">
        <span className="time-main">{hours}:{minutes}</span>
        <span className="time-seconds">:{seconds}</span>
        <span className="time-period"> {period}</span>
      </div>
      <div className="date">{formatDate(currentTime)}</div>
    </div>
  );
};

export default TimeDisplay;
