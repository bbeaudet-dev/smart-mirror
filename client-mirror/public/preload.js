import { contextBridge, ipcRenderer } from 'electron';

// Expose protected methods that allow the renderer process to use
// the ipcRenderer without exposing the entire object
contextBridge.exposeInMainWorld('electronAPI', {
  // Add any API methods you need here
  // For example:
  // sendMessage: (message) => ipcRenderer.send('message', message),
  // onMessage: (callback) => ipcRenderer.on('message', callback),
  
  // Platform info
  platform: process.platform,
  
  // App version
  version: process.versions.electron,
  
  // Check if running in Electron
  isElectron: true
});

// Remove menu bar in production
if (process.env.NODE_ENV === 'production') {
  // This will be handled by the main process
}
