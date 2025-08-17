import React from 'react';
import { HoroscopeData } from '../data/types';
import './HoroscopePanel.css';

interface HoroscopePanelProps {
  horoscope: HoroscopeData;
}

const HoroscopePanel: React.FC<HoroscopePanelProps> = ({ horoscope }) => {
  const getZodiacIcon = (sign: string) => {
    const zodiacIcons: { [key: string]: string } = {
      'aries': '♈',
      'taurus': '♉',
      'gemini': '♊',
      'cancer': '♋',
      'leo': '♌',
      'virgo': '♍',
      'libra': '♎',
      'scorpio': '♏',
      'sagittarius': '♐',
      'capricorn': '♑',
      'aquarius': '♒',
      'pisces': '♓'
    };
    return zodiacIcons[sign.toLowerCase()] || '✨';
  };

  const getMoodEmoji = (mood: string) => {
    if (mood.toLowerCase().includes('happy') || mood.toLowerCase().includes('joyful')) {
      return '😊';
    } else if (mood.toLowerCase().includes('balanced') || mood.toLowerCase().includes('harmonious')) {
      return '😌';
    } else if (mood.toLowerCase().includes('energetic') || mood.toLowerCase().includes('powerful')) {
      return '💪';
    } else if (mood.toLowerCase().includes('creative') || mood.toLowerCase().includes('inspired')) {
      return '🎨';
    } else {
      return '✨';
    }
  };

  return (
    <div className="horoscope-panel">
      <div className="horoscope-header">
        <div className="zodiac-icon">{getZodiacIcon(horoscope.sign)}</div>
        <h3 className="panel-title">Daily Horoscope</h3>
      </div>

      <div className="horoscope-content">
        <div className="sign-display">
          <span className="sign-name">{horoscope.sign}</span>
          <span className="sign-date">Today's Reading</span>
        </div>

        <div className="horoscope-reading">
          <p className="reading-text">{horoscope.daily}</p>
        </div>

        <div className="horoscope-details">
          <div className="detail-item">
            <div className="detail-icon">🎯</div>
            <div className="detail-content">
              <div className="detail-label">Lucky Number</div>
              <div className="detail-value">{horoscope.luckyNumber}</div>
            </div>
          </div>

          <div className="detail-item">
            <div className="detail-icon">{getMoodEmoji(horoscope.mood)}</div>
            <div className="detail-content">
              <div className="detail-label">Mood</div>
              <div className="detail-value">{horoscope.mood}</div>
            </div>
          </div>
        </div>
      </div>

      <div className="horoscope-footer">
        <div className="footer-text">
          <span className="footer-icon">🔮</span>
          <span>Your cosmic guidance for today</span>
        </div>
      </div>
    </div>
  );
};

export default HoroscopePanel;
