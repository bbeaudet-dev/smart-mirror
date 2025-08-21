# AI-Powered Smart Mirror - Implementation Plan

## Project Overview

Building an AI-powered smart mirror with live outfit analysis and other features. This will be demoed as a graduation project showcasing advanced AI integration with physical hardware.

**Timeline**: 1 Week (Wednesday to next Wednesday)
**Budget**: Additional $100-200 maximum (excluding existing Pi, monitor, cables)
**Focus**: Functional smart mirror, integrated camera, sending data to AI, using response from AI for delightful features like outfit analysis
**Bonus**: Different AI personalities (Snoop Dogg, Elle Woods) for demo
**Future Demo Idea**: Multi-user experience where multiple phones connect simultaneously, each user gets personalized AI responses with different personalities/voices

## Hardware Components

### Core Components (Already Available)

- **Raspberry Pi 5** - Main computing unit
- **ARZOPA 16" Monitor** - Display unit (2.5K resolution)
- **Relevant Cables** - HDMI, power, etc.
- **Power Supply** - for Raspberry Pi, monitor, etc.

### Components to Purchase

#### Essential (Must Purchase)

- **Two-Way Mirror/Acrylic** (12" x 18" recommended)

  - Budget: $25-50
  - **RECOMMENDATION**: 0.12" thick scratch-resistant acrylic (40% transparent)
  - Source: Amazon or local acrylic supplier (preferred for custom drilling)
  - Thickness: 0.12" (3mm) is ideal - avoid 0.04" (too thin)
  - **Size Justification**: 12"x18" provides good coverage for 16" monitor while being cost-effective
  - **Local Option**: If available, local acrylic shop can drill mounting holes

- **Frame/Case** (Pre-made picture frame recommended)
  - Budget: $20-60
  - **RECOMMENDATION**: 12"x18" picture frame with deep enough rabbet for monitor
  - Size: 12" x 18" to match acrylic sheet
  - Options:
    - Deep shadow box frame (preferred - more space for monitor)
    - Standard picture frame with extended backing
    - Simple wooden frame with custom backing
  - **Alternative Option**: The Raspberry Pi tutorial uses machine bolts/nuts and spacing pillars with drilled holes in the acrylic, eliminating most of the need for a frame.

#### Camera & Audio Options

**Option A: USB Webcam + ARZOPA Speakers** (Recommended)

- **USB Webcam** (1080p minimum)
  - Budget: $30-60
  - Recommendations: Logitech C920, C922 (good low-light performance)
- **Audio**: Use ARZOPA monitor's built-in speakers
  - Budget: $0 (already available)
  - Pros: No additional hardware needed
  - Cons: May need external speakers for demo volume

**Option B: Phone as Camera + Bluetooth Speaker** (Alternative)

