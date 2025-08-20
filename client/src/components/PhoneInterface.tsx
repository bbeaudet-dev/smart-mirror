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
    const socket = io("http://localhost:5005", {
      transports: ["websocket", "polling"]
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
      setError("Failed to connect to mirror");
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
      
      // Get camera access
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: {
          width: { ideal: 1920 },
          height: { ideal: 1080 },
          facingMode: "user",
        },
        audio: false, // No audio for now
      });
      
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

    } catch (error) {
      console.error("Failed to start stream:", error);
      setError("Failed to access camera. Please check permissions.");
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
    <div className="min-h-screen bg-gradient-to-br from-blue-500 to-purple-600 text-white font-sans p-5 flex flex-col items-center justify-center">
      <div className="text-center mb-8">
        <h2 className="text-4xl font-bold mb-3 text-shadow-lg">Smart Mirror Camera</h2>
        <div className={`inline-block px-4 py-2 rounded-full text-sm font-medium ${
          isConnected 
            ? 'bg-green-500/20 border border-green-500/50 text-green-400' 
            : 'bg-red-500/20 border border-red-500/50 text-red-400'
        }`}>
          {isConnected ? "Connected to Mirror" : "Not Connected"}
        </div>
      </div>

      <div className="relative w-full max-w-md h-80 bg-black/30 rounded-2xl overflow-hidden mb-8 flex items-center justify-center">
        <video 
          ref={videoRef} 
          autoPlay 
          playsInline 
          muted 
          className="w-full h-full object-cover"
        />
        {!stream && (
          <div className="absolute inset-0 flex items-center justify-center">
            <p className="text-white/70 text-lg">Camera feed will appear here</p>
          </div>
        )}
      </div>

      <div className="mb-8">
        {!isStreaming ? (
          <button 
            onClick={startStream} 
            disabled={!isConnected}
            className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 min-w-36 ${
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
            className="px-6 py-3 rounded-full font-semibold bg-red-500 hover:bg-red-600 hover:-translate-y-0.5 hover:shadow-lg transition-all duration-300 min-w-36"
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

      <div className="text-center max-w-md">
        <p className="mb-2 text-white/90 text-sm leading-relaxed">📱 Camera is streaming to your smart mirror</p>
        <p className="mb-2 text-white/90 text-sm leading-relaxed">🤖 AI will analyze your outfit every 3 seconds</p>
        <p className="mb-2 text-white/90 text-sm leading-relaxed">📺 Responses will appear on the mirror screen</p>
      </div>
    </div>
  );
};

export default PhoneInterface;
