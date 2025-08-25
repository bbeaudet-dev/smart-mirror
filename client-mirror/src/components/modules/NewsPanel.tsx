import React, { useState, useEffect } from 'react';
import NewsClient from '../../services/newsClient';

interface NewsHeadline {
  id: string;
  title: string;
  description: string;
  source: string;
  url: string;
  publishedAt: string;
}

interface NewsData {
  headlines: NewsHeadline[];
  count: number;
  timestamp: string;
}

const NewsPanel: React.FC = () => {
  const [newsData, setNewsData] = useState<NewsData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const data = await NewsClient.getHeadlines(5) as NewsData;
        setNewsData(data);
      } catch (err) {
        console.error('News fetch error:', err);
        setError('News service unavailable');
      } finally {
        setIsLoading(false);
      }
    };

    fetchNews();
    
    // Refresh news every 15 minutes
    const interval = setInterval(fetchNews, 15 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  // Show loading state briefly
  if (isLoading) {
    return (
      <div className="flex flex-col h-full">
        <h3 className="text-lg font-mirror-primary font-normal text-mirror-text uppercase border-b border-mirror-text-dimmed leading-4 pb-1 mb-2">News</h3>
        <div className="flex-1 flex flex-col items-center justify-center text-center">
          <div className="text-mirror-xs text-mirror-text font-mirror-primary">
            <p>Loading headlines...</p>
          </div>
        </div>
      </div>
    );
  }

  // Show error state
  if (error || !newsData) {
    return (
      <div className="flex flex-col h-full">
        <h3 className="text-lg font-mirror-primary font-normal text-mirror-text uppercase border-b border-mirror-text-dimmed leading-4 pb-1 mb-2">News</h3>
        <div className="flex-1 flex flex-col items-center justify-center text-center">
          <div className="text-mirror-xs text-mirror-text font-mirror-primary">
            <p>News unavailable</p>
            <p className="text-mirror-text-dimmed">Check NewsAPI configuration</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full">
      <h3 className="text-lg font-mirror-primary font-normal text-mirror-text uppercase border-b border-mirror-text-dimmed leading-4 pb-1 mb-2">News</h3>
      
      <div className="flex-1 overflow-hidden">
        {newsData.headlines.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-center">
            <div className="text-mirror-lg text-mirror-text-dimmed mb-2">HEADLINES</div>
            <div className="text-mirror-xs text-mirror-text font-mirror-primary">
              <p>No headlines available</p>
            </div>
          </div>
        ) : (
          <div className="space-y-2 overflow-y-auto h-full">
            {newsData.headlines.slice(0, 5).map((headline) => (
              <div key={headline.id} className="border-l-2 border-mirror-text-dimmed pl-2">
                <div className="text-mirror-xs font-mirror-primary text-mirror-text leading-tight">
                  {headline.title}
                </div>
                <div className="text-[0.75rem] text-mirror-text-dimmed mt-1">
                  {headline.source} • {NewsClient.formatTimestamp(headline.publishedAt)}
                </div>
              </div>
            ))}
            {newsData.headlines.length > 5 && (
              <div className="text-mirror-xs text-mirror-text-dimmed text-center pt-2">
                +{newsData.headlines.length - 5} more headlines
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default NewsPanel;
