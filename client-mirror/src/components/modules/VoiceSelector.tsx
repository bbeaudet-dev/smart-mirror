import React, { useState, useEffect } from 'react';

interface VoiceSelectorProps {
  onVoiceChange: (voice: string) => void;
  currentVoice?: string;
}

const VoiceSelector: React.FC<VoiceSelectorProps> = ({ onVoiceChange, currentVoice = 'default' }) => {
  const [voices, setVoices] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchVoices();
  }, []);

  const fetchVoices = async () => {
    try {
      const response = await fetch('http://localhost:5005/api/tts/voices');
      const data = await response.json();
      setVoices(data.voices || []);
    } catch (error) {
      console.error('Error fetching voices:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const voiceDescriptions = {
    alloy: 'Professional & Clear',
    echo: 'Authoritative & Strong',
    fable: 'Warm & Friendly',
    onyx: 'Deep & Smooth (Snoop)',
    nova: 'Natural & Balanced',
    shimmer: 'Bright & Energetic (Elle)'
  };

  if (isLoading) {
    return <div className="text-mirror-xs text-mirror-text-dimmed">Loading voices...</div>;
  }

  return (
    <div className="flex flex-wrap gap-2">
      {voices.map((voice) => (
        <button
          key={voice}
          onClick={() => onVoiceChange(voice)}
          className={`
            px-3 py-1 rounded-full text-xs font-medium transition-colors
            ${currentVoice === voice 
              ? 'bg-mirror-text text-mirror-bg' 
              : 'bg-mirror-text-dimmed/20 text-mirror-text hover:bg-mirror-text-dimmed/30'
            }
          `}
          title={voiceDescriptions[voice as keyof typeof voiceDescriptions] || voice}
        >
          {voice}
        </button>
      ))}
    </div>
  );
};

export default VoiceSelector;
