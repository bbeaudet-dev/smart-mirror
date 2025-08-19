# Raspberry Pi Setup Guide

This guide will help you get the Smart Mirror React/Electron app running on your Raspberry Pi 5.

## Prerequisites

- Raspberry Pi 5 (or Pi 4)
- Internet connection
- SSH access (recommended) or direct access to Pi
- Basic Linux command line knowledge

## Quick Start

### 1. Clone the Repository

```bash
git clone <your-repo-url>
cd smart-mirror
```

### 2. Install Dependencies

```bash
# Install root dependencies
npm install

# Install server dependencies
cd server && npm install

# Install client dependencies
cd ../client && npm install
```

### 3. Set Up Environment Variables

```bash
# Copy environment examples
cp env.example .env
cp server/env.example server/.env

# Edit the files with your API keys
nano .env
nano server/.env
```

### 4. Start the Application

```bash
# From root directory
npm run dev
```

### 5. Access Your Mirror

Open a web browser and go to: `http://your-pi-ip:3000`

**To find your Pi's IP address:**

```bash
hostname -I
```

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
npm run install:all
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
REACT_APP_WEATHER_API_KEY=your_weather_api_key
REACT_APP_GOOGLE_CLIENT_ID=your_google_client_id
REACT_APP_OPENAI_API_KEY=your_openai_api_key

# server/.env
OPENAI_API_KEY=your_openai_api_key
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
WEATHER_API_KEY=your_weather_api_key
```

### 7. Test the Application

```bash
# Start server
npm run server:start

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

# Test from another device
curl http://your-pi-ip:3000
```

### 3. Check Logs

```bash
# View server logs
tail -f server/logs/app.log

# Or check system logs
journalctl -u smart-mirror -f
```

## Troubleshooting

### Common Issues:

1. **Port already in use**

   ```bash
   sudo lsof -i :5005  # Check server port
   sudo lsof -i :3000  # Check client port
   sudo kill -9 <PID>
   ```

2. **Permission denied**

   ```bash
   sudo chown -R $USER:$USER .
   ```

3. **Node.js version too old**

   ```bash
   node --version  # Should be 22.x or higher
   # If too old, reinstall Node.js
   ```

4. **Can't access from other devices**

   - Check your firewall settings
   - Make sure server is binding to `0.0.0.0`
   - Check Pi's IP address: `hostname -I`

5. **API errors**
   - Check environment variables are set correctly
   - Verify API keys are valid
   - Check server logs for specific errors

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

## Next Steps

Once the basic mirror is working:

1. **Test all features** - Make sure weather, calendar, AI features are working
2. **Customize appearance** - Edit CSS files in `client/src/`
3. **Set up auto-start** - Configure PM2 or systemd
4. **Hardware setup** - Connect display, mirror, etc.
5. **Remove mock data** - Replace all placeholder data with real APIs

## AI Features

The app includes:

1. **OpenAI Integration** - Outfit recommendations and motivational messages
2. **Weather Integration** - Real-time weather data
3. **Calendar Integration** - Google Calendar events
4. **News Integration** - Latest news headlines

## Support

- Check the project documentation in `docs/`
- Check the logs for error messages
- GitHub issues for this repository

## Files Created/Modified

- `.env` - Environment variables (created from env.example)
- `server/.env` - Server environment variables
- `PI-SETUP.md` - This guide
