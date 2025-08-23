const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const path = require('path');
require('dotenv').config();

const aiRoutes = require('./routes/ai');
const apiRoutes = require('./routes/api');
const { router: authRoutes } = require('./routes/auth');
const calendarRoutes = require('./routes/calendar');
const app = express();
const PORT = process.env.PORT || 5005;

// Create HTTP server for Socket.io
const http = require('http');
const server = http.createServer(app);

// Middleware
app.use(helmet());
app.use(morgan('combined'));
app.use(cors({
  origin: true, // Allow all origins for smart mirror
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'Content-Length']
}));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Routes
app.use('/api/ai', aiRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/calendar', calendarRoutes);
app.use('/api', apiRoutes);

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'healthy', 
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development'
  });
});

// Serve static files in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build')));
  
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/build', 'index.html'));
  });
}

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ 
    error: 'Something went wrong!',
    message: process.env.NODE_ENV === 'development' ? err.message : 'Internal server error'
  });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

// Start server
server.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 Smart Mirror Server running on port ${PORT}`);
  console.log(`📊 Health check:  http://localhost:${PORT}/api/health`);
  console.log(`🌍 Environment: ${process.env.NODE_ENV || 'development'}`);
  if (process.env.LOCAL_IP) {
    console.log(`\n🌐 Network Access:`);
    console.log(`   🪞 Mirror Interface: http://${process.env.LOCAL_IP}:3000/`);
    console.log(`   🔧 Server API:       http://${process.env.LOCAL_IP}:${PORT}/api/health`);
  }
});

module.exports = app;
