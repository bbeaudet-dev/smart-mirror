import React, { useState, useEffect } from 'react';
import { useWebcam } from '../../../hooks/useWebcam';
import ApiClient from '../../../services/apiClient';
import { speechService } from '../../../services/speechService';
import VideoFeed from './VideoFeed';
import AiControlButtons from './AiControlButtons';

interface WebcamPanelProps {
  onAiMessage?: (message: string, type: 'ai-response' | 'outfit-analysis' | 'general') => void;
  onAiLoading?: (loading: boolean) => void;
}

const WebcamPanel: React.FC<WebcamPanelProps> = ({ onAiMessage, onAiLoading }) => {
  const {
    stream,
    isCapturing,
    isInitialized,
    error,
    videoRef,
    startWebcam,
    stopWebcam,
    captureFrame,
    captureFrameAsBlob
  } = useWebcam();

  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [autoAnalysisInterval, setAutoAnalysisInterval] = useState<NodeJS.Timeout | null>(null);
  const [showDebugControls, setShowDebugControls] = useState(false);

  // Auto-start webcam when component mounts
  useEffect(() => {
    startWebcam();
    
    // Cleanup on unmount
    return () => {
      stopWebcam();
    };
  }, []); // Empty dependency array - only run once

  /**
   * Shared AI Analysis Handler
   * 
   * This function handles both basic outfit analysis and weather-aware outfit analysis.
   * It captures a webcam frame and sends it to the appropriate AI service based on the type.
   */
  const handleAiAnalysis = async (analysisType: 'basic' | 'weather') => {
    if (!isInitialized) {
      console.error("Webcam not initialized");
      onAiMessage?.("Webcam not initialized. Please start the webcam first.", 'ai-response');
      return;
    }

    setIsAnalyzing(true);
    onAiLoading?.(true);

    try {
      // Step 1: Capture current webcam frame as a blob
      const blob = await captureFrameAsBlob();
      if (!blob) {
        throw new Error("Failed to capture frame");
      }

      // Step 2: Convert blob to File object for API transmission
      const filename = analysisType === 'weather' ? 'weather-outfit-analysis.jpg' : 'outfit-analysis.jpg';
      const imageFile = new File([blob], filename, { type: 'image/jpeg' });
      
      // Step 3: Send to AI service (basic or weather-aware)
      const result = analysisType === 'weather' 
        ? await ApiClient.analyzeOutfitWithWeather(imageFile) as any
        : await ApiClient.analyzeOutfit(imageFile) as any;
      
      // Step 4: Display the AI response and speak it aloud
      onAiMessage?.(result.analysis, 'ai-response');
      speechService.speak(result.analysis);
      
    } catch (error) {
      const errorType = analysisType === 'weather' ? 'Weather outfit analysis' : 'Outfit analysis';
      console.error(`${errorType} failed:`, error);
      const errorMessage = error instanceof Error ? error.message : `${errorType} failed. Please try again.`;
      onAiMessage?.(errorMessage, 'ai-response');
    } finally {
      setIsAnalyzing(false);
      onAiLoading?.(false);
    }
  };

  // Wrapper functions for the buttons
  const handleOutfitAnalysis = () => handleAiAnalysis('basic');
  const handleWeatherOutfitAnalysis = () => handleAiAnalysis('weather');

  return (
    <div className="flex flex-col h-full">
      {/* Video Feed Component */}
      <VideoFeed
        stream={stream}
        isInitialized={isInitialized}
        isCapturing={isCapturing}
        error={error}
        videoRef={videoRef}
      />

      {/* AI Control Buttons Component */}
      <AiControlButtons
        isInitialized={isInitialized}
        isAnalyzing={isAnalyzing}
        onOutfitAnalysis={handleOutfitAnalysis}
        onWeatherOutfitAnalysis={handleWeatherOutfitAnalysis}
        onStartWebcam={startWebcam}
        onStopWebcam={stopWebcam}
      />
    </div>
  );
};

export default WebcamPanel;
