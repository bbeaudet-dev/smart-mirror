import React, { useState, useEffect } from 'react';

interface MessagePanelProps {
  message?: string | null;
  isLoading?: boolean;
  type?: 'ai-response' | 'motivation' | 'outfit-analysis' | 'general';
}

const MessagePanel: React.FC<MessagePanelProps> = ({ 
  message, 
  isLoading = false, 
  type = 'general' 
}) => {
  const [displayMessage, setDisplayMessage] = useState<string | null>(message || null);
  const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
    console.log("MessagePanel: Received message:", message);
    console.log("MessagePanel: isLoading:", isLoading);
    
    if (message) {
      setDisplayMessage(message);
      setIsVisible(true);
      console.log("MessagePanel: Setting message visible:", message);

      // Auto-hide message after 10 seconds
      const timer = setTimeout(() => {
        setIsVisible(false);
        console.log("MessagePanel: Auto-hiding message");
      }, 10000);

      return () => clearTimeout(timer);
    } else {
      setIsVisible(false);
    }
  }, [message]);

  if (!isVisible && !isLoading) {
    return null;
  }

  const getMessageIcon = () => {
    switch (type) {
      case 'ai-response':
        return 'AI';
      case 'motivation':
        return 'MOTIVATION';
      case 'outfit-analysis':
        return 'OUTFIT';
      default:
        return 'MESSAGE';
    }
  };

  return (
    <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-50 max-w-2xl w-full px-4">
      <div className={`
        bg-black/80 backdrop-blur-sm border border-mirror-text-dimmed/30 rounded-lg p-4
        transition-all duration-500 ease-in-out
        ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}
      `}>
        {isLoading ? (
          <div className="flex items-center justify-center space-x-2">
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-mirror-text"></div>
            <span className="text-mirror-sm text-mirror-text font-mirror-primary">
              AI is thinking...
            </span>
          </div>
        ) : (
          <div className="flex items-start space-x-3">
            <div className="text-mirror-lg flex-shrink-0">
              {getMessageIcon()}
            </div>
            <div className="flex-1">
              <p className="text-mirror-sm text-mirror-text font-mirror-primary leading-relaxed">
                {displayMessage}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MessagePanel;