- **Phone Mount**
  - Budget: $10-20
  - **Bluetooth Speaker**
  - Budget: $20-40 (if you don't have one)
  - Pros: Better camera quality, good audio, no additional webcam needed
  - Cons: More complex setup, potential connectivity issues

**Option C: USB Webcam + External Speakers** (Fallback)

- **USB Webcam** (1080p minimum)
  - Budget: $30-60
- **Small Speakers** (2-3W RMS)
  - Budget: $15-30
  - Options: USB-powered speakers or small bookshelf speakers

#### Assembly Hardware

- **Mounting Hardware**
  - Budget: $15-30
  - Screws, brackets, cable management
- **Lighting** (Recommended for demo)
  - Budget: $20-40
  - LED strip or small LED light
  - Improves webcam performance in low-light demo environment

## Software Architecture

### Current State Analysis

- ✅ React frontend with modular components
- ✅ Node.js backend with API routes
- ✅ OpenAI integration for text responses
- ✅ Weather and calendar data integration
- ❌ Webcam integration
- ❌ Real-time video processing
- ❌ Audio input/output
- ❌ Computer vision features

### Development Phases (8-Day Timeline)

#### Phase 1: Hardware & Basic Webcam (Days 1-3)

**Goal**: Get webcam working and capturing images for AI analysis

**Tasks**:

1. **Hardware Setup** (Day 1-2)

   - Purchase/borrow USB webcam
   - Assemble frame and mount monitor/mirror
   - Install webcam and test connections
   - Verify Pi can detect and use webcam

2. **Basic Webcam Integration** (Day 2-3)
   - Test webcam access in React app
   - Verify image capture functionality
   - Test video quality and positioning
   - Ensure frames are ready for AI processing

**Deliverables**:

- Working webcam hardware
- Image capture working
- Frames ready for AI processing

#### Phase 2: AI Vision Integration (Days 4-5)

**Goal**: Connect webcam to AI vision processing

**Tasks**:

1. **Image Processing Pipeline** (Day 4)

   - Capture images from webcam feed
   - Send images to OpenAI Vision API
   - Test basic image analysis
   - Handle API responses

2. **AI Response Display** (Day 5)
   - Create component to display AI responses on mirror
   - Test end-to-end flow: webcam → AI → display
   - Add basic error handling
   - Implement response formatting

**Deliverables**:

- Working AI image analysis
- AI responses displaying on mirror
- Complete webcam → AI → display pipeline

#### Phase 3: Automation & Polish (Days 6-8)

**Goal**: Add automation and polish for demo

**Tasks**:

1. **Automated Trigger System** (Day 6)

   - Add motion detection for automatic capture
   - Implement smooth user experience flow
   - Add loading states and feedback

2. **Text-to-Speech** (Day 7)

   - Integrate Web Speech API
   - Add voice output for AI responses
   - Test audio quality and timing

3. **Demo Polish** (Day 8)
   - Final UI/UX refinements
   - Demo flow preparation
   - Testing and bug fixes

**Deliverables**:

- Complete automated system
- Text-to-speech working
- Demo-ready smart mirror

## Feature Complexity Analysis

### Outfit Analysis vs Simon Says

**Outfit Analysis** (Recommended for Demo)

- **Complexity**: Medium
- **Core Requirements**: Webcam capture + OpenAI Vision API + Text-to-speech
- **Demo Value**: High - anyone can participate
- **Technical Stack**: React + WebRTC + OpenAI + Web Speech API

**Simon Says** (Stretch Goal)

- **Complexity**: High
- **Core Requirements**: Gesture recognition + Real-time processing + Complex game logic
- **Demo Value**: Medium - single person experience
- **Technical Stack**: React + Computer Vision + Gesture Recognition + Real-time audio

**Divergence Point**: After basic webcam integration (Day 3). Both features need:

- Webcam access ✅
- Audio output ✅
- Basic UI framework ✅

**Recommendation**: Focus on outfit analysis for demo. Simon Says can be added later if time permits.

## Technical Implementation Details

### Webcam Integration

```typescript
// client/src/hooks/useWebRTC.ts
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

### AI Integration Enhancement

```typescript
// server/services/outfitAnalysisService.js
const analyzeOutfit = async (imageData, weather, personality = "default") => {
  const prompt = generateOutfitPrompt(weather, personality);

  const response = await openai.chat.completions.create({
    model: "gpt-4-vision-preview",
    messages: [
      {
        role: "user",
        content: [
          { type: "text", text: prompt },
          { type: "image_url", image_url: { url: imageData } },
        ],
      },
    ],
    max_tokens: 300,
  });

  return response.choices[0].message.content;
};

const generateOutfitPrompt = (weather, personality) => {
  const basePrompt = `Analyze this outfit considering it's ${weather.temperature}°F and ${weather.condition} today. `;

  const personalityPrompts = {
    snoop:
      basePrompt +
      "Respond like Snoop Dogg would - keep it real, use some slang, but be encouraging.",
    elle:
      basePrompt +
      "Respond like Elle Woods from Legally Blonde - be enthusiastic, fashion-forward, and empowering.",
    default:
      basePrompt +
      "Give a friendly, encouraging analysis with specific suggestions.",
  };

  return personalityPrompts[personality] || personalityPrompts.default;
};
```

### Text-to-Speech with Personality

```typescript
// client/src/services/speechService.ts
export class SpeechService {
  private voices: SpeechSynthesisVoice[] = [];
  private currentPersonality: string = "default";

  constructor() {
    this.loadVoices();
  }

  private loadVoices() {
    if (speechSynthesis.onvoiceschanged !== undefined) {
      speechSynthesis.onvoiceschanged = () => {
        this.voices = speechSynthesis.getVoices();
      };
    }
  }

  speakWithPersonality(text: string, personality: string) {
    const utterance = new SpeechSynthesisUtterance(text);

    // Adjust voice properties based on personality
    switch (personality) {
      case "snoop":
        utterance.rate = 0.8; // Slower, more relaxed
        utterance.pitch = 0.9; // Slightly lower pitch
        break;
      case "elle":
        utterance.rate = 1.2; // Faster, more energetic
        utterance.pitch = 1.1; // Slightly higher pitch
        break;
      default:
        utterance.rate = 1.0;
        utterance.pitch = 1.0;
    }

    speechSynthesis.speak(utterance);
  }
}
```

## WebRTC Phone Integration Plan

### Overview

Use phone as webcam via WebRTC for AI analysis without displaying video feed on mirror. Phone captures video, streams to Pi, Pi captures frames and sends to AI, AI response plays through phone speaker.

### Technical Flow

```
Phone Camera → WebRTC Stream → Pi → Frame Capture (every 2-3s) → AI Analysis → Response → Phone Speaker
```

### Implementation Phases

#### Phase 1: WebRTC Setup (Days 1-2)

**Goal**: Establish WebRTC connection between phone and Pi

**Tasks**:

1. **WebRTC Server Setup** (Day 1)

   - Add WebRTC signaling server to Node.js backend
   - Create WebRTC connection handling
   - Test connection establishment

2. **Phone Web Interface** (Day 1-2)

   - Create simple web page for phone camera access
   - Implement WebRTC client on phone
   - Test video streaming to Pi

3. **Frame Capture System** (Day 2)
   - Implement automatic frame capture from WebRTC stream
   - Set up 2-3 second capture interval
   - Test frame quality and format

**Deliverables**:

- WebRTC connection working between phone and Pi
- Automatic frame capture from phone camera
- Frames ready for AI processing

#### Phase 2: AI Integration (Days 3-4)

**Goal**: Connect captured frames to AI analysis

**Tasks**:

1. **Frame Processing Pipeline** (Day 3)

   - Send captured frames to OpenAI Vision API
   - Implement basic object detection prompts
   - Handle AI responses

2. **Response System** (Day 4)
   - Send AI responses to mirror display
   - Implement text display on mirror
   - Add basic audio notification

**Deliverables**:

- Complete phone → AI → response pipeline
- AI analyzing phone camera frames
- Responses displaying on mirror

#### Phase 3: Polish & Demo (Days 5-6)

**Goal**: Refine system and prepare for demo

**Tasks**:

1. **Motion Detection** (Day 5)

   - Implement basic motion detection
   - Trigger capture only when motion detected
   - Optimize capture frequency

2. **Demo Preparation** (Day 6)
   - Test complete flow
   - Add error handling
   - Prepare demo scenarios

**Deliverables**:

- Motion-triggered capture system
- Robust error handling
- Demo-ready system

### Fallback Plan

If WebRTC integration becomes too complex:

- Implement script-based testing with sample images
- Test AI pipeline with static images from repo
- Focus on getting AI analysis working first
- Return to WebRTC later

### Motion Detection Complexity

Basic motion detection can be implemented by:

- Comparing consecutive frames for pixel differences
- Using simple threshold-based detection
- JavaScript-based implementation on Pi
- Estimated complexity: Medium (1-2 days)

### AI Response Options

**Option A: Text Response + TTS Later**

- AI returns text response to Raspberry Pi
- Display text on Smart Mirror component
- Add TTS later (Web Speech API)
- Simpler initial implementation

**Option B: Direct Audio Response**

- AI generates audio directly
- More complex but cleaner
- Requires different AI service/approach

**Recommendation**: Start with text responses, add TTS later for simplicity. Investigate AI-generated audio only if ahead of schedule.

## Risk Assessment & Mitigation

### Technical Risks

1. **Webcam Performance Issues**

   - Risk: Poor video quality or latency
   - Mitigation: Test multiple webcams, optimize video settings

2. **AI API Latency**

   - Risk: Slow responses during demo
   - Mitigation: Implement caching, use faster models, have backup responses

3. **Hardware Failures**
   - Risk: Components fail during demo
   - Mitigation: Have backup hardware, test thoroughly

### Demo Risks

1. **Lighting Issues**

   - Risk: Poor webcam performance in low-light demo environment
   - Mitigation: Bring additional lighting, test in similar conditions

2. **Network Issues**

   - Risk: AI APIs unavailable during demo
   - Mitigation: Implement offline fallbacks, cache responses

3. **Timing Issues**
   - Risk: Demo runs too long or too short, or unclear presentation
   - Mitigation: Practice timing and flow, have flexible demo flow

## Success Metrics

### Technical Metrics

- Webcam latency < 100ms
- AI response time < 3 seconds
- System uptime > 95%
- Audio/video sync < 50ms

### Demo Metrics

- Audience engagement (reactions, questions)
- Technical execution (no major failures)
- Feature demonstration (all planned features work)
- Professional presentation

## Budget Summary

| Component         | Estimated Cost | Priority    |
| ----------------- | -------------- | ----------- |
| Two-Way Acrylic   | $25-50         | Essential   |
| Frame/Case        | $20-60         | Essential   |
| USB Webcam        | $30-60         | Essential   |
| Speakers          | $0-30          | Essential   |
| Microphone        | $0-25          | Essential   |
| Mounting Hardware | $15-30         | Essential   |
| Lighting          | $20-40         | Recommended |
| **Total**         | **$110-255**   |             |

## Next Steps

1. **Immediate Actions** (Today)

   - Purchase essential hardware components
   - Set up development environment
   - Begin Phase 1 implementation

2. **Daily Check-ins**

   - Review progress against phase goals
   - Adjust timeline if needed
   - Address any technical blockers

3. **Demo Preparation**
   - Start practicing demo flow early
   - Record backup videos of features
   - Prepare technical documentation

## Phone as Camera/Audio Analysis

**Pros of Using Phone**:

- Better camera quality than most USB webcams
- Built-in microphone and speakers
- No additional hardware needed
- Potentially better low-light performance

**Cons of Using Phone**:

- More complex setup (WebRTC, phone app, or web interface)
- Requires phone to be mounted and connected
- Additional development time
- Potential connectivity issues during demo

**Recommendation**: Start with USB webcam for simplicity and reliability. Phone integration can be a stretch goal if time permits.

## Future Demo Ideas

### Multi-User Smart Mirror Experience

**Concept**: Interactive demo where multiple audience members connect their phones simultaneously to the smart mirror system.

**Implementation**:

- Each phone connects to the same WebRTC server
- Input fields for Name and Personality on phone interface
- Each phone makes separate AI API calls with personalized prompts
- Simultaneous responses create a "mirror party" effect

**Technical Considerations**:

- **API Rate Limits**: OpenAI has rate limits (3 requests/minute for free tier, higher for paid)
- **Server Load**: WebRTC server can handle multiple connections
- **Network Bandwidth**: Multiple video streams may require good WiFi
- **Audio Coordination**: Multiple responses playing simultaneously could be chaotic

**Demo Flow**:

1. "Everyone take out your phones and go to [URL]"
2. Each person enters their name and chooses a personality
3. Compliments start playing from each person's phone

**Risk Mitigation**:

- Implement request queuing to avoid API rate limits
- Add audio coordination (stagger responses)
- Have fallback responses if API fails
- Test with 3-5 users first, then scale

**Potential Impact**: This could be a show-stopping demo that demonstrates real-time AI integration, multi-user systems, and creates memorable audience engagement.

---

_This plan prioritizes outfit analysis with AI personalities as the main demo feature, focusing on reliability and audience engagement over technical complexity._
