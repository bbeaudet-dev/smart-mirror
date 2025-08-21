# AI Smart Mirror

An enhanced smart mirror platform built on MagicMirror² with advanced AI integration for outfit recommendations, motivational messages, and intelligent insights.

## Features

### 🤖 AI-Powered Features

- **AI Outfit Recommendations**: Contextual outfit suggestions based on weather, calendar events, and personal style
- **AI Motivation**: Personalized motivational messages based on time of day and mood
- **AI Vision**: Real-time outfit analysis using webcam and OpenAI Vision
- **Smart Weather Insights**: AI-enhanced weather analysis with personalized recommendations

### 🕐 Core Smart Mirror Features

- **Time & Date Display**: Real-time clock with customizable formats
- **Weather Integration**: Current conditions and forecasts with multiple providers
- **Calendar Integration**: Google Calendar, iCal, and other calendar services
- **News Feed**: RSS feeds and news API integration
- **Music Controls**: Spotify integration with playback controls

### 🎨 Enhanced UI/UX

- **Modern Design**: Clean, high-contrast interface optimized for mirror viewing
- **Responsive Layout**: Adapts to different screen sizes and orientations
- **Customizable Themes**: Multiple visual themes and styling options
- **Smooth Animations**: Subtle transitions and visual effects

## Architecture

This project combines the robust MagicMirror² framework with custom AI modules and a Node.js backend:

```
ai-smart-mirror/
├── [MagicMirror² Core]        # Base framework and built-in modules
├── modules/                    # Custom AI modules
│   ├── ai-outfit-recommendation/
│   ├── ai-motivation/
│   ├── ai-vision/
│   └── enhanced-weather/
├── server/                     # Node.js backend with AI services
│   ├── services/
│   │   ├── openai.js
│   │   ├── weatherService.js
│   │   └── calendarService.js
│   └── routes/
│       ├── ai.js
│       └── api.js
└── shared/                     # Shared utilities and types
    ├── types/
    └── utils/
```

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- OpenAI API key
- Weather API key (optional)
- Google Calendar credentials (optional)

### Installation

1. Clone the repository:

```bash
git clone https://github.com/yourusername/ai-smart-mirror.git
cd ai-smart-mirror
```

2. Install dependencies:

```bash
npm install
cd server && npm install
```

3. Set up environment variables:

```bash
cp .env.example .env
# Edit .env with your API keys
```

4. Start the backend server:

```bash
cd server
npm start
```

5. Start MagicMirror²:

```bash
npm start
```

