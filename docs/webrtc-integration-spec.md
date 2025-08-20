# WebRTC Integration Specification

## Overview

Integrate WebRTC to use phone as webcam for AI analysis. Phone streams video to Pi, Pi captures frames and sends to AI, AI responses display on phone.

## Current Codebase Analysis

### Existing Components to Modify/Extend

#### Server Side (`server/`)

- **`server.js`**: Add WebRTC signaling server
- **`routes/ai.js`**: Extend to handle frame processing
- **`services/openai.js`**: Already exists, no changes needed

#### Client Side (`client/src/`)

- **`hooks/useWebcam.ts`**: Replace with WebRTC hook
- **`components/modules/webcam/`**: Modify for WebRTC
- **`services/apiClient.js`**: Add WebRTC endpoints

### New Components Needed

#### Server Side

- **`server/services/webrtcService.js`**: WebRTC connection management
- **`server/services/frameCaptureService.js`**: Frame capture from WebRTC stream
- **`server/routes/webrtc.js`**: WebRTC signaling endpoints

#### Client Side

- **`client/src/hooks/useWebRTC.ts`**: WebRTC connection hook
- **`client/src/components/PhoneInterface.tsx`**: Phone web interface
- **`client/src/services/webrtcClient.js`**: WebRTC client logic

## Technical Implementation Plan

### Phase 1: WebRTC Server Setup

#### 1.1 Add WebRTC Dependencies

```bash
# server/package.json additions
npm install socket.io wrtc
```

#### 1.2 Create WebRTC Service

**File**: `server/services/webrtcService.js`

```javascript
const wrtc = require("wrtc");
const { RTCPeerConnection, RTCSessionDescription } = wrtc;

class WebRTCService {
  constructor() {
    this.peerConnections = new Map();
    this.frameCallbacks = new Map();
  }

  async createPeerConnection(phoneId) {
    const pc = new RTCPeerConnection({
      iceServers: [{ urls: "stun:stun.l.google.com:19302" }],
    });

    // Handle incoming video stream
    pc.ontrack = (event) => {
      this.handleVideoTrack(event, phoneId);
    };

    this.peerConnections.set(phoneId, pc);
    return pc;
  }

  handleVideoTrack(event, phoneId) {
    // Extract video frames from stream
    const videoTrack = event.track;
    // Frame capture logic here
  }
}
```

#### 1.3 Add WebRTC Routes

**File**: `server/routes/webrtc.js`

```javascript
const express = require("express");
const router = express.Router();
const WebRTCService = require("../services/webrtcService");

router.post("/offer", async (req, res) => {
  // Handle WebRTC offer from phone
});

router.post("/answer", async (req, res) => {
  // Handle WebRTC answer
});

router.post("/ice-candidate", async (req, res) => {
  // Handle ICE candidates
});
```

### Phase 2: Frame Capture System

#### 2.1 Create Frame Capture Service

**File**: `server/services/frameCaptureService.js`

```javascript
class FrameCaptureService {
  constructor() {
    this.captureInterval = 3000; // 3 seconds
    this.capturedFrames = new Map();
    this.aiService = require("./openai");
  }

  startCapture(phoneId, videoTrack) {
    const interval = setInterval(async () => {
      await this.captureAndAnalyze(phoneId, videoTrack);
    }, this.captureInterval);

    this.capturedFrames.set(phoneId, { interval, videoTrack });
  }

  async captureAndAnalyze(phoneId, videoTrack) {
    try {
      // Capture frame from video track
      const frameData = await this.captureFrame(videoTrack);

      // Send to AI for analysis
      const analysis = await this.aiService.analyzeImage(
        frameData,
        "image/jpeg",
        "Analyze this image and provide outfit feedback",
        "outfit-analysis"
      );

      // Display response on mirror (via WebSocket or HTTP)
      this.displayResponse(analysis);

      // Optional: Play audio response
      this.playAudioResponse(analysis);
    } catch (error) {
      console.error("Frame capture/analysis failed:", error);
    }
  }

  displayResponse(analysis) {
    // Send to React app to display on mirror
    // Implementation depends on communication method
  }

  playAudioResponse(analysis) {
    // Use Pi's text-to-speech to play response
    // Implementation depends on audio setup
  }
}
```

