const socketIo = require('socket.io');

class WebRTCService {
  constructor(server) {
    this.io = socketIo(server, {
      cors: {
        origin: "*",
        methods: ["GET", "POST"]
      }
    });
    this.peerConnections = new Map();
    this.frameCallbacks = new Map();
    
    this.setupSocketHandlers();
  }

  setupSocketHandlers() {
    this.io.on('connection', (socket) => {
      console.log('Phone connected:', socket.id);

      // Handle WebRTC signaling
      socket.on('offer', async (offer) => {
        console.log('Received offer from phone');
        // Store the offer for the phone
        this.peerConnections.set(socket.id, { offer, socket });
        
        // Send answer back to phone
        const answer = { type: 'answer', sdp: 'dummy-sdp' }; // Simplified for now
        socket.emit('answer', answer);
      });

      socket.on('ice-candidate', (candidate) => {
        console.log('Received ICE candidate from phone');
        // Handle ICE candidate
        socket.emit('ice-candidate', candidate);
      });

      // Handle video stream data from phone
      socket.on('video-frame', (frameData) => {
        console.log('Received video frame from phone');
        this.handleVideoFrame(socket.id, frameData);
      });

      socket.on('disconnect', () => {
        console.log('Phone disconnected:', socket.id);
        this.peerConnections.delete(socket.id);
      });
    });
  }

  handleVideoFrame(phoneId, frameData) {
    // This will be called when we receive video frames from the phone
    // We'll implement frame capture and AI analysis here
    console.log('Processing video frame from phone:', phoneId);
    
    // For now, just log that we received a frame
    // TODO:Later we'll add frame capture and AI analysis
  }

  // Method to start frame capture for a specific phone
  startFrameCapture(phoneId, captureInterval = 3000) {
    console.log(`Starting frame capture for phone ${phoneId} every ${captureInterval}ms`);
    
    // TODO: This will be implemented when we add the frame capture service
    // For now, just log that we're ready to capture frames
  }

  // Method to stop frame capture for a specific phone
  stopFrameCapture(phoneId) {
    console.log(`Stopping frame capture for phone ${phoneId}`);
    
    // TODO: Cleanup logic will go here
  }
}

module.exports = WebRTCService;
