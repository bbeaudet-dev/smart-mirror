# Smart Mirror Setup Guide

## Environment Configuration

This project uses a clean separation of environment variables to avoid duplication:

### 1. Root Configuration (`.env`)

**Purpose**: Shared configuration for the entire project
**Location**: Root directory

```bash
# Copy the example
cp env.example .env

# Edit with your preferences
nano .env
```

**Required Variables**:

- `VITE_API_URL`: URL where the server runs (use hostname for Pi: `http://raspberrypi:5005`)

### 2. Server Configuration (`server/.env`)

**Purpose**: Server-specific configuration including API keys
**Location**: `server/` directory

```bash
# Copy the example
cp server/env.example server/.env

# Edit with your API keys
nano server/.env
```

**Required Variables**:

- `OPENAI_API_KEY`: Your OpenAI API key (REQUIRED for AI features)

**Optional Variables**:

- `WEATHER_API_KEY`: For weather data integration
- `GOOGLE_CLIENT_ID` & `GOOGLE_CLIENT_SECRET`: For calendar integration
- `NEWS_API_KEY`: For news headlines

## Quick Start

1. **Set up environment files**:

   ```bash
   cp env.example .env
   cp server/env.example server/.env
   ```

2. **Add your OpenAI API key** to `server/.env`:

   ```env
   OPENAI_API_KEY=sk-your-actual-api-key-here
   ```

3. **Configure API URL** in root `.env`:

   ```env
   # For local development
   VITE_API_URL=http://localhost:5005

   # For Raspberry Pi (use hostname)
   VITE_API_URL=http://raspberrypi:5005
   ```

4. **Install dependencies**:

   ```bash
   npm install
   cd server && npm install
   cd ../client-mirror && npm install
   ```

5. **Start the application**:

   ```bash
   npm run dev
   ```

6. **Access the mirror**:
   - Local: `http://localhost:3000`
   - Network: `http://raspberrypi:3000` (using hostname)

## Environment Variable Flow

```
Root .env → Client (Vite) → import.meta.env.VITE_*
Server .env → Server (Node.js) → process.env.*
```

## API Key Sources

- **OpenAI API Key**: https://platform.openai.com/account/api-keys
- **WeatherAPI Key**: https://www.weatherapi.com/ (optional)
- **Google Calendar**: https://console.cloud.google.com/ (optional)
- **NewsAPI Key**: https://newsapi.org/ (optional)

## Project Structure

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

## Development Commands

### Local Development

```bash
# Start both client and server
npm run dev

# Start server only
npm run server:dev

# Start client only
npm run client:dev
```

### Production Build

```bash
# Build client
npm run client:build

# Start production server
npm start
```

## Testing

### API Endpoints

- **AI Analysis**: `POST /api/ai/automatic` - Motion-triggered outfit analysis
- **Weather**: `GET /api/weather` - Current weather data
- **Calendar**: `GET /api/calendar/summary` - Calendar events
- **News**: `GET /api/news/headlines` - News headlines
- **TTS**: `POST /api/tts/generate` - Text-to-speech generation

### Manual Testing

1. **Motion Detection**: Walk in front of mirror to trigger AI
2. **Debug Panel**: Press `Ctrl+Shift+D` to access testing interface
3. **Manual AI Analysis**: Use debug panel to test different AI personalities
4. **Audio Testing**: Verify text-to-speech and pre-generated audio

## Troubleshooting

### Common Issues

1. **IP Address Changes**: Use hostname `raspberrypi` instead of IP in `.env`
2. **API Failures**: Check API keys and network connectivity
3. **Motion Detection**: Adjust threshold in `useMotionDetection.ts`
4. **Audio Issues**: Verify pre-generated audio files exist

### Debug Mode

Access debug panel with `Ctrl+Shift+D` to:

- Test motion detection
- Manually trigger AI analysis
- Adjust voice settings
- View system status

## Hardware Requirements

- **Raspberry Pi 5** (8GB recommended) or Pi 4
- **ARZOPA 16" Monitor** (or similar portable monitor)
- **Two-way Acrylic Panel** (12"x18", 1/8" thick)
- **Logitech C920 Webcam** (or similar USB webcam)
- **Custom Frame** with mounting hardware

## Features

- **Motion Detection**: Automatic AI interaction triggering
- **AI Outfit Analysis**: Weather-aware outfit feedback
- **Multiple Personalities**: Snow White, Snoop Dogg, nihilist voices
- **Smart Display**: Weather, calendar, news integration
- **Text-to-Speech**: OpenAI TTS with personality voices
- **Event Integration**: Configurable messages for specific events
