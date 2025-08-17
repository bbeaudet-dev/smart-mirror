import React, { useState, useEffect } from 'react';
import { RoutineItem } from '../data/types';
import './RoutinePanel.css';

interface RoutinePanelProps {
  morningRoutine: RoutineItem[];
  eveningRoutine: RoutineItem[];
}

const RoutinePanel: React.FC<RoutinePanelProps> = ({ morningRoutine, eveningRoutine }) => {
  const [routine, setRoutine] = useState<RoutineItem[]>([]);
  const [routineType, setRoutineType] = useState<'morning' | 'evening'>('morning');

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      
      const hour = now.getHours();
      if (hour >= 6 && hour < 11) {
        setRoutine(morningRoutine);
        setRoutineType('morning');
      } else if (hour >= 19 && hour < 23) {
        setRoutine(eveningRoutine);
        setRoutineType('evening');
      } else {
        setRoutine([]);
        setRoutineType('morning');
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [morningRoutine, eveningRoutine]);

  const getRoutineIcon = (type: 'morning' | 'evening') => {
    return type === 'morning' ? '🌅' : '🌙';
  };

  const getRoutineTitle = (type: 'morning' | 'evening') => {
    return type === 'morning' ? 'Morning Routine' : 'Evening Routine';
  };

  const completedCount = routine.filter(task => task.completed).length;
  const totalCount = routine.length;
  const progressPercentage = totalCount > 0 ? (completedCount / totalCount) * 100 : 0;

  return (
    <div className="routine-panel">
      <div className="routine-header">
        <div className="routine-icon">{getRoutineIcon(routineType)}</div>
        <h3 className="panel-title">{getRoutineTitle(routineType)}</h3>
      </div>

      {routine.length > 0 ? (
        <>
          <div className="progress-bar">
            <div className="progress-fill" style={{ width: `${progressPercentage}%` }}></div>
            <div className="progress-text">
              {completedCount} of {totalCount} completed
            </div>
          </div>

          <div className="routine-tasks">
            {routine.map((task) => (
              <div 
                key={task.id} 
                className={`routine-task ${task.completed ? 'completed' : ''}`}
              >
                <div className="task-checkbox">
                  {task.completed ? '✓' : '○'}
                </div>
                <div className="task-text">{task.task}</div>
              </div>
            ))}
          </div>
        </>
      ) : (
        <div className="no-routine">
          <div className="no-routine-icon">⏰</div>
          <p>No routine scheduled for this time</p>
          <p className="routine-time-info">
            Morning routine: 6:00 AM - 11:00 AM<br />
            Evening routine: 7:00 PM - 11:00 PM
          </p>
        </div>
      )}
    </div>
  );
};

export default RoutinePanel;
