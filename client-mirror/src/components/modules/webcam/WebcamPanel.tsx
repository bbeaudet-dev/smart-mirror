import React, { useState, useEffect } from 'react';
import { useWebcam } from '../../../hooks/useWebcam';
import { AiAnalysisService } from '../../../services/aiAnalysisService';

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



  const handleWeatherOutfitAnalysis = async () => {
    console.log("handleWeatherOutfitAnalysis called");
    console.log("isInitialized:", isInitialized);
    console.log("onAiMessage callback:", !!onAiMessage);
    console.log("onAiLoading callback:", !!onAiLoading);
    
    if (!isInitialized) {
      console.error("Webcam not initialized");
      return;
    }

    setIsAnalyzing(true);
    onAiLoading?.(true);

    try {
      // Capture a frame as blob
      const blob = await captureFrameAsBlob();
      if (!blob) {
        throw new Error("Failed to capture frame");
      }

      // Convert blob to File object
      const imageFile = new File([blob], 'weather-outfit-analysis.jpg', { type: 'image/jpeg' });
      
      // Use the AI analysis service
      const result = await AiAnalysisService.analyzeOutfitWithWeather(imageFile);
      const analysisText = AiAnalysisService.formatAnalysisWithWeather(result);
      
      onAiMessage?.(analysisText, 'outfit-analysis');
      
    } catch (error) {
      console.error("Weather-Aware Outfit Analysis failed:", error);
      const errorMessage = error instanceof Error ? error.message : "Weather-aware outfit analysis failed. Please try again.";
      onAiMessage?.(errorMessage, 'outfit-analysis');
    } finally {
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

  return (
    <div className="flex flex-col h-full">
      {/* Video Feed */}
      <div className="flex-1 relative bg-black/20 rounded-lg overflow-hidden mb-4">
        {stream && isInitialized ? (
          <div className="w-full h-full flex items-center justify-end pr-4">
            <video
              ref={videoRef}
              autoPlay
              playsInline
              muted
              className="h-96 w-auto"
            />
          </div>
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <p className="text-mirror-xs text-mirror-text">
                {isCapturing ? "Starting webcam..." : "Webcam not available"}
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Error Display */}
      {error && (
        <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-2 mt-2">
          <p className="text-red-300 text-xs">{error}</p>
        </div>
      )}



      {/* AI Control Buttons - Bottom of Screen */}
      <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 z-40">
        <div className="flex space-x-2">
          <button
            onClick={isInitialized ? stopWebcam : startWebcam}
            className={`px-3 py-2 rounded text-xs font-medium transition-colors ${
              isInitialized
                ? 'bg-red-600 hover:bg-red-700 text-white'
                : 'bg-green-600 hover:bg-green-700 text-white'
            }`}
          >
            {isInitialized ? 'Stop Webcam' : 'Start Webcam'}
          </button>
          <button
            onClick={handleTestAI}
            disabled={isAnalyzing}
            className={`px-3 py-2 rounded text-xs font-medium transition-colors ${
              isAnalyzing
                ? 'bg-gray-500 cursor-not-allowed'
                : 'bg-green-600 hover:bg-green-700 text-white'
            }`}
          >
            {isAnalyzing ? 'Processing...' : 'AI Analysis'}
          </button>
          <button
            onClick={handleOutfitAnalysis}
            disabled={isAnalyzing}
            className={`px-3 py-2 rounded text-xs font-medium transition-colors ${
              isAnalyzing
                ? 'bg-gray-500 cursor-not-allowed'
                : 'bg-purple-600 hover:bg-purple-700 text-white'
            }`}
          >
            {isAnalyzing ? 'Processing...' : 'Fashion'}
          </button>
          <button
            onClick={handleWeatherOutfitAnalysis}
            disabled={isAnalyzing}
            className={`px-3 py-2 rounded text-xs font-medium transition-colors ${
              isAnalyzing
                ? 'bg-gray-500 cursor-not-allowed'
                : 'bg-orange-600 hover:bg-orange-700 text-white'
            }`}
          >
            {isAnalyzing ? 'Processing...' : 'Weather Fascist'}
          </button>
          <button
            onClick={handleMotivation}
            disabled={isAnalyzing}
            className={`px-3 py-2 rounded text-xs font-medium transition-colors ${
              isAnalyzing
                ? 'bg-gray-500 cursor-not-allowed'
                : 'bg-blue-600 hover:bg-blue-700 text-white'
            }`}
          >
            {isAnalyzing ? 'Processing...' : 'Inspire'}
          </button>
          <button
            onClick={handleSnoopStyle}
            disabled={isAnalyzing}
            className={`px-3 py-2 rounded text-xs font-medium transition-colors ${
              isAnalyzing
                ? 'bg-gray-500 cursor-not-allowed'
                : 'bg-yellow-600 hover:bg-yellow-700 text-white'
            }`}
          >
            {isAnalyzing ? 'Processing...' : 'Snoop Style'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default WebcamPanel;
