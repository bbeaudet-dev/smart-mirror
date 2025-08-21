import React, { useEffect, useRef, useState } from "react";
import { io, Socket } from "socket.io-client";

interface PhoneInterfaceProps {}

const PhoneInterface: React.FC<PhoneInterfaceProps> = () => {
  const [isConnected, setIsConnected] = useState(false);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isStreaming, setIsStreaming] = useState(false);
  
  const videoRef = useRef<HTMLVideoElement>(null);
  const socketRef = useRef<Socket | null>(null);
  const peerConnectionRef = useRef<RTCPeerConnection | null>(null);

  // Initialize Socket.io connection
  useEffect(() => {
    // Get the server URL - use local IP if available, otherwise localhost
    const serverUrl = window.location.hostname === 'localhost' 
      ? "http://localhost:5005"
      : `http://${window.location.hostname}:5005`;
    
    console.log("Connecting to WebRTC server:", serverUrl);
    console.log("Current hostname:", window.location.hostname);
    console.log("Current URL:", window.location.href);
    
    const socket = io(serverUrl, {
      transports: ["websocket", "polling"],
      timeout: 20000,
      forceNew: true
    });

    socket.on("connect", () => {
      console.log("Connected to WebRTC signaling server");
      setIsConnected(true);
      setError(null);
    });

    socket.on("disconnect", () => {
      console.log("Disconnected from WebRTC signaling server");
      setIsConnected(false);
    });

    socket.on("connect_error", (error) => {
      console.error("Connection error:", error);
      setError(`Failed to connect to server: ${error.message}`);
    });

    socket.on("error", (error) => {
      console.error("Socket error:", error);
      setError(`Socket error: ${error.message}`);
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
  }, []);

  // Display phone's own video feed
  useEffect(() => {
    if (videoRef.current && stream) {
      videoRef.current.srcObject = stream;
    }
  }, [stream]);

  const startStream = async () => {
    try {
      setError(null);
      
      // Check for browser compatibility
      if (!navigator.mediaDevices) {
        throw new Error("MediaDevices API not supported. Please use a modern browser.");
      }
      
      if (!navigator.mediaDevices.getUserMedia) {
        // Fallback for older browsers
        const getUserMedia = (navigator as any).getUserMedia || 
                           (navigator as any).webkitGetUserMedia || 
                           (navigator as any).mozGetUserMedia || 
                           (navigator as any).msGetUserMedia;
        
        if (!getUserMedia) {
          throw new Error("Camera access not supported. Please use a modern browser.");
        }
        
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
      console.log("User agent:", navigator.userAgent);
      console.log("MediaDevices supported:", !!navigator.mediaDevices);
      console.log("getUserMedia supported:", !!navigator.mediaDevices?.getUserMedia);
      
      // Get camera access
      const mediaStream = await navigator.mediaDevices.getUserMedia(constraints);
      
      setStream(mediaStream);
      setIsStreaming(true);

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
      
      // iOS Safari specific error handling
      if (error.name === 'NotAllowedError') {
        setError("Camera access denied. Please allow camera permissions in Safari settings.");
      } else if (error.name === 'NotFoundError') {
        setError("No camera found. Please check your device has a camera.");
      } else if (error.name === 'NotSupportedError') {
        setError("Camera not supported. Please try a different browser.");
      } else if (error.message?.includes('MediaDevices API not supported')) {
        setError("Your browser doesn't support camera access. Please use Safari, Chrome, or Firefox.");
      } else if (error.message?.includes('Camera access not supported')) {
        setError("Camera access not available. Please check browser permissions.");
      } else {
        setError(`Camera error: ${error.message || 'Unknown error'}`);
      }
    }
  };

  const stopStream = () => {
    if (stream) {
      stream.getTracks().forEach((track) => track.stop());
      setStream(null);
      setIsStreaming(false);
    }
    
    if (peerConnectionRef.current) {
      peerConnectionRef.current.close();
      peerConnectionRef.current = null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 to-purple-600 text-white font-sans p-3 flex flex-col items-center justify-start pt-8">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold mb-3 text-shadow-lg">Smart Mirror Camera</h2>
          <div className={`inline-block px-4 py-2 rounded-full text-sm font-medium ${
            isConnected 
              ? 'bg-green-500/20 border border-green-500/50 text-green-400' 
              : 'bg-red-500/20 border border-red-500/50 text-red-400'
          }`}>
            {isConnected ? "Connected to Server" : "Not Connected"}
          </div>
        </div>

        <div className="relative w-full max-w-sm h-64 bg-black/30 rounded-2xl overflow-hidden mb-6 flex items-center justify-center">
          <video 
            ref={videoRef} 
            autoPlay 
            playsInline 
            muted 
            className="w-full h-full object-cover"
          />
          {!stream && (
            <div className="absolute inset-0 flex items-center justify-center p-4">
              <p className="text-white/70 text-center text-sm">
                {!isStreaming ? "Press Start button to begin" : "Camera feed loading..."}
              </p>
            </div>
          )}
        </div>

        <div className="mb-6">
          {!isStreaming ? (
            <button 
              onClick={startStream} 
              disabled={!isConnected}
              className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 min-w-32 ${
                isConnected
                  ? 'bg-green-500 hover:bg-green-600 hover:-translate-y-0.5 hover:shadow-lg'
                  : 'bg-gray-500 cursor-not-allowed'
              }`}
            >
              Start Camera
            </button>
          ) : (
            <button 
              onClick={stopStream} 
              className="px-6 py-3 rounded-full font-semibold bg-red-500 hover:bg-red-600 hover:-translate-y-0.5 hover:shadow-lg transition-all duration-300 min-w-32"
            >
              Stop Camera
            </button>
          )}
        </div>

        {error && (
          <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4 mb-6 text-center">
            <p className="text-red-300 text-sm">{error}</p>
          </div>
        )}

        {/* Debug Information */}
        <div className="bg-black/20 border border-white/20 rounded-lg p-3 mb-4 text-center max-w-sm">
          <p className="text-white/70 text-xs mb-1">Debug:</p>
          <p className="text-white/60 text-xs">Server: {window.location.hostname}:5005</p>
          <p className="text-white/60 text-xs">Connected: {isConnected ? 'Yes' : 'No'}</p>
          <p className="text-white/60 text-xs">Streaming: {isStreaming ? 'Yes' : 'No'}</p>
          <p className="text-white/60 text-xs">Camera: {stream ? 'Active' : 'Inactive'}</p>
        </div>
    </div>
  );
};

export default PhoneInterface;
