# AI Smart Mirror

A Raspberry Pi-powered smart mirror with AI outfit analysis, motion detection, and contextual responses. Built in 10 days for Fractal Tech demo day.

## Features

### 🤖 AI-Powered Features

- **Motion Detection**: Automatic triggering of AI interactions when someone approaches
- **AI Outfit Analysis**: Weather-aware outfit feedback using OpenAI Vision API
- **Multiple AI Personalities**: Snow White mirror, Snoop Dogg, nihilist with custom voices
- **Text-to-Speech**: OpenAI TTS with personality-appropriate voices
- **Pre-generated Audio**: Configurable motion, welcome, and sendoff messages

### 🕐 Smart Mirror Display

- **Real-time Weather**: Current conditions and forecasts via WeatherAPI
- **News Headlines**: Latest news via NewsAPI
- **Time & Date**: Real-time clock display
- **Calendar Integration**: Temporarily disabled (Google Calendar)

### 🎨 User Experience

- **Smooth Interactions**: 20-30 second interaction cycles with minimal waiting
- **Event Integration**: Configurable messages for specific events
- **Responsive Design**: Optimized for mirror viewing with high contrast

## Architecture

```
smart-mirror/
├── client-mirror/              # React/Electron frontend
│   ├── src/
│   │   ├── components/         # Mirror interface components
│   │   ├── hooks/             # Motion detection, webcam, AI
│   │   └── services/          # API clients
│   └── public/
├── server/                     # Node.js/Express backend
│   ├── routes/                # API endpoints
│   ├── services/              # AI, weather, calendar services
│   └── data/                  # Audio cache and pre-generated files
└── docs/                      # Project documentation
```

## Hardware

- **Raspberry Pi 5** (8GB) - Main computing unit
- **ARZOPA 16" Monitor** - Display unit
- **Two-way Acrylic Panel** - Mirror overlay
- **Logitech C920 Webcam** - Motion detection and image capture
- **Custom Frame** - Hardware mounting and assembly

## Getting Started

### Prerequisites

- Raspberry Pi 5 (or Pi 4)
- Node.js v16+
- OpenAI API key
- WeatherAPI key (optional)
- Google Calendar credentials (optional)
- NewsAPI key (optional)

### Installation

1. **Clone and install:**

   ```bash
   git clone https://github.com/bbeaudet-dev/ai-smart-mirror.git
   cd smart-mirror
   npm install
   cd server && npm install
   ```

2. **Set up environment:**

   ```bash
   cp env.example .env
   cp server/env.example server/.env
   # Edit with your API keys
   ```

3. **Start the application:**

   ```bash
   npm run dev
   ```

4. **Access the mirror:**
   - Local: `http://localhost:3000`
   - Network: `http://raspberrypi:3000` (using hostname)

## API Endpoints

### AI Analysis

- `POST /api/ai/automatic` - Motion-triggered outfit analysis
- `POST /api/ai/analyze-outfit` - Basic outfit analysis
- `POST /api/ai/analyze-outfit-with-weather` - Weather-aware analysis
- `POST /api/ai/magic-mirror-tts` - Magic Mirror personality analysis

### Pre-generated Audio

- `GET /api/pre-generated-audio/motion` - Motion response audio
- `GET /api/pre-generated-audio/welcome` - Welcome message audio
- `GET /api/pre-generated-audio/sendoff` - Sendoff message audio

### Data Services

- `GET /api/weather` - Current weather data
- `GET /api/news/headlines` - News headlines
- `GET /api/tts/voices` - Available TTS voices

### TTS Generation

- `POST /api/tts/generate` - Generate speech from text

## User Interaction Flow

1. **Motion Detection** - User approaches mirror
2. **Motion Response** - Pre-generated audio plays immediately
3. **Welcome Message** - Event-specific welcome (if configured)
4. **AI Analysis** - Image capture and outfit analysis with weather context
5. **Response Display** - AI feedback with text-to-speech
6. **Sendoff Message** - Pre-generated goodbye message

## Configuration

### Environment Variables

```env
# Root .env
VITE_API_URL=http://raspberrypi:5005

# Server .env
OPENAI_API_KEY=your_openai_key
WEATHER_API_KEY=your_weather_key
NEWS_API_KEY=your_news_key
# GOOGLE_CLIENT_ID=your_google_client_id (temporarily disabled)
# GOOGLE_CLIENT_SECRET=your_google_client_secret (temporarily disabled)
```

### Motion Detection Settings

```typescript
// client-mirror/src/hooks/useMotionDetection.ts
const options = {
  threshold: 0.025, // Motion sensitivity
  interval: 100, // Check frequency (ms)
  minMotionDuration: 250, // Minimum motion duration (ms)
  isAutomaticMode: true,
};
```

## Development

### Project Structure

- **Frontend**: React with Electron for desktop app
- **Backend**: Node.js/Express with OpenAI integration
- **Motion Detection**: Server-side frame analysis
- **Audio**: Pre-generated files + OpenAI TTS
- **APIs**: Weather, Calendar, News, OpenAI Vision

### Key Technologies

- **React/Electron** - Frontend interface
- **Node.js/Express** - Backend API server
- **OpenAI Vision API** - Image analysis
- **OpenAI TTS** - Text-to-speech
- **WebRTC** - Phone interface (built but not used)
- **Roboflow** - Computer vision (in development)

## Troubleshooting

### Common Issues

1. **IP Address Changes**: Use hostname `raspberrypi` instead of IP in `.env`
2. **Motion Detection**: Adjust threshold and duration in motion detection hook
3. **Audio Issues**: Check pre-generated audio files exist in `server/data/audio-pre-generated/`
4. **API Failures**: Verify API keys and network connectivity

### Debug Mode

Access debug panel with `Ctrl+Shift+D` to:

- Test motion detection
- Manually trigger AI analysis
- Adjust voice settings
- View system status

## Future Development

- **Roboflow Integration** - Enhanced computer vision
- **Local LLMs** - Offline AI processing
- **Better Glass** - Replace acrylic with proper mirror glass
- **Commercial Applications** - Event fit-check systems
- **Multi-user Experience** - Phone interface for group interactions

## License

MIT License - see LICENSE file for details.

## Acknowledgments

- Built for Fractal Tech demo day
- OpenAI for AI and TTS capabilities
- WeatherAPI, Google Calendar, NewsAPI for data services
