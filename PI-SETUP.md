# Raspberry Pi Setup Guide

This guide will help you get the Smart Mirror React/Electron app running on your Raspberry Pi 5.

## Prerequisites

- Raspberry Pi 5 (8GB recommended) or Pi 4
- ARZOPA 16" portable monitor (or similar)
- Two-way acrylic panel (12"x18", 1/8" thick)
- Logitech C920 webcam (or similar USB webcam)
- Custom frame with mounting hardware
- Internet connection
- SSH access (recommended) or direct access to Pi
- Basic Linux command line knowledge

## Quick Start

### 1. Clone the Repository

```bash
git clone https://github.com/bbeaudet-dev/smart-mirror.git
cd smart-mirror
```

### 2. Install Dependencies

```bash
# Install root dependencies
npm install

# Install server dependencies
cd server && npm install

# Install client dependencies
cd ../client-mirror && npm install
```

### 3. Set Up Environment Variables

// TODO add a step here to show how to check if .env already exists

```bash
# Copy environment examples
cp env.example .env
cp server/env.example server/.env

# Edit the files with your API keys
nano .env
nano server/.env
```

**Important**: Use hostname instead of IP address in your `.env` files:

```env
# .env (root)
VITE_API_URL=http://raspberrypi:5005

# server/.env
OPENAI_API_KEY=your_openai_api_key
WEATHER_API_KEY=your_weather_api_key
NEWS_API_KEY=your_news_api_key
# GOOGLE_CLIENT_ID=your_google_client_id (temporarily disabled)
# GOOGLE_CLIENT_SECRET=your_google_client_secret (temporarily disabled)
```

### 4. Start the Application

```bash
# From root directory
npm run dev
```

### 5. Access Your Mirror

Open a web browser and go to: `http://raspberrypi:3000`

**Note**: Using the hostname `raspberrypi` instead of IP address prevents issues when the Pi's IP changes on reboot.

**If you get blocked or can't access from other devices**: You may need to update CORS settings in the server configuration. Check the server logs for CORS errors and ensure the server is configured to accept requests from your network.

## Manual Setup (if script doesn't work)

### 1. Update System

```bash
sudo apt update && sudo apt upgrade -y
```

### 2. Install Node.js

```bash
curl -fsSL https://deb.nodesource.com/setup_22.x | sudo -E bash -
sudo apt-get install -y nodejs
```

### 3. Verify Node.js Installation

```bash
node --version  # Should be 22.x or higher
npm --version
```

### 4. Install Dependencies

```bash
npm install
cd server && npm install
cd ../client-mirror && npm install
```

### 5. Create Environment Files

```bash
cp env.example .env
cp server/env.example server/.env
```

### 6. Edit Configuration

Edit the `.env` files to add your API keys:

```env
# .env (root)
VITE_API_URL=http://raspberrypi:5005

# server/.env
OPENAI_API_KEY=your_openai_api_key
WEATHER_API_KEY=your_weather_api_key
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
NEWS_API_KEY=your_news_api_key
```

### 7. Test the Application

```bash
# Start server
npm run server:dev

# In another terminal, start client
npm run client:dev
```

### 8. Build for Production

```bash
# Build the React app
npm run client:build

# Start production server
npm start
```

## Hardware Setup

### Monitor Connection

1. Connect ARZOPA monitor to Pi via USB-C (power and video)
2. Ensure monitor is detected: `xrandr --listmonitors`
3. Set appropriate resolution if needed
4. Configure monitor orientation for portrait mode:
   ```bash
   # Open Pi Screen Configuration
   sudo raspi-config
   # Navigate to: Display Options > Screen Configuration
   # Set orientation to: Portrait (90° or 270°)
   # Or use command line:
   xrandr --output HDMI-1 --rotate left  # or right for 270°
   ```

### Webcam Setup

1. Connect Logitech C920 webcam via USB
2. Test webcam: `lsusb | grep Logitech`
3. Verify video device: `ls /dev/video*`

### Mirror Assembly

1. Mount monitor in custom frame
2. Position two-way acrylic panel in front of monitor
3. Ensure proper lighting for webcam performance
4. Test motion detection and AI analysis

### Electron Interface Tips

- **Press Esc** while in Electron to make the taskbar appear
- Use Alt+F4 or Ctrl+Q to exit the application

## Verification Steps

### 1. Check if Services are Running

```bash
# Check if server is running
curl http://localhost:5005/api/health

# Check if client is running
curl http://localhost:3000
```

### 2. Test Web Access

```bash
# Test locally
curl http://localhost:3000

# Test from another device using hostname
curl http://raspberrypi:3000
```

### 3. Test Motion Detection

1. Open the mirror interface
2. Test motion detection by walking in front of the mirror
3. Verify AI analysis triggers correctly

### 4. Check Logs

```bash
# View server logs
tail -f server/logs/app.log

# Or check system logs
journalctl -u smart-mirror -f
```

## Troubleshooting

### Common Issues:

1. **IP Address Changes**

   **Problem**: Pi's IP address changes on reboot
   **Solution**: Use hostname `raspberrypi` instead of IP in `.env` files

2. **Port already in use**

   ```bash
   sudo lsof -i :5005  # Check server port
   sudo lsof -i :3000  # Check client port
   sudo kill -9 <PID>
   ```

3. **Permission denied**

   ```bash
   sudo chown -R $USER:$USER .
   ```

4. **Node.js version too old**

   ```bash
   node --version  # Should be 22.x or higher
   # If too old, reinstall Node.js
   ```

5. **Can't access from other devices**

   - Check your firewall settings
   - Make sure server is binding to `0.0.0.0`
   - Use hostname `raspberrypi` instead of IP

6. **API errors**

   - Check environment variables are set correctly
   - Verify API keys are valid
   - Check server logs for specific errors

7. **Motion detection not working**

   - Check webcam is connected and working
   - Adjust motion detection threshold and duration in `useMotionDetection.ts`
   - Verify lighting conditions

8. **Audio not playing**
   - Check HDMI audio is enabled
   - Verify pre-generated audio files exist
   - Test TTS generation manually

### Development and Debugging:

```bash
# Run in development mode
npm run dev

# Run server only
npm run server:dev

# Run client only
npm run client:dev

# View detailed logs
npm start 2>&1 | tee app.log
```

## Auto-Start Setup (Optional)

### Using PM2 (Recommended)

```bash
# Install PM2 globally
sudo npm install -g pm2

# Start the application with PM2
pm2 start npm --name "smart-mirror" -- run dev

# Save PM2 configuration
pm2 save

# Set PM2 to start on boot
pm2 startup
```

### Using systemd

```bash
# Create service file
sudo nano /etc/systemd/system/smart-mirror.service
```

Add this content:

```ini
[Unit]
Description=Smart Mirror
After=network.target

[Service]
Type=simple
User=pi
WorkingDirectory=/home/pi/smart-mirror
ExecStart=/usr/bin/npm start
Restart=on-failure
RestartSec=10

[Install]
WantedBy=multi-user.target
```

Then enable and start:

```bash
sudo systemctl enable smart-mirror
sudo systemctl start smart-mirror
```

## Features to Test

Once the basic mirror is working:

1. **Motion Detection** - Walk in front of mirror to trigger AI
2. **AI Analysis** - Verify outfit analysis with weather context
3. **Weather Display** - Check current weather data
4. **News Headlines** - Check latest news display
5. **Voice Responses** - Test text-to-speech functionality
6. **Debug Panel** - Access with `Ctrl+Shift+D` for testing

## API Endpoints

The mirror provides these endpoints:

- `POST /api/ai/automatic` - Motion-triggered outfit analysis
- `GET /api/weather` - Current weather data
- `GET /api/news/headlines` - News headlines
- `GET /api/pre-generated-audio/*` - Audio responses
- `POST /api/tts/generate` - TTS generation

## Support

- Check the project documentation in `docs/`
- Check the logs for error messages
- GitHub issues for this repository

## Files Created/Modified

- `.env` - Environment variables (created from env.example)
- `server/.env` - Server environment variables
- `PI-SETUP.md` - This guide
