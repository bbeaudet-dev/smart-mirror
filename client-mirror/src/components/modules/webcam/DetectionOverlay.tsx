import React from 'react';

export interface DetectionResult {
  label: string;
  confidence: number;
  bbox: {
    x: number;
    y: number;
    width: number;
    height: number;
  };
}

interface DetectionOverlayProps {
  detections: DetectionResult[];
  videoRef: React.RefObject<HTMLVideoElement | null>;
  showOverlay: boolean;
}

/**
 * DetectionOverlay - Displays bounding boxes and labels for detected clothing items
 * 
 * This component renders colored rectangles and labels over the video feed
 * to show what clothing items have been detected by Roboflow.
 */
export const DetectionOverlay: React.FC<DetectionOverlayProps> = ({
  detections,
  videoRef,
  showOverlay
}) => {
  if (!showOverlay || !detections || detections.length === 0) {
    return null;
  }

  // Simple color for all detections
  const detectionColor = '#3B82F6'; // Blue

  // Convert detection coordinates to CSS positioning
  const getDetectionStyle = (detection: DetectionResult) => {
    const { bbox } = detection;
    
    return {
      position: 'absolute' as const,
      left: `${bbox.x}px`,
      top: `${bbox.y}px`,
      width: `${bbox.width}px`,
      height: `${bbox.height}px`,
      border: `2px solid ${detectionColor}`,
      borderRadius: '4px',
      pointerEvents: 'none' as const,
      zIndex: 10,
    };
  };

  // Get label style for positioning above bounding box
  const getLabelStyle = (detection: DetectionResult) => {
    const { bbox } = detection;
    
    return {
      position: 'absolute' as const,
      left: `${bbox.x}px`,
      top: `${bbox.y - 25}px`,
      backgroundColor: detectionColor,
      color: 'white',
      padding: '2px 6px',
      borderRadius: '4px',
      fontSize: '12px',
      fontWeight: 'bold' as const,
      pointerEvents: 'none' as const,
      zIndex: 11,
      whiteSpace: 'nowrap' as const,
    };
  };

  return (
    <div className="absolute inset-0 pointer-events-none">
      {detections.map((detection, index) => (
        <React.Fragment key={index}>
          {/* Bounding box */}
          <div style={getDetectionStyle(detection)} />
          
          {/* Label */}
          <div style={getLabelStyle(detection)}>
            {detection.label} ({(detection.confidence * 100).toFixed(0)}%)
          </div>
        </React.Fragment>
      ))}
    </div>
  );
};

export default DetectionOverlay;