### Phase 3: Phone Interface

#### 3.1 Create Phone Web Interface

**File**: `client/src/components/PhoneInterface.tsx`

```typescript
import React, { useEffect, useRef } from "react";
import { useWebRTC } from "../hooks/useWebRTC";

const PhoneInterface: React.FC = () => {
  const { startStream, stopStream, isConnected, stream } = useWebRTC();
  const videoRef = useRef<HTMLVideoElement>(null);

  // Display phone's own video feed
  useEffect(() => {
    if (videoRef.current && stream) {
      videoRef.current.srcObject = stream;
    }
  }, [stream]);

  return (
    <div className="phone-interface">
      <h2>Smart Mirror Camera</h2>
      <div className="status">
        {isConnected ? "Connected to Mirror" : "Not Connected"}
      </div>
      <video ref={videoRef} autoPlay playsInline muted />
      <div className="controls">
        <button onClick={startStream} disabled={isConnected}>
          Start Camera
        </button>
        <button onClick={stopStream} disabled={!isConnected}>
          Stop Camera
        </button>
      </div>
      <div className="info">
        <p>Camera is streaming to your smart mirror</p>
        <p>AI will analyze your outfit every 3 seconds</p>
        <p>Responses will appear on the mirror screen</p>
      </div>
    </div>
  );
};
```

#### 3.3 Create Response Display Component

**File**: `client/src/components/modules/ai-response/AIResponsePanel.tsx`

```typescript
import React, { useState, useEffect } from "react";

interface AIResponsePanelProps {
  response?: string;
  isVisible: boolean;
}

const AIResponsePanel: React.FC<AIResponsePanelProps> = ({
  response,
  isVisible,
}) => {
  if (!isVisible || !response) return null;

  return (
    <div className="ai-response-panel">
      <h3>AI Analysis</h3>
      <div className="response-content">
        <p>{response}</p>
      </div>
    </div>
  );
};
```

#### 3.2 Create WebRTC Hook

**File**: `client/src/hooks/useWebRTC.ts`

```typescript
import { useState, useRef } from "react";

export const useWebRTC = () => {
  const [isConnected, setIsConnected] = useState(false);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const peerConnection = useRef<RTCPeerConnection | null>(null);

  const startStream = async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: {
          width: { ideal: 1920 },
          height: { ideal: 1080 },
          facingMode: "user",
        },
      });
      setStream(mediaStream);
      // WebRTC connection logic here
    } catch (error) {
      console.error("Camera access failed:", error);
    }
  };

  const stopStream = () => {
    if (stream) {
      stream.getTracks().forEach((track) => track.stop());
      setStream(null);
    }
  };

  return { startStream, stopStream, isConnected, stream };
};
```

## Integration Points

### 1. Server Integration

- **`server/server.js`**: Add WebRTC routes and Socket.IO
- **`server/routes/ai.js`**: Extend to handle frame analysis
- **`server/services/openai.js`**: No changes needed

### 2. Client Integration

- **`client/src/App.tsx`**: Add phone interface route
- **`client/src/components/modules/webcam/`**: Modify for WebRTC
- **`client/src/services/apiClient.js`**: Add WebRTC endpoints

### 3. Data Flow

```
Phone Camera → WebRTC Stream → Pi → Frame Capture → AI Analysis → Response Display on Mirror + Audio from Pi
```

**Detailed Flow**:

1. Phone opens web interface at `http://pi-ip:3000/phone`
2. Phone camera streams video to Pi via WebRTC (phone displays its own video feed)
3. Pi captures frames every 2-3 seconds from WebRTC stream
4. Pi sends frames to OpenAI Vision API
5. AI response displays on mirror screen (Pi)
6. Optional: Pi plays audio response through speakers

