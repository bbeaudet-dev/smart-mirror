import { useState, useRef, useEffect, useCallback } from 'react';

interface MotionDetectionOptions {
  threshold?: number; // Percentage of pixels that must change to trigger motion
  interval?: number; // How often to check for motion (ms)
  minMotionDuration?: number; // Minimum duration of motion to trigger (ms)
}

export const useMotionDetection = (
  videoRef: React.RefObject<HTMLVideoElement>,
  options: MotionDetectionOptions = {}
) => {
  const {
    threshold = 0.05, // 5% of pixels must change
    interval = 100, // Check every 100ms
    minMotionDuration = 200 // Motion must last at least 200ms
  } = options;

  const [isMotionDetected, setIsMotionDetected] = useState(false);
  const [motionLevel, setMotionLevel] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const previousFrameRef = useRef<ImageData | null>(null);
  const motionStartTimeRef = useRef<number | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const ctxRef = useRef<CanvasRenderingContext2D | null>(null);

  // Initialize canvas for frame processing
  const initializeCanvas = useCallback(() => {
    if (!videoRef.current) return false;

    const video = videoRef.current;
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d', { willReadFrequently: true });

    if (!ctx) {
      setError('Could not get canvas context for motion detection');
      return false;
    }

    // Use lower resolution for motion detection (320x240)
    canvas.width = 320;
    canvas.height = 240;

    canvasRef.current = canvas;
    ctxRef.current = ctx;
    return true;
  }, [videoRef]);

  // Calculate difference between two frames
  const calculateFrameDifference = useCallback((frame1: ImageData, frame2: ImageData): number => {
    const data1 = frame1.data;
    const data2 = frame2.data;
    let differentPixels = 0;
    const totalPixels = data1.length / 4; // RGBA = 4 bytes per pixel

    // Compare every 4th pixel (every pixel, skipping alpha channel)
    for (let i = 0; i < data1.length; i += 4) {
      const r1 = data1[i];
      const g1 = data1[i + 1];
      const b1 = data1[i + 2];

      const r2 = data2[i];
      const g2 = data2[i + 1];
      const b2 = data2[i + 2];

      // Calculate color difference (simple Euclidean distance)
      const diff = Math.sqrt(
        Math.pow(r1 - r2, 2) + 
        Math.pow(g1 - g2, 2) + 
        Math.pow(b1 - b2, 2)
      );

      // Consider pixel different if color difference > 50
      if (diff > 50) {
        differentPixels++;
      }
    }

    return differentPixels / totalPixels;
  }, []);

  // Capture current frame as ImageData
  const captureFrame = useCallback((): ImageData | null => {
    if (!videoRef.current || !canvasRef.current || !ctxRef.current) {
      return null;
    }

    const video = videoRef.current;
    const canvas = canvasRef.current;
    const ctx = ctxRef.current;

    try {
      // Draw video frame to canvas (scaled down for performance)
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
      
      // Get image data for processing
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      return imageData;
    } catch (error) {
      console.error('Failed to capture frame for motion detection:', error);
      return null;
    }
  }, [videoRef]);

  // Check for motion between current and previous frame
  const checkMotion = useCallback(() => {
    const currentFrame = captureFrame();
    if (!currentFrame) return;

    if (previousFrameRef.current) {
      const motionLevel = calculateFrameDifference(previousFrameRef.current, currentFrame);
      setMotionLevel(motionLevel);

      const now = Date.now();
      const isMotion = motionLevel > threshold;

      if (isMotion) {
        // Motion detected
        if (motionStartTimeRef.current === null) {
          // Start of motion
          motionStartTimeRef.current = now;
        } else if (now - motionStartTimeRef.current >= minMotionDuration) {
          // Motion has lasted long enough to trigger
          if (!isMotionDetected) {
            setIsMotionDetected(true);
            console.log(`Motion detected! Level: ${(motionLevel * 100).toFixed(2)}%`);
          }
        }
      } else {
        // No motion
        motionStartTimeRef.current = null;
        if (isMotionDetected) {
          setIsMotionDetected(false);
          console.log('Motion ended');
        }
      }
    }

    // Store current frame for next comparison
    previousFrameRef.current = currentFrame;
  }, [captureFrame, calculateFrameDifference, threshold, minMotionDuration, isMotionDetected]);

  // Start motion detection
  const startMotionDetection = useCallback(() => {
    if (isActive) return;

    if (!initializeCanvas()) {
      return;
    }

    setIsActive(true);
    setError(null);

    // Start checking for motion at regular intervals
    intervalRef.current = setInterval(checkMotion, interval);

    console.log('Motion detection started');
  }, [isActive, initializeCanvas, checkMotion, interval]);

  // Stop motion detection
  const stopMotionDetection = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }

    setIsActive(false);
    setIsMotionDetected(false);
    setMotionLevel(0);
    motionStartTimeRef.current = null;
    previousFrameRef.current = null;

    console.log('Motion detection stopped');
  }, []);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      stopMotionDetection();
    };
  }, [stopMotionDetection]);

  // Reset motion detection state
  const resetMotionDetection = useCallback(() => {
    setIsMotionDetected(false);
    motionStartTimeRef.current = null;
    console.log('Motion detection state reset');
  }, []);

  return {
    // State
    isMotionDetected,
    motionLevel,
    isActive,
    error,
    
    // Methods
    startMotionDetection,
    stopMotionDetection,
    resetMotionDetection,
    
    // Utility
    clearError: () => setError(null)
  };
};
