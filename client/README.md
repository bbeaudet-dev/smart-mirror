# Smart Mirror - React + Electron

A Magic Mirror-inspired smart mirror application built with React and Electron, featuring a clean, minimalist design with dark theme and white text.

## Features

- **Magic Mirror Styling**: Clean, minimalist design with black background and white text
- **Time Display**: Large, prominent time and date display
- **Weather Information**: Current weather and 3-day forecast
- **Calendar Integration**: Google Calendar events display
- **AI-Powered Features**:
  - Daily motivation messages
  - Weather-based outfit recommendations
- **Electron Desktop App**: Full-screen desktop application
- **Responsive Design**: Adapts to different screen sizes

## Prerequisites

- Node.js (v16 or higher)
- npm or yarn

## Installation

1. Install dependencies:

```bash
npm install
```

2. Install Electron dependencies:

```bash
npm install
```

## Development

### Web Development (React only)

```bash
npm start
```

This will start the React development server at `http://localhost:3000`

### Desktop Development (React + Electron)

```bash
npm run electron-dev
```

This will start both the React development server and Electron app simultaneously.

## Building

### Build for Web

```bash
npm run build
```

### Build Desktop App

```bash
npm run dist
```

This creates a distributable desktop application in the `dist` folder.

## Configuration

### Environment Variables

Create a `.env` file in the client directory with your API keys:

```env
REACT_APP_WEATHER_API_KEY=your_weather_api_key
REACT_APP_GOOGLE_CLIENT_ID=your_google_client_id
REACT_APP_OPENAI_API_KEY=your_openai_api_key
```

### Server Configuration

The app connects to a Node.js backend server. Make sure the server is running and configured properly.

## Electron Features

- **Full-screen Mode**: App starts in full-screen mode
- **Cursor Hidden**: Automatically hides the cursor
- **Always on Top**: Keeps the app window on top
- **No Window Controls**: Removes window frame and controls
- **Keyboard Shortcuts**:
  - `Ctrl+Q`: Quit the application
  - `F11`: Toggle fullscreen
  - `Escape`: Exit fullscreen
  - `Ctrl+Shift+I`: Open DevTools (development only)

## Magic Mirror Styling

The app uses Magic Mirror-inspired styling with:

- **Color Scheme**: Black background (#000) with white/gray text
- **Typography**: Roboto Condensed and Roboto fonts
- **Layout**: Clean, minimal design with proper spacing
- **CSS Variables**: Consistent theming throughout the app

## Project Structure

```
client/
├── public/
│   ├── electron.js          # Electron main process
│   ├── preload.js           # Electron preload script
│   └── index.html           # Main HTML file
├── src/
│   ├── components/          # React components
│   ├── hooks/              # Custom React hooks
│   ├── services/           # API services
│   ├── App.css             # Main styles with Magic Mirror theme
│   └── App.tsx             # Main React component
└── package.json            # Dependencies and scripts
```

## Troubleshooting

### Common Issues

1. **Electron won't start**: Make sure all dependencies are installed
2. **API errors**: Check your environment variables and server configuration
3. **Styling issues**: Ensure the Google Fonts are loading properly

### Development Tips

- Use `Ctrl+Shift+I` to open DevTools in development mode
- The app automatically hides the cursor - use `Ctrl+Q` to quit
- Check the browser console for any React errors

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License.
