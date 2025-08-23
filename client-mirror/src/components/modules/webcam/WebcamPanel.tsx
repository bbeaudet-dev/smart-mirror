import React, { useState, useEffect } from 'react';
import { useWebcam } from '../../../hooks/useWebcam';
import { AiAnalysisService } from '../../../services/aiAnalysisService';
import { speechService } from '../../../services/speechService';
import VideoFeed from './VideoFeed';
import AiControlButtons from './AiControlButtons';

interface WebcamPanelProps {
  onAiMessage?: (message: string, type: 'ai-response' | 'motivation' | 'outfit-analysis' | 'general') => void;
  onAiLoading?: (loading: boolean) => void;
  onButtonClick?: (buttonType: 'ai-analysis' | 'fashion' | 'weather-fascist' | 'inspire' | 'snoop-style') => void;
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
    console.log("WebcamPanel: Starting webcam...");
    console.log("WebcamPanel: Initial isInitialized state:", isInitialized);
    startWebcam();
    
    // Cleanup on unmount
    return () => {
      console.log("WebcamPanel: Cleaning up...");
      stopWebcam();
    };
  }, []); // Empty dependency array - only run once

  // Debug webcam state changes
  useEffect(() => {
    console.log("WebcamPanel: isInitialized changed to:", isInitialized);
  }, [isInitialized]);



  /**
   * Weather-Aware Outfit Analysis
   * 
   * This function captures a webcam frame and sends it to the AI service
   * along with current weather data. The AI responds as a critical fashion
   * expert who considers the weather when analyzing the outfit.
   */
  const handleWeatherOutfitAnalysis = async () => {
    console.log("handleWeatherOutfitAnalysis called");
    console.log("isInitialized:", isInitialized);
    console.log("onAiMessage callback:", !!onAiMessage);
    console.log("onAiLoading callback:", !!onAiLoading);
    
    // Ensure webcam is ready before proceeding
    if (!isInitialized) {
      console.error("Webcam not initialized");
      return;
    }

    // Set loading states for UI feedback
    setIsAnalyzing(true);
    onAiLoading?.(true);

    try {
      // Step 1: Capture current webcam frame as a blob
      const blob = await captureFrameAsBlob();
      if (!blob) {
        throw new Error("Failed to capture frame");
      }

      // Step 2: Convert blob to File object for API transmission
      const imageFile = new File([blob], 'weather-outfit-analysis.jpg', { type: 'image/jpeg' });
      
      // Step 3: Send to AI service with weather context
      const result = await AiAnalysisService.analyzeOutfitWithWeather(imageFile);
      
      // Step 4: Display the AI response and speak it aloud
      onAiMessage?.(result.analysis, 'outfit-analysis');
      speechService.speak(result.analysis);
      
    } catch (error) {
      console.error("Weather-Aware Outfit Analysis failed:", error);
      const errorMessage = error instanceof Error ? error.message : "Weather-aware outfit analysis failed. Please try again.";
      onAiMessage?.(errorMessage, 'outfit-analysis');
    } finally {
      // Always clean up loading states
      setIsAnalyzing(false);
      onAiLoading?.(false);
    }
  };

  // Manual analysis functions for debugging/testing
  const handleTestAI = async () => {
    console.log("handleTestAI called");
    console.log("isInitialized:", isInitialized);
    
    if (!isInitialized) {
      console.error("Webcam not initialized");
      onAiMessage?.("Webcam not initialized. Please start the webcam first.", 'ai-response');
      return;
    }

    setIsAnalyzing(true);
    onAiLoading?.(true);

    try {
      const blob = await captureFrameAsBlob();
      if (!blob) {
        throw new Error("Failed to capture frame");
      }

      const imageFile = new File([blob], 'test-analysis.jpg', { type: 'image/jpeg' });
      const result = await AiAnalysisService.testImage(imageFile);
      
      onAiMessage?.(result.analysis, 'ai-response');
      
    } catch (error) {
      console.error("Test AI failed:", error);
      const errorMessage = error instanceof Error ? error.message : "Test AI failed. Please try again.";
      onAiMessage?.(errorMessage, 'ai-response');
    } finally {
      setIsAnalyzing(false);
      onAiLoading?.(false);
    }
  };

  const handleOutfitAnalysis = async () => {
    if (!isInitialized) {
      console.error("Webcam not initialized");
      onAiMessage?.("Webcam not initialized. Please start the webcam first.", 'outfit-analysis');
      return;
    }

    setIsAnalyzing(true);
    onAiLoading?.(true);

    try {
      const blob = await captureFrameAsBlob();
      if (!blob) {
        throw new Error("Failed to capture frame");
      }

      const imageFile = new File([blob], 'outfit-analysis.jpg', { type: 'image/jpeg' });
      const result = await AiAnalysisService.analyzeOutfit(imageFile);
      
      onAiMessage?.(result.analysis, 'outfit-analysis');
      
    } catch (error) {
      console.error("Outfit analysis failed:", error);
      const errorMessage = error instanceof Error ? error.message : "Outfit analysis failed. Please try again.";
      onAiMessage?.(errorMessage, 'outfit-analysis');
    } finally {
      setIsAnalyzing(false);
      onAiLoading?.(false);
    }
  };

  const handleMotivation = async () => {
    if (!isInitialized) {
      console.error("Webcam not initialized");
      onAiMessage?.("Webcam not initialized. Please start the webcam first.", 'motivation');
      return;
    }

    setIsAnalyzing(true);
    onAiLoading?.(true);

    try {
      const blob = await captureFrameAsBlob();
      if (!blob) {
        throw new Error("Failed to capture frame");
      }

      const imageFile = new File([blob], 'motivation.jpg', { type: 'image/jpeg' });
      const result = await AiAnalysisService.generateMotivation(imageFile);
      
      onAiMessage?.(result.analysis, 'motivation');
      
    } catch (error) {
      console.error("Motivation generation failed:", error);
      const errorMessage = error instanceof Error ? error.message : "Motivation generation failed. Please try again.";
      onAiMessage?.(errorMessage, 'motivation');
    } finally {
      setIsAnalyzing(false);
      onAiLoading?.(false);
    }
  };

  const handleSnoopStyle = async () => {
    if (!isInitialized) {
      console.error("Webcam not initialized");
      onAiMessage?.("Webcam not initialized. Please start the webcam first.", 'ai-response');
      return;
    }

    setIsAnalyzing(true);
    onAiLoading?.(true);

    try {
      const blob = await captureFrameAsBlob();
      if (!blob) {
        throw new Error("Failed to capture frame");
      }

      const imageFile = new File([blob], 'snoop-style.jpg', { type: 'image/jpeg' });
      const result = await AiAnalysisService.generateSnoopStyle(imageFile);
      
      onAiMessage?.(result.analysis, 'ai-response');
      
    } catch (error) {
      console.error("Snoop Dogg analysis failed:", error);
      const errorMessage = error instanceof Error ? error.message : "Snoop Dogg analysis failed. Please try again.";
      onAiMessage?.(errorMessage, 'ai-response');
    } finally {
      setIsAnalyzing(false);
      onAiLoading?.(false);
    }
  };

  const handleSnoopWeather = async () => {
    if (!isInitialized) {
      console.error("Webcam not initialized");
      onAiMessage?.("Webcam not initialized. Please start the webcam first.", 'ai-response');
      return;
    }

    setIsAnalyzing(true);
    onAiLoading?.(true);

    try {
      const blob = await captureFrameAsBlob();
      if (!blob) {
        throw new Error("Failed to capture frame");
      }

      const imageFile = new File([blob], 'snoop-weather.jpg', { type: 'image/jpeg' });
      const result = await AiAnalysisService.generateSnoopWeather(imageFile);
      
      onAiMessage?.(result.analysis, 'ai-response');
      
    } catch (error) {
      console.error("Snoop Dogg Weather analysis failed:", error);
      const errorMessage = error instanceof Error ? error.message : "Snoop Dogg Weather analysis failed. Please try again.";
      onAiMessage?.(errorMessage, 'ai-response');
    } finally {
      setIsAnalyzing(false);
      onAiLoading?.(false);
    }
  };

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
        onTestAI={handleTestAI}
        onOutfitAnalysis={handleOutfitAnalysis}
        onWeatherOutfitAnalysis={handleWeatherOutfitAnalysis}
        onMotivation={handleMotivation}
        onSnoopStyle={handleSnoopStyle}
        onSnoopWeather={handleSnoopWeather}
        onStartWebcam={startWebcam}
        onStopWebcam={stopWebcam}
      />
    </div>
  );
};

export default WebcamPanel;
