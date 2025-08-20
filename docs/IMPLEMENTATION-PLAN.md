# AI-Powered Smart Mirror - Implementation Plan

## Project Overview

Building an AI-powered smart mirror with live outfit analysis and interactive features. This will be demoed as a graduation project showcasing advanced AI integration with physical hardware.

**Timeline**: 8 days (Tuesday to next Wednesday)
**Budget**: Additional $100-200 maximum (excluding existing Pi, monitor, cables)
**Focus**: Outfit analysis with AI personalities (Snoop Dogg, Elle Woods) as primary demo feature

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

#### Phase 1: Foundation (Days 1-3)

**Goal**: Establish stable hardware setup and basic webcam integration

**Tasks**:

1. **Hardware Assembly** (Day 1-2)

   - Purchase components (Day 1)
   - Assemble frame and mount monitor/mirror (Day 2)
   - Install webcam and audio components
   - Test all connections

2. **Basic Webcam Integration** (Day 2-3)

   - Add webcam access to React app
   - Implement basic video capture
   - Test video quality and positioning

3. **Audio Setup** (Day 3)
   - Configure speakers and microphone
   - Test audio input/output
   - Implement basic text-to-speech

**Deliverables**:

- Functional hardware setup
- Basic webcam feed in React app
- Audio input/output working

#### Phase 2: Core AI Features (Days 4-6)

**Goal**: Implement outfit analysis with AI personalities

**Tasks**:

1. **OpenAI Vision API Integration** (Day 4-5)

   - Set up image capture from webcam
   - Implement OpenAI Vision API calls
   - Create outfit analysis prompts
   - Display AI responses on mirror

2. **AI Personality System** (Day 5-6)

   - Implement different AI personalities (Snoop Dogg, Elle Woods)
   - Add text-to-speech with personality voices
   - Create engaging, fun responses
   - Add personality switching

3. **Basic Interaction** (Day 6)
   - Add button/voice triggers for AI interactions
   - Create smooth interaction flow
   - Implement basic error handling

**Deliverables**:

- Live outfit analysis working
- AI personality system with voice
- Basic interaction system

#### Phase 3: Polish & Demo Prep (Days 7-8)

**Goal**: Polish everything for demo day

**Tasks**:

1. **UI/UX Polish** (Day 7)

   - Final design refinements
   - Smooth animations and transitions
   - Professional appearance

2. **Demo Preparation** (Day 8)
   - Create compelling demo flow
   - Practice timing and transitions
   - Prepare backup scenarios
   - Final testing and bug fixes

**Deliverables**:

- Polished demo-ready system
- Rehearsed demo presentation
- Backup plans for technical issues

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
- Audio input/output ✅
- Basic UI framework ✅

**Recommendation**: Focus on outfit analysis for demo. Simon Says can be added later if time permits.

## Technical Implementation Details

### Webcam Integration

```typescript
// client/src/hooks/useWebcam.ts
import { useState, useEffect, useRef } from "react";

export const useWebcam = () => {
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [isActive, setIsActive] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const startWebcam = async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: {
          width: { ideal: 1920 },
          height: { ideal: 1080 },
          facingMode: "user",
        },
      });
      setStream(mediaStream);
      setIsActive(true);
    } catch (error) {
      console.error("Webcam access failed:", error);
    }
  };

  const captureFrame = (): string | null => {
    if (!videoRef.current) return null;

    const canvas = document.createElement("canvas");
    canvas.width = videoRef.current.videoWidth;
    canvas.height = videoRef.current.videoHeight;

    const ctx = canvas.getContext("2d");
    ctx?.drawImage(videoRef.current, 0, 0);

    return canvas.toDataURL("image/jpeg", 0.8);
  };

  return { stream, isActive, startWebcam, captureFrame, videoRef };
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
   - Risk: Demo runs too long or too short
   - Mitigation: Practice timing, have flexible demo flow

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

---

_This plan prioritizes outfit analysis with AI personalities as the main demo feature, focusing on reliability and audience engagement over technical complexity._
