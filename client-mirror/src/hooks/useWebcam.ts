import { useState, useRef, useEffect } from "react";

export const useWebcam = () => {
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [isCapturing, setIsCapturing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isInitialized, setIsInitialized] = useState(false);
  const [availableCameras, setAvailableCameras] = useState<MediaDeviceInfo[]>([]);
  const [selectedCameraId, setSelectedCameraId] = useState<string | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Get list of available cameras
  const getAvailableCameras = async () => {
    try {
      const devices = await navigator.mediaDevices.enumerateDevices();
      const cameras = devices.filter(device => device.kind === 'videoinput');
      setAvailableCameras(cameras);
      console.log('Available cameras:', cameras.map(cam => ({ id: cam.deviceId, label: cam.label })));
      
      // Auto-select the first camera if none selected
      if (cameras.length > 0 && !selectedCameraId) {
        setSelectedCameraId(cameras[0].deviceId);
      }
    } catch (error) {
      console.error('Failed to enumerate cameras:', error);
    }
  };

  // Get camera permissions and list cameras
  useEffect(() => {
    const initializeCameras = async () => {
      try {
        // Request camera permission first
        await navigator.mediaDevices.getUserMedia({ video: true });
        await getAvailableCameras();
      } catch (error) {
        console.error('Failed to get camera permission:', error);
      }
    };
    
    initializeCameras();
  }, []);

  const startWebcam = async (cameraId?: string) => {
    try {
      setError(null);
      setIsCapturing(true);
      
      const targetCameraId = cameraId || selectedCameraId;
      console.log("Starting USB webcam with camera ID:", targetCameraId);
      
      const constraints: MediaStreamConstraints = {
        video: {
          width: { ideal: 1920, min: 1280 },
          height: { ideal: 1080, min: 720 },
          frameRate: { ideal: 30, min: 15 },
          ...(targetCameraId && { deviceId: { exact: targetCameraId } })
        },
        audio: false, // We'll use something else for output
      };
      
      console.log("Using constraints:", constraints);
      
      const mediaStream = await navigator.mediaDevices.getUserMedia(constraints);
      
      console.log("Webcam started successfully:", mediaStream);
      setStream(mediaStream);
      setIsInitialized(true);
      
      // Auto-start video element if ref is available
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
      }
      
    } catch (error: any) {
      console.error("Webcam access failed:", error);
      setError(`Webcam error: ${error.message || 'Unknown error'}`);
      setIsCapturing(false);
    }
  };

  const switchCamera = async (cameraId: string) => {
    console.log("Switching to camera:", cameraId);
    setSelectedCameraId(cameraId);
    
    // Stop current stream
    if (stream) {
      stream.getTracks().forEach(track => {
        track.stop();
        console.log("Stopped track:", track.kind);
      });
      setStream(null);
    }
    
    // Start new stream with selected camera
    await startWebcam(cameraId);
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
    availableCameras,
    selectedCameraId,
    
    // Methods
    startWebcam,
    stopWebcam,
    switchCamera,
    captureFrame,
    captureFrameAsBlob,
    
    // Utility
    clearError: () => setError(null)
  };
};
