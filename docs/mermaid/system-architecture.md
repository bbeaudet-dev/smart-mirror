# System Architecture

```mermaid
graph TB
    subgraph Hardware["Physical Hardware"]
        RP[Raspberry Pi 5<br/>8GB RAM]
        MON[ARZOPA 16" Monitor<br/>2.5K Display]
        MIRROR[Two-Way Acrylic<br/>12"x18" Panel]
        WEBCAM[Logitech C920<br/>USB Webcam]
        FRAME[Custom Frame<br/>Nylon Mounting]
        PWR[USB-C Power<br/>60W Supply]
    end

    subgraph Software["Software Stack"]
        REACT[React/Electron<br/>Frontend Interface]
        SERVER[Node.js/Express<br/>Backend API Server]
        OPENAI[OpenAI Vision API<br/>Image Analysis]
        TTS[OpenAI TTS API<br/>Text-to-Speech]
        WEATHER_API[WeatherAPI.com<br/>Weather Data]
        CALENDAR_API[Google Calendar<br/>Event Data]
        NEWS_API[NewsAPI.org<br/>Headlines]
    end

    subgraph Features["Smart Mirror Features"]
        MOTION[Motion Detection<br/>Server-side Analysis]
        AI_ANALYSIS[AI Outfit Analysis<br/>Weather-aware Feedback]
        PERSONALITIES[AI Personalities<br/>Snow White, Snoop, Nihilist]
        AUDIO[Audio System<br/>Pre-generated + TTS]
        DISPLAY[Smart Display<br/>Weather, Calendar, News]
        DEBUG[Debug Panel<br/>Ctrl+Shift+D Access]
    end

    subgraph Connections["System Connections"]
        WEBCAM -->|USB| RP
        RP -->|USB-C| MON
        MON -->|Behind| MIRROR
        FRAME -->|Houses All| Hardware
        PWR -->|Powers| RP
        PWR -->|Powers| MON
    end

    subgraph Processing["Data Processing"]
        RP -->|Serves| REACT
        RP -->|Runs| SERVER
        WEBCAM -->|Video Stream| MOTION
        MOTION -->|Triggers| AI_ANALYSIS
        AI_ANALYSIS -->|Calls| OPENAI
        AI_ANALYSIS -->|Calls| TTS
        SERVER -->|Fetches| WEATHER_API
        SERVER -->|Fetches| CALENDAR_API
        SERVER -->|Fetches| NEWS_API
        TTS -->|Audio| MON
        AUDIO -->|Pre-generated| MON
    end

    subgraph Interaction["User Interaction Flow"]
        USER[User Approaches] -->|Motion| MOTION
        MOTION -->|Immediate| AUDIO
        MOTION -->|Stabilize| AI_ANALYSIS
        AI_ANALYSIS -->|Response| DISPLAY
        AI_ANALYSIS -->|TTS| AUDIO
        AUDIO -->|Sendoff| USER
    end

    subgraph APIs["API Endpoints"]
        API1[POST /api/ai/automatic<br/>Motion-triggered Analysis]
        API2[GET /api/weather<br/>Current Weather]
        API3[GET /api/calendar/summary<br/>Calendar Events]
        API4[GET /api/news/headlines<br/>News Headlines]
        API5[GET /api/pre-generated-audio/*<br/>Audio Responses]
        API6[POST /api/tts/generate<br/>TTS Generation]
    end

    SERVER --> API1
    SERVER --> API2
    SERVER --> API3
    SERVER --> API4
    SERVER --> API5
    SERVER --> API6
```
