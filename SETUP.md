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

- `VITE_API_URL`: URL where the server runs (default: http://localhost:5005)

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

3. **Test the AI integration**:

   ```bash
   cd server
   node test-ai.js
   ```

4. **Start the server**:

   ```bash
   npm run server:dev
   ```

5. **Start the client**:
   ```bash
   npm run client:dev
   ```

## Environment Variable Flow

```
Root .env → Client (Vite) → import.meta.env.VITE_*
Server .env → Server (Node.js) → process.env.*
```

## API Key Sources

- **OpenAI API Key**: https://platform.openai.com/account/api-keys
- **Weather API Key**: https://openweathermap.org/api (optional)
- **Google Calendar**: https://console.cloud.google.com/ (optional)

## Testing

- **AI Service Test**: `cd server && node test-ai.js`
- **API Endpoints Test**: `cd server && node test-api.js` (requires server running)
