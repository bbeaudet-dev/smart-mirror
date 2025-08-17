import React from 'react';
import { NewsItem } from '../data/types';
import './NewsPanel.css';

interface NewsPanelProps {
  news: NewsItem[];
}

const NewsPanel: React.FC<NewsPanelProps> = ({ news }) => {
  const getCategoryColor = (category: string) => {
    switch (category.toLowerCase()) {
      case 'technology':
        return '#74b9ff';
      case 'business':
        return '#00b894';
      case 'science':
        return '#fd79a8';
      case 'environment':
        return '#fdcb6e';
      default:
        return '#a29bfe';
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category.toLowerCase()) {
      case 'technology':
        return '💻';
      case 'business':
        return '📊';
      case 'science':
        return '🔬';
      case 'environment':
        return '🌱';
      default:
        return '📰';
    }
  };

  return (
    <div className="news-panel">
      <h3 className="panel-title">Latest News</h3>
      
      <div className="news-list">
        {news.map((item, index) => (
          <div key={item.id} className="news-item">
            <div className="news-header">
              <div className="news-category">
                <span className="category-icon">{getCategoryIcon(item.category)}</span>
                <span 
                  className="category-label"
                  style={{ color: getCategoryColor(item.category) }}
                >
                  {item.category}
                </span>
              </div>
              <div className="news-number">#{index + 1}</div>
            </div>
            
            <div className="news-title">{item.title}</div>
            <div className="news-summary">{item.summary}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NewsPanel;
