import { useState, useRef, useEffect } from 'react';
import { io, Socket } from "socket.io-client";

interface UseCameraStatusProps {
  onStreamStart?: (stream: MediaStream) => void;
  onStreamStop?: () => void;
  onError?: (error: string) => void;
  onConnectionChange?: (isConnected: boolean) => void;
}

const useCameraStatus = ({ 
  onStreamStart, 
  onStreamStop, 
  onError,
  onConnectionChange 
}: UseCameraStatusProps = {}) => {
  const [isStreaming, setIsStreaming] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [isConnecting, setIsConnecting] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  
  const socketRef = useRef<Socket | null>(null);
  const peerConnectionRef = useRef<RTCPeerConnection | null>(null);

  // Initialize Socket.io connection
  useEffect(() => {
    // Get the server URL - use local IP if available, otherwise localhost
    const serverUrl = window.location.hostname === 'localhost' 
      ? "http://localhost:5005"
      : `http://${window.location.hostname}:5005`;

    console.log('Connecting to server:', serverUrl);
    
    const socket = io(serverUrl, {
      timeout: 20000,
      forceNew: true
    });

    socket.on('connect', () => {
      console.log('Connected to server');
      setIsConnected(true);
      setError(null);
      onConnectionChange?.(true);
    });

    socket.on('disconnect', () => {
      console.log('Disconnected from server');
      setIsConnected(false);
      onConnectionChange?.(false);
    });

    socket.on('connect_error', (error) => {
      console.error('Connection error:', error);
      const errorMsg = `Connection failed: ${error.message}`;
      setError(errorMsg);
      onError?.(errorMsg);
    });

    socket.on('error', (error) => {
      console.error("Socket error:", error);
      const errorMsg = `Socket error: ${error.message}`;
      setError(errorMsg);
      onError?.(errorMsg);
    });

    // Handle WebRTC signaling
    socket.on("answer", (answer) => {
      console.log("Received answer from server");
      if (peerConnectionRef.current) {
        peerConnectionRef.current.setRemoteDescription(answer);
      }
    });

    socket.on("ice-candidate", (candidate) => {
      console.log("Received ICE candidate from server");
      if (peerConnectionRef.current) {
        peerConnectionRef.current.addIceCandidate(candidate);
      }
    });

    socketRef.current = socket;

    return () => {
      socket.disconnect();
    };
  }, [onConnectionChange, onError]);

  const startStream = async () => {
    // Detect current browser
    const userAgent = navigator.userAgent;
    let currentBrowser = 'Unknown';
    
    if (userAgent.includes('Safari') && !userAgent.includes('Chrome')) {
      currentBrowser = 'Safari';
    } else if (userAgent.includes('Chrome')) {
      currentBrowser = 'Chrome';
    } else if (userAgent.includes('Firefox')) {
      currentBrowser = 'Firefox';
    } else if (userAgent.includes('Edge')) {
      currentBrowser = 'Edge';
    }
    
    console.log('Current browser detected:', currentBrowser);
    console.log('User agent:', userAgent);
    console.log('MediaDevices available:', !!navigator.mediaDevices);
    console.log('getUserMedia available:', !!navigator.mediaDevices?.getUserMedia);
    
    try {
      setError(null);
      setIsConnecting(true);
      
      // Check for browser compatibility
      if (!navigator.mediaDevices) {
        const supportedBrowsers = ['Chrome', 'Safari', 'Firefox'];
        if (supportedBrowsers.includes(currentBrowser)) {
          throw new Error(`Browser API issue in ${currentBrowser}. Try refreshing the page or checking browser settings.`);
        } else {
          throw new Error(`MediaDevices API not supported in ${currentBrowser}. Please try a different browser.`);
        }
      }
      
      if (!navigator.mediaDevices.getUserMedia) {
        // Fallback for older browsers
        const getUserMedia = (navigator as any).getUserMedia || 
                           (navigator as any).webkitGetUserMedia || 
                           (navigator as any).mozGetUserMedia || 
                           (navigator as any).msGetUserMedia;
        
        if (!getUserMedia) {
          // Check if they're on a supported browser
          const supportedBrowsers = ['Chrome', 'Safari', 'Firefox'];
          if (supportedBrowsers.includes(currentBrowser)) {
            throw new Error(`Camera API not available in ${currentBrowser}. This might be a browser version or security setting issue.`);
          } else {
            throw new Error(`Camera access not supported in ${currentBrowser}. Please try Safari, Chrome, or Firefox.`);
          }
        }
        
        console.log('Using fallback getUserMedia API');
        
        // Convert to Promise-based API
        const getUserMediaPromise = (constraints: any) => {
          return new Promise<MediaStream>((resolve, reject) => {
            getUserMedia.call(navigator, constraints, resolve, reject);
          });
        };
        
        // Use fallback API
        const mediaStream = await getUserMediaPromise({
          video: true,
          audio: false
        });
        
        setStream(mediaStream);
        setIsStreaming(true);
        onStreamStart?.(mediaStream);
        return;
      }
      
      // Modern browser - iOS Safari requires more specific constraints
      const constraints = {
        video: {
          width: { ideal: 1280, max: 1920 },
          height: { ideal: 720, max: 1080 },
          facingMode: "user",
          // iOS Safari specific
          frameRate: { ideal: 30, max: 30 }
        },
        audio: false
      };
      
      console.log("Requesting camera access with constraints:", constraints);
      
      // Get camera access
      const mediaStream = await navigator.mediaDevices.getUserMedia(constraints);
      
      setStream(mediaStream);
      setIsStreaming(true);
      onStreamStart?.(mediaStream);

      // Create WebRTC peer connection
      const pc = new RTCPeerConnection({
        iceServers: [
          { urls: "stun:stun.l.google.com:19302" }
        ]
      });

      // Add video track to peer connection
      mediaStream.getTracks().forEach(track => {
        pc.addTrack(track, mediaStream);
      });

      // Handle ICE candidates
      pc.onicecandidate = (event) => {
        if (event.candidate && socketRef.current) {
          socketRef.current.emit("ice-candidate", event.candidate);
        }
      };

      // Create and send offer
      const offer = await pc.createOffer();
      await pc.setLocalDescription(offer);
      
      if (socketRef.current) {
        socketRef.current.emit("offer", offer);
      }

      peerConnectionRef.current = pc;

    } catch (error: any) {
      console.error("Failed to start stream:", error);
      console.error("Error details:", {
        name: error.name,
        message: error.message,
        stack: error.stack
      });
      setIsStreaming(false);
      
      let errorMessage = '';
      
      // iOS Safari specific error handling
      if (error.name === 'NotAllowedError') {
        errorMessage = `Camera access denied in ${currentBrowser}. Please allow camera permissions in Safari settings.`;
      } else if (error.name === 'NotFoundError') {
        errorMessage = `No camera found on this device.`;
      } else if (error.name === 'NotSupportedError') {
        errorMessage = `Camera not supported in ${currentBrowser}. Please try Safari or Chrome.`;
      } else if (error.message?.includes('MediaDevices API not supported')) {
        const supportedBrowsers = ['Chrome', 'Safari', 'Firefox'];
        if (supportedBrowsers.includes(currentBrowser)) {
          errorMessage = `Browser API issue in ${currentBrowser}. Try refreshing the page or checking browser settings.`;
        } else {
          errorMessage = error.message;
        }
      } else if (error.message?.includes('Camera access not supported')) {
        const supportedBrowsers = ['Chrome', 'Safari', 'Firefox'];
        if (supportedBrowsers.includes(currentBrowser)) {
          errorMessage = `Camera API issue in ${currentBrowser}. Try refreshing or check permissions.`;
        } else {
          errorMessage = error.message;
        }
      } else if (error.name === 'NotReadableError') {
        errorMessage = `Camera is already in use by another application.`;
      } else if (error.name === 'OverconstrainedError') {
        errorMessage = `Camera doesn't support the requested settings.`;
      } else {
        errorMessage = `Camera error in ${currentBrowser}: ${error.message || 'Unknown error'}`;
      }
      
      setError(errorMessage);
      onError?.(errorMessage);
    } finally {
      setIsConnecting(false);
    }
  };

  const stopStream = () => {
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
      setStream(null);
    }
    
    if (peerConnectionRef.current) {
      peerConnectionRef.current.close();
      peerConnectionRef.current = null;
    }
    
    setIsStreaming(false);
    setError(null);
    onStreamStop?.();
  };

  // Return state and methods
  return {
    // State
    isStreaming,
    isConnecting,
    isConnected,
    stream,
    error,
    
    // Methods
    startStream,
    stopStream,
    
    // Clear error
    clearError: () => {
      setError(null);
    }
  };
};

export default useCameraStatus;
