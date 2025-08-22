import React, { useState, useEffect } from 'react';
import { useWebcam } from '../../../hooks/useWebcam';
import { AiAnalysisService } from '../../../services/aiAnalysisService';

interface WebcamPanelProps {
  onAiMessage?: (message: string, type: 'ai-response' | 'motivation' | 'outfit-analysis' | 'general') => void;
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

  // Auto-start webcam and setup automatic analysis when component mounts
  useEffect(() => {
    console.log("WebcamPanel: Starting webcam...");
    startWebcam();
    
    // Start automatic weather outfit analysis every 15 seconds
    const interval = setInterval(() => {
      console.log("Auto analysis interval triggered, isInitialized:", isInitialized, "isAnalyzing:", isAnalyzing);
      if (isInitialized && !isAnalyzing) {
        handleWeatherOutfitAnalysis();
      }
    }, 15000); // 15 seconds
    
    setAutoAnalysisInterval(interval);
    
    // Cleanup on unmount
    return () => {
      console.log("WebcamPanel: Cleaning up...");
      if (interval) {
        clearInterval(interval);
      }
      stopWebcam();
    };
  }, []); // Empty dependency array - only run once



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

  return (
    <div className="flex flex-col h-full">
      <h3 className="mirror-header">
        AI Outfit Analysis
        {isAnalyzing && <span className="text-mirror-xs text-mirror-text-dimmed animate-spin ml-1">⟳</span>}
      </h3>
      
      {/* Video Feed */}
      <div className="h-48 relative bg-black/20 rounded-lg overflow-hidden mb-4">
        {stream && isInitialized ? (
          <video
            ref={videoRef}
            autoPlay
            playsInline
            muted
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <div className="text-mirror-lg text-mirror-text-dimmed mb-2">📷</div>
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

      {/* Debug Toggle */}
      <div className="mt-2">
        <button
          onClick={() => setShowDebugControls(!showDebugControls)}
          className="px-2 py-1 rounded text-xs font-medium bg-gray-600 hover:bg-gray-700 text-white transition-colors"
        >
          {showDebugControls ? 'Hide Debug' : 'Show Debug'}
        </button>
      </div>

      {/* Manual Webcam Controls */}
      <div className="mt-2">
        <button
          onClick={isInitialized ? stopWebcam : startWebcam}
          className={`px-2 py-1 rounded text-xs font-medium transition-colors ${
            isInitialized
              ? 'bg-red-600 hover:bg-red-700 text-white'
              : 'bg-green-600 hover:bg-green-700 text-white'
          }`}
        >
          {isInitialized ? 'Stop Webcam' : 'Start Webcam'}
        </button>
      </div>

      {/* Debug Controls */}
      {showDebugControls && (
        <div className="mt-2 space-y-2">
          <div className="flex space-x-2">
            <button
              onClick={() => onAiMessage?.("This is a test message to verify the message system is working!", 'ai-response')}
              className="px-2 py-1 rounded text-xs font-medium bg-yellow-600 hover:bg-yellow-700 text-white transition-colors"
            >
              Test Message
            </button>
            <button
              onClick={handleTestAI}
              disabled={isAnalyzing}
              className={`px-2 py-1 rounded text-xs font-medium transition-colors ${
                isAnalyzing
                  ? 'bg-gray-500 cursor-not-allowed'
                  : 'bg-green-600 hover:bg-green-700 text-white'
              }`}
            >
              {isAnalyzing ? 'Processing...' : 'Test AI'}
            </button>
            <button
              onClick={handleOutfitAnalysis}
              disabled={isAnalyzing}
              className={`px-2 py-1 rounded text-xs font-medium transition-colors ${
                isAnalyzing
                  ? 'bg-gray-500 cursor-not-allowed'
                  : 'bg-purple-600 hover:bg-purple-700 text-white'
              }`}
            >
              {isAnalyzing ? 'Processing...' : 'Outfit'}
            </button>
            <button
              onClick={handleMotivation}
              disabled={isAnalyzing}
              className={`px-2 py-1 rounded text-xs font-medium transition-colors ${
                isAnalyzing
                  ? 'bg-gray-500 cursor-not-allowed'
                  : 'bg-blue-600 hover:bg-blue-700 text-white'
              }`}
            >
              {isAnalyzing ? 'Processing...' : 'Motivation'}
            </button>
          </div>
        </div>
      )}

      {/* Status Info */}
      <div className="bg-black/10 rounded-lg p-2 text-xs mt-2">
        <p className="text-mirror-text-dimmed mb-1">Status:</p>
        <p className="text-mirror-text">Webcam: {isInitialized ? 'Active' : 'Inactive'}</p>
        <p className="text-mirror-text">Capturing: {isCapturing ? 'Yes' : 'No'}</p>
        <p className="text-mirror-text">Auto Analysis: {isAnalyzing ? 'Processing...' : 'Ready'}</p>
        {error && <p className="text-red-300 text-xs">Error: {error}</p>}
        {stream && (
          <p className="text-mirror-text">
            Resolution: {videoRef.current?.videoWidth || 0} x {videoRef.current?.videoHeight || 0}
          </p>
        )}
      </div>
    </div>
  );
};

export default WebcamPanel;
