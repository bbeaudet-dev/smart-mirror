# Smart Mirror Quick Reference Guide

## Quick Overview

**Project**: AI-Powered Smart Mirror with USB Webcam Integration
**Demo Focus**: Outfit analysis with AI personalities and text-to-speech
**Hardware**: Raspberry Pi 5 + ARZOPA Monitor + USB Webcam + Two-Way Mirror

## Key Components to Point To

### 1. **Webcam Integration** (`client-mirror/src/components/modules/webcam/WebcamPanel.tsx`)

**What it does**: Handles live video feed and AI analysis triggers
**Key features**:

- Auto-starts webcam on component mount
- Captures frames for AI analysis
- Provides 5 different AI personality buttons
- Integrates text-to-speech for responses

**Point to**: Lines 25-35 (useWebcam hook integration)
**Say**: "This component manages the webcam interface and coordinates all AI analysis requests."

### 2. **AI Analysis Service** (`client-mirror/src/services/aiAnalysisService.ts`)

**What it does**: Orchestrates all AI interactions with different personalities
**Key features**:

- Weather-aware outfit analysis
- Multiple AI personalities (Weather Fascist, Snoop Style, etc.)
- Error handling and response formatting

**Point to**: Lines 55-75 (analyzeOutfitWithWeather function)
**Say**: "This service handles all AI interactions, including the critical fashion expert personality that considers weather data."

### 3. **Weather Service** (`server/services/weatherService.js`)

**What it does**: Fetches real weather data and provides Linux-compatible icons
**Key features**:

- Real weather data from WeatherAPI.com
- Intensity-based weather icons (☔☔☔ for heavy rain)
- Fallback handling for unavailable data

**Point to**: Lines 80-130 (getWeatherIcon function)
**Say**: "This service provides real weather data and uses a clever intensity system for weather icons that work well on Linux."

### 4. **Speech Service** (`client-mirror/src/services/speechService.ts`)

**What it does**: Handles text-to-speech output through HDMI audio
**Key features**:

- Web Speech API integration
- Voice selection and configuration
- Automatic speech for AI responses

**Point to**: Lines 25-50 (speak function)
**Say**: "This service converts AI responses to speech and outputs through the monitor's HDMI speakers."

### 5. **API Client** (`client-mirror/src/services/apiClient.js`)

**What it does**: Manages all frontend-backend communication
**Key features**:

- Dynamic URL detection for Pi deployment
- Enhanced error logging
- Image upload handling

**Point to**: Lines 1-30 (ApiClient class)
**Say**: "This client handles all API communication and automatically detects whether we're running on Mac or Pi."

## Demo Flow to Explain

### 1. **Hardware Setup**

- Raspberry Pi 5 running the application
- ARZOPA monitor displaying the interface
- USB webcam capturing video
- Two-way mirror reflecting the display

### 2. **Software Architecture**

- React frontend (client-mirror)
- Node.js backend (server)
- OpenAI Vision API for image analysis
- WeatherAPI.com for real weather data
- Web Speech API for audio output

### 3. **User Interaction**

1. User stands in front of mirror
2. Live video feed displays on screen
3. User clicks AI personality button
4. System captures frame and sends to AI
5. AI response displays and speaks aloud

## AI Personalities to Demonstrate

### **Weather Fascist** (Critical Fashion Expert)

- Analyzes outfit considering current weather
- Responds as a snobby, critical fashion expert
- Uses phrases like "This is a fashion disaster"

### **Snoop Style** (Snoop Dogg Personality)

- Gives fashion advice in Snoop Dogg's style
- Encouraging and positive tone
- Uses slang and mannerisms

### **Motivation** (Encouraging Messages)

- Provides uplifting, motivational content
- Focuses on potential and positivity
- Generic image analysis without fashion focus

## Technical Highlights

### **Cross-Platform Compatibility**

- Works on both Mac (development) and Pi (production)
- Automatic environment detection
- CORS configuration for Pi deployment

### **Error Handling**

- Graceful fallbacks for API failures
- User-friendly error messages
- Debug logging for troubleshooting

### **Performance Optimizations**

- Efficient image capture and transmission
- Loading states for user feedback
- Automatic cleanup of resources

## Common Questions & Answers

**Q: "How does the webcam integration work?"**
A: "We use the browser's MediaDevices API to access the USB webcam, capture frames as blobs, and send them to our AI service for analysis."

**Q: "What makes this different from other smart mirrors?"**
A: "Our focus is on AI personalities and interactive outfit analysis. We have multiple AI personalities that provide different types of feedback, and everything is voice-enabled."

**Q: "How do you handle the weather integration?"**
A: "We fetch real weather data from WeatherAPI.com and integrate it into AI prompts so the fashion analysis considers current conditions."

**Q: "What's the most challenging part?"**
A: "Getting the AI personalities to work reliably while avoiding OpenAI's safety filters. We had to carefully craft prompts that are entertaining but don't trigger impersonation warnings."

## Code Quality Highlights

- **Modular Architecture**: Each component has a single responsibility
- **TypeScript**: Full type safety throughout the application
- **Error Handling**: Comprehensive error handling and user feedback
- **Documentation**: Inline comments explaining complex logic
- **Clean Code**: Removed unused WebRTC components for clarity