6. Open [http://localhost:8080](http://localhost:8080) to view the smart mirror.

## Configuration

### AI Module Configuration

```javascript
// config/config-ai.js
{
  modules: [
    {
      module: "ai-outfit-recommendation",
      position: "middle_center",
      config: {
        updateInterval: 300000,
        apiEndpoint: "http://localhost:5000/api/ai/outfit-recommendation",
      },
    },
    {
      module: "ai-motivation",
      position: "bottom_center",
      config: {
        updateInterval: 600000,
        apiEndpoint: "http://localhost:5000/api/ai/motivation",
      },
    },
  ];
}
```

### Environment Variables

```bash
# .env
OPENAI_API_KEY=your_openai_api_key
WEATHER_API_KEY=your_weather_api_key
GOOGLE_CALENDAR_CLIENT_ID=your_google_client_id
GOOGLE_CALENDAR_CLIENT_SECRET=your_google_client_secret
```

## Development

### Adding New AI Modules

1. Create a new module directory:

```bash
mkdir modules/ai-new-feature
```

2. Create the module file:

```typescript
// modules/ai-new-feature/index.ts
Module.register("ai-new-feature", {
  defaults: {
    apiEndpoint: "http://localhost:5000/api/ai/new-feature",
    updateInterval: 300000,
  },

  start() {
    this.fetchData();
    this.scheduleUpdate();
  },

  async fetchData() {
    // Your AI integration logic
  },
});
```

3. Add to configuration:

```javascript
// config/config-ai.js
{
  module: "ai-new-feature",
  position: "top_right",
  config: {
    updateInterval: 300000
  }
}
```

### Backend API Development

The backend provides RESTful APIs for AI features:

```javascript
// server/routes/ai.js
router.post("/outfit-recommendation", async (req, res) => {
  const { temperature, condition, timeOfDay } = req.body;
  const recommendation = await OpenAIService.generateOutfitRecommendation({
    temperature,
    condition,
    timeOfDay,
  });
  res.json({ recommendation });
});
```

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Built on [MagicMirror²](https://github.com/MagicMirrorOrg/MagicMirror) by Michael Teeuw
- AI integration powered by OpenAI
- Weather data from various providers
- Calendar integration with Google Calendar
- 



RPi Logs:
benbeau@raspberrypi:~/smart-mirror $ npm run install:all

> smart-mirror@1.0.0 install:all
> npm install && cd server && npm install && cd .. && cd client-mirror && npm install && cd .. && cd client-mobile && npm install


up to date, audited 114 packages in 749ms

21 packages are looking for funding
  run `npm fund` for details

found 0 vulnerabilities
npm warn EBADENGINE Unsupported engine {
npm warn EBADENGINE   package: 'node-webrtc@0.0.0',
npm warn EBADENGINE   required: { node: '>= 0.5.0 < 0.7.0' },
npm warn EBADENGINE   current: { node: 'v22.18.0', npm: '10.9.3' }
npm warn EBADENGINE }

up to date, audited 197 packages in 796ms

26 packages are looking for funding
  run `npm fund` for details

found 0 vulnerabilities
npm warn deprecated inflight@1.0.6: This module is not supported, and leaks memory. Do not use it. Check out lru-cache if you want a good and tested way to coalesce async requests by a key value, which is much more comprehensive and powerful.
npm warn deprecated glob@7.2.3: Glob versions prior to v9 are no longer supported
npm warn deprecated boolean@3.2.0: Package no longer supported. Contact Support at https://www.npmjs.com/support for more info.

added 459 packages, and audited 460 packages in 38s

75 packages are looking for funding
  run `npm fund` for details

found 0 vulnerabilities

added 182 packages, and audited 183 packages in 9s

36 packages are looking for funding
  run `npm fund` for details

2 moderate severity vulnerabilities

To address all issues (including breaking changes), run:
  npm audit fix --force

Run `npm audit` for details.
benbeau@raspberrypi:~/smart-mirror $ npm run dev

> smart-mirror@1.0.0 dev
> concurrently "cd server && npm run dev" "cd client-mirror && npm run dev" "cd client-mobile && npm run dev"

[0] 
[0] > smart-mirror-server@1.0.0 dev
[0] > nodemon server.js
[0] 
[1] 
[1] > smart-mirror@0.1.0 dev
[1] > vite
[1] 
[2] 
[2] > smart-mirror-mobile@0.1.0 dev
[2] > vite
[2] 
[0] [nodemon] 3.1.10
[0] [nodemon] to restart at any time, enter `rs`
[0] [nodemon] watching path(s): *.*
[0] [nodemon] watching extensions: js,mjs,cjs,json
[0] [nodemon] starting `node server.js`
[2] Re-optimizing dependencies because lockfile has changed
[1] 11:14:50 AM [vite] (client) Re-optimizing dependencies because lockfile has changed
[2] 
[2]   VITE v5.4.19  ready in 366 ms
[2] 
[1] 
[1]   VITE v7.1.3  ready in 377 ms
[1] 
[1]   ➜  Local:   http://localhost:3000/
[1]   ➜  Network: http://192.168.1.225:3000/
[2]   ➜  Local:   http://localhost:3001/
[2]   ➜  Network: http://192.168.1.225:3001/
[1] (node:3174) [MODULE_TYPELESS_PACKAGE_JSON] Warning: Module type of file:///home/benbeau/smart-mirror/client-mirror/postcss.config.js?t=1755789290792 is not specified and it doesn't parse as CommonJS.
[1] Reparsing as ES module because module syntax was detected. This incurs a performance overhead.
[1] To eliminate this warning, add "type": "module" to /home/benbeau/smart-mirror/client-mirror/package.json.
[1] (Use `node --trace-warnings ...` to show where the warning was created)
[0] 🚀 Smart Mirror Server running on port 5005
[0] 📊 Health check:  http://localhost:5005/api/health
[0] 🌍 Environment: production
[0] 📱 WebRTC signaling service ready
[0] No stored tokens found


