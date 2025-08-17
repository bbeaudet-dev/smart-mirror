const express = require('express');
const dataService = require('../services/dataService');

const router = express.Router();

// GET /api/daily-summary - Returns comprehensive daily data
router.get('/daily-summary', async (req, res) => {
  try {
    const { location } = req.query;
    const summary = await dataService.getDailySummary(location);
    res.json({
      ...summary,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('Daily Summary Error:', error);
    res.status(500).json({ 
      error: 'Failed to fetch daily summary',
      message: error.message 
    });
  }
});

// GET /api/weather - Weather data only
router.get('/weather', async (req, res) => {
  try {
    const weather = await dataService.getWeather();
    res.json({
      weather,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('Weather Error:', error);
    res.status(500).json({ 
      error: 'Failed to fetch weather data',
      message: error.message 
    });
  }
});

// GET /api/calendar - Calendar events only
router.get('/calendar', async (req, res) => {
  try {
    const events = await dataService.getCalendarEvents();
    res.json({
      events,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('Calendar Error:', error);
    res.status(500).json({ 
      error: 'Failed to fetch calendar events',
      message: error.message 
    });
  }
});

// GET /api/routine/:type - Get routine by type (morning/evening)
router.get('/routine/:type', async (req, res) => {
  try {
    const { type } = req.params;
    const routine = await dataService.getRoutine(type);
    
    if (!routine) {
      return res.status(404).json({ error: 'Routine type not found' });
    }
    
    res.json({
      routine,
      type,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('Routine Error:', error);
    res.status(500).json({ 
      error: 'Failed to fetch routine',
      message: error.message 
    });
  }
});

// GET /api/news - News headlines only
router.get('/news', async (req, res) => {
  try {
    const news = await dataService.getNews();
    res.json({
      news,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('News Error:', error);
    res.status(500).json({ 
      error: 'Failed to fetch news',
      message: error.message 
    });
  }
});

// GET /api/horoscope - Horoscope data only
router.get('/horoscope', async (req, res) => {
  try {
    const horoscope = await dataService.getHoroscope();
    res.json({
      horoscope,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('Horoscope Error:', error);
    res.status(500).json({ 
      error: 'Failed to fetch horoscope',
      message: error.message 
    });
  }
});

// GET /api/outfit-suggestion - Get outfit suggestion based on weather
router.get('/outfit-suggestion', async (req, res) => {
  try {
    const { temperature, condition } = req.query;
    
    if (!temperature || !condition) {
      return res.status(400).json({ 
        error: 'Temperature and condition parameters are required',
        message: 'Both temperature and condition must be provided for outfit suggestions'
      });
    }
    
    const suggestion = await dataService.getOutfitSuggestion(
      parseInt(temperature),
      condition
    );
    
    res.json({
      suggestion,
      weather: { temperature: parseInt(temperature), condition },
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('Outfit Suggestion Error:', error);
    res.status(500).json({ 
      error: 'Failed to generate outfit suggestion',
      message: error.message 
    });
  }
});

// GET /api/weather/location - Update weather location
router.get('/weather/location', async (req, res) => {
  try {
    const { location } = req.query;
    if (!location) {
      return res.status(400).json({ error: 'Location parameter is required' });
    }
    
    const weather = await dataService.getWeather(location);
    res.json({
      weather,
      location,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('Weather Location Error:', error);
    res.status(500).json({ 
      error: 'Failed to fetch weather for location',
      message: error.message 
    });
  }
});

module.exports = router;
