import React, { useState, useEffect } from 'react';

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

  const formatDate = (date: Date): { dayShort: string; fullDate: string } => {
    const dayShort = date.toLocaleDateString('en-US', { weekday: 'long' });
    const fullDate = date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
    return { dayShort, fullDate };
  };

  const { hours, minutes, seconds, period } = formatTime(currentTime);
  const { dayShort, fullDate } = formatDate(currentTime);

  return (
    <div className="text-center text-mirror-text-bright">
      <div className="mb-2">
        <span className="text-mirror-2xl font-light font-mirror-primary tracking-tighter leading-none">
          {hours}:{minutes}
        </span>
        <span className="text-mirror-xl font-light text-mirror-text-dimmed ml-1">
          :{seconds}
        </span>
        <span className="text-mirror-xl font-light text-mirror-text ml-1">
          {period}
        </span>
      </div>
      <div className="text-mirror-lg font-normal text-mirror-text font-mirror-primary">
        <span className="text-mirror-text-dimmed">{dayShort}</span>
        <span className="text-mirror-text"> {fullDate}</span>
      </div>
    </div>
  );
};

export default TimeDisplay;
