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
