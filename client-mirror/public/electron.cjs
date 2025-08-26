const { app, BrowserWindow, Menu, screen, globalShortcut } = require('electron');
const path = require('path');
const isDev = require('electron-is-dev');

let mainWindow;

function createWindow() {
  // Get the primary display
  const primaryDisplay = screen.getPrimaryDisplay();
  const { width, height } = primaryDisplay.workAreaSize;

  // Create the browser window
  mainWindow = new BrowserWindow({
    width: width,
    height: height,
    x: 0,
    y: 0,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      enableRemoteModule: false,
      preload: path.join(__dirname, 'preload.js')
    },
    // Magic Mirror specific settings
    frame: false, // Remove window frame
    fullscreen: true, // Start in fullscreen
    alwaysOnTop: true, // Keep on top
    skipTaskbar: true, // Hide from taskbar
    show: false, // Don't show until ready
    backgroundColor: '#000000', // Black background
    // Disable window controls
    minimizable: false,
    maximizable: false,
    resizable: false,
    // Hide cursor
    titleBarStyle: 'hidden',
    // Prevent window from being closed
    closable: false
  });

  // Load the app
  const startUrl = isDev 
    ? 'http://localhost:3000' 
    : `file://${path.join(__dirname, '../build/index.html')}`;
  
  mainWindow.loadURL(startUrl);

  // Show window when ready
  mainWindow.once('ready-to-show', () => {
    mainWindow.show();
  });

  // Prevent window from being closed
  mainWindow.on('close', (event) => {
    event.preventDefault();
  });

  // Prevent new window creation
  mainWindow.webContents.setWindowOpenHandler(() => {
    return { action: 'deny' };
  });

  // Disable navigation
  mainWindow.webContents.on('will-navigate', (event) => {
    event.preventDefault();
  });

  // Disable new window creation
  mainWindow.webContents.on('new-window', (event) => {
    event.preventDefault();
  });

  // Handle keyboard shortcuts
  mainWindow.webContents.on('before-input-event', (event, input) => {
    // Allow Ctrl+Shift+I for developer tools in development
    if (isDev && input.control && input.shift && input.key.toLowerCase() === 'i') {
      return;
    }
    
    // Allow Ctrl+Q to quit
    if (input.control && input.key.toLowerCase() === 'q') {
      app.quit();
      return;
    }
    
    // Allow F11 for fullscreen toggle
    if (input.key === 'F11') {
      if (mainWindow.isFullScreen()) {
        mainWindow.setFullScreen(false);
      } else {
        mainWindow.setFullScreen(true);
      }
      return;
    }
    
    // Allow Escape to exit fullscreen
    if (input.key === 'Escape') {
      if (mainWindow.isFullScreen()) {
        mainWindow.setFullScreen(false);
      }
      return;
    }
    
    // Prevent all other keyboard input
    event.preventDefault();
  });

  // Open DevTools in development
  console.log('isDev:', isDev, 'NODE_ENV:', process.env.NODE_ENV);
  if (isDev) {
    console.log('Opening DevTools in development mode');
    mainWindow.webContents.openDevTools({ mode: 'detach' });
  } else {
    console.log('Running in production mode - no DevTools');
  }
}

// This method will be called when Electron has finished initialization
app.whenReady().then(() => {
  createWindow();

  // Register global shortcuts
  globalShortcut.register('CommandOrControl+Q', () => {
    app.quit();
  });

  // On macOS, re-create window when dock icon is clicked
  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

// Quit when all windows are closed, except on macOS
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

// Prevent multiple instances
const gotTheLock = app.requestSingleInstanceLock();
if (!gotTheLock) {
  app.quit();
} else {
  app.on('second-instance', () => {
    // Someone tried to run a second instance, focus our window instead
    if (mainWindow) {
      if (mainWindow.isMinimized()) mainWindow.restore();
      mainWindow.focus();
    }
  });
}

// Security: Prevent navigation to external URLs
app.on('web-contents-created', (event, contents) => {
  contents.on('will-navigate', (event, navigationUrl) => {
    const parsedUrl = new URL(navigationUrl);
    
    // Only allow navigation to localhost in development
    if (isDev && parsedUrl.hostname === 'localhost') {
      return;
    }
    
    // Prevent navigation to external URLs
    event.preventDefault();
  });
});

// Handle app quit
app.on('before-quit', () => {
  // Clean up any resources if needed
});
