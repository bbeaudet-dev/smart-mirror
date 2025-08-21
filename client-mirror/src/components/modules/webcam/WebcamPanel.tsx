import React, { useState } from 'react';
import { useWebcam } from '../../../hooks/useWebcam';
import ApiClient from '../../../services/apiClient';

interface WebcamPanelProps {
  onAnalysisComplete?: (result: string) => void;
}

const WebcamPanel: React.FC<WebcamPanelProps> = ({ onAnalysisComplete }) => {
  const { 
    isActive, 
    error, 
    startWebcam, 
    stopWebcam, 
    captureFrame, 
    videoRef 
  } = useWebcam();
  
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<string | null>(null);

  const handleAnalyzeOutfit = async () => {
    if (!isActive) {
      await startWebcam();
      return;
    }

    setIsAnalyzing(true);
    try {
      const imageData = captureFrame();
      if (!imageData) {
        throw new Error('Failed to capture image');
      }

      // Convert data URL to file
      const response = await fetch(imageData);
      const blob = await response.blob();
      const file = new File([blob], 'outfit.jpg', { type: 'image/jpeg' });

      // Send to AI for analysis
      const result = await ApiClient.analyzeImage(
        file,
        'Analyze this outfit and provide fashion advice. Consider the style, colors, and overall look.',
        'outfit-analysis'
      );

      setAnalysisResult(result.analysis);
      onAnalysisComplete?.(result.analysis);
    } catch (error) {
      console.error('Outfit analysis failed:', error);
      setAnalysisResult('Failed to analyze outfit. Please try again.');
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="flex flex-col h-full">
      <h3 className="mirror-header">
        Outfit Analysis
      </h3>
      
      <div className="flex-1 flex flex-col items-center justify-center space-y-4">
        {/* Webcam Video */}
        {isActive && (
          <div className="relative">
            <video
              ref={videoRef}
              autoPlay
              playsInline
              muted
              className="w-64 h-48 object-cover rounded-lg border-2 border-mirror-accent"
            />
            <div className="absolute inset-0 bg-black bg-opacity-20 rounded-lg pointer-events-none" />
          </div>
        )}

        {/* Error Display */}
        {error && (
          <div className="text-red-400 text-center text-sm">
            {error}
          </div>
        )}

        {/* Analysis Result */}
        {analysisResult && (
          <div className="text-center p-4 bg-mirror-bg-secondary rounded-lg max-w-xs">
            <p className="text-mirror-sm text-mirror-text">
              {analysisResult}
            </p>
          </div>
        )}

        {/* Control Buttons */}
        <div className="flex space-x-2">
          {!isActive ? (
            <button
              onClick={startWebcam}
              className="px-4 py-2 bg-mirror-accent text-mirror-bg rounded-lg hover:bg-mirror-accent-hover transition-colors"
            >
              Start Camera
            </button>
          ) : (
            <>
              <button
                onClick={handleAnalyzeOutfit}
                disabled={isAnalyzing}
                className="px-4 py-2 bg-mirror-accent text-mirror-bg rounded-lg hover:bg-mirror-accent-hover transition-colors disabled:opacity-50"
              >
                {isAnalyzing ? 'Analyzing...' : 'Analyze Outfit'}
              </button>
              <button
                onClick={stopWebcam}
                className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
              >
                Stop Camera
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default WebcamPanel;