## Questions for Clarification

1. **Phone Access**: Should the phone interface be accessible via a specific URL (e.g., `http://pi-ip:3000/phone`)?

   - **Answer**: Yes, specific URL is fine. Other options would be QR code, NFC, or Bluetooth pairing, but URL is simplest.

2. **Frame Processing**: Should frames be processed immediately when captured, or queued for batch processing?

   - **Answer**: Need to decide based on pros/cons below.

3. **AI Response Format**: Should AI responses be sent back to the phone via WebRTC data channel, or through a separate HTTP endpoint?

   - **Answer**: Need to decide based on pros/cons below.

4. **Error Handling**: What should happen if WebRTC connection fails? Fallback to manual upload?

   - **Answer**: No manual upload fallback needed. Focus on good error handling, logging, and visibility into why it's failing.

5. **Security**: Do we need any authentication for the phone interface, or is it assumed to be on the same local network?

   - **Answer**: Both devices on same WiFi network. Need to clarify if additional authentication is required.

6. **Phone Speaker Audio**: Should the phone play audio notifications, or just display text responses?
   - **Answer**: AI responses should display on SMART MIRROR screen (Raspberry Pi), not phone screen. Audio can come from either phone speaker or Pi speaker - need to decide which is simpler.

## Technical Decisions Needed

### Frame Processing Options

**Option A: Immediate Processing**

- **Pros**: Real-time responses, simpler implementation, lower memory usage
- **Cons**: May overwhelm AI API with requests, potential rate limiting

**Option B: Batch Processing**

- **Pros**: More efficient API usage, can aggregate multiple frames, better error handling
- **Cons**: Delayed responses, more complex implementation, higher memory usage

**Recommendation**: Start with immediate processing for simplicity and Friday demo deadline. Can implement batch processing later if needed for accuracy.

### AI Response Communication Options

**Option A: WebRTC Data Channel**

- **Pros**: Already established connection, lower latency, real-time
- **Cons**: More complex implementation, potential connection issues

**Option B: HTTP Endpoint**

- **Pros**: Simpler implementation, more reliable, easier debugging
- **Cons**: Additional network request, slightly higher latency

**Recommendation**: Use HTTP endpoint for simplicity and reliability.

### Audio Output Options

**Option A: Phone Speaker**

- **Pros**: Already available, no additional hardware needed
- **Cons**: Requires sending audio data to phone, more complex

**Option B: Pi Speaker**

- **Pros**: Simpler data flow, Pi controls everything
- **Cons**: May need additional audio hardware/setup

**Pi Speaker Options**:

1. **HDMI Audio** (Monitor speakers) - Free, already connected
2. **USB Speaker** - $10-20, plug-and-play, good quality
3. **3.5mm Audio Jack** - Use existing speakers, need Pi config
4. **Bluetooth Speaker** - Wireless, more complex setup

**Recommendation**: Start with HDMI audio (monitor speakers) for demo. Add USB speaker later if needed for better quality.

### Security Considerations

**Same WiFi Network Security**:

- Devices can see each other on local network
- No additional authentication required for basic functionality
- Can add simple token-based auth later if needed

**Phone Interface Options**:

1. **Web Interface**: Phone opens browser, accesses camera, streams to Pi
2. **Native App**: Custom app on phone (much more complex)
3. **Progressive Web App**: Web interface that feels like native app

**Recommendation**: Web interface is simplest and most flexible.

## Implementation Order

1. **Day 1**: WebRTC server setup and basic connection
2. **Day 2**: Frame capture and phone interface
3. **Day 3**: AI integration and response system
4. **Day 4**: Testing and refinement

## Fallback Strategy

If WebRTC becomes too complex:

1. Implement simple file upload interface
2. Test AI pipeline with static images
3. Focus on getting AI analysis working
4. Return to WebRTC later
