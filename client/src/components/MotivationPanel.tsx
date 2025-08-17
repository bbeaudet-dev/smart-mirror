import React from 'react';
import './MotivationPanel.css';

interface MotivationPanelProps {
  motivation: string | null;
  timeOfDay: string;
  loading?: boolean;
}

const MotivationPanel: React.FC<MotivationPanelProps> = ({ 
  motivation, 
  timeOfDay, 
  loading = false 
}) => {
  if (loading) {
    return (
      <div className="motivation-panel">
        <div className="motivation-header">
          <h3>Daily Motivation</h3>
          <span className="time-of-day">{timeOfDay}</span>
        </div>
        <div className="motivation-content loading">
          <div className="loading-dots">...</div>
        </div>
      </div>
    );
  }

  if (!motivation) {
    return (
      <div className="motivation-panel">
        <div className="motivation-header">
          <h3>Daily Motivation</h3>
          <span className="time-of-day">{timeOfDay}</span>
        </div>
        <div className="motivation-content">
          <p>Loading your daily inspiration...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="motivation-panel">
      <div className="motivation-header">
        <h3>Daily Motivation</h3>
        <span className="time-of-day">{timeOfDay}</span>
      </div>
      <div className="motivation-content">
        <p>{motivation}</p>
      </div>
    </div>
  );
};

export default MotivationPanel;
