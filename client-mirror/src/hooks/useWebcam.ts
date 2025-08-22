import { useState, useRef, useEffect } from "react";

export const useWebcam = () => {
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [isCapturing, setIsCapturing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isInitialized, setIsInitialized] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const startWebcam = async () => {
    try {
      setError(null);
      setIsCapturing(true);
      
      console.log("Starting USB webcam...");
      console.log("Available media devices:", await navigator.mediaDevices.enumerateDevices());
      
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: {
          width: { ideal: 1920, min: 1280 },
          height: { ideal: 1080, min: 720 },
          frameRate: { ideal: 30, min: 15 }
        },
        audio: false, // We'll use something else for output
      });
      
      console.log("Webcam started successfully:", mediaStream);
      console.log("Video tracks:", mediaStream.getVideoTracks());
      setStream(mediaStream);
      setIsInitialized(true);
      
      // Auto-start video element if ref is available
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
        console.log("Video element srcObject set");
      } else {
        console.log("Video ref not available yet");
      }
      
    } catch (error: any) {
      console.error("Webcam access failed:", error);
      setError(`Webcam error: ${error.message || 'Unknown error'}`);
      setIsCapturing(false);
    }
  };

  const stopWebcam = () => {
    if (stream) {
      stream.getTracks().forEach(track => {
        track.stop();
        console.log("Stopped track:", track.kind);
      });
      setStream(null);
    }
    
    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }
    
    setIsCapturing(false);
    setIsInitialized(false);
    setError(null);
  };

  const captureFrame = (): string | null => {
    if (videoRef.current && stream && isInitialized) {
      try {
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");
        
        if (!ctx) {
          console.error("Could not get canvas context");
          return null;
        }
        
        // Set canvas size to match video dimensions
        canvas.width = videoRef.current.videoWidth;
        canvas.height = videoRef.current.videoHeight;
        
        // Draw the current video frame to canvas
        ctx.drawImage(videoRef.current, 0, 0);
        
        // Convert to base64 JPEG
        const frameData = canvas.toDataURL("image/jpeg", 0.8);
        console.log("Frame captured:", frameData.substring(0, 50) + "...");
        
        return frameData;
      } catch (error) {
        console.error("Frame capture failed:", error);
        return null;
      }
    }
    return null;
  };

  const captureFrameAsBlob = (): Promise<Blob | null> => {
    return new Promise((resolve) => {
      if (videoRef.current && stream && isInitialized) {
        try {
          const canvas = document.createElement("canvas");
          const ctx = canvas.getContext("2d");
          
          if (!ctx) {
            console.error("Could not get canvas context");
            resolve(null);
            return;
          }
          
          canvas.width = videoRef.current.videoWidth;
          canvas.height = videoRef.current.videoHeight;
          ctx.drawImage(videoRef.current, 0, 0);
          
          canvas.toBlob((blob) => {
            if (blob) {
              console.log("Frame captured as blob:", blob.size, "bytes");
              resolve(blob);
            } else {
              console.error("Failed to create blob from canvas");
              resolve(null);
            }
          }, "image/jpeg", 0.8);
        } catch (error) {
          console.error("Frame capture failed:", error);
          resolve(null);
        }
      } else {
        resolve(null);
      }
    });
  };

  // Auto-initialize video element when stream changes
  useEffect(() => {
    if (videoRef.current && stream) {
      videoRef.current.srcObject = stream;
    }
  }, [stream]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (stream) {
        stopWebcam();
      }
    };
  }, [stream]);

  return {
    // State
    stream,
    isCapturing,
    isInitialized,
    error,
    videoRef,
    
    // Methods
    startWebcam,
    stopWebcam,
    captureFrame,
    captureFrameAsBlob,
    
    // Utility
    clearError: () => setError(null)
  };
};
