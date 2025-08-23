const express = require('express');
const multer = require('multer');
const OpenAIService = require('../services/openai');

const router = express.Router();

// Configure multer for image uploads
const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB limit
  },
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Only image files are allowed'), false);
    }
  },
});

// POST /api/ai/analyze-outfit-with-weather - Outfit analysis with weather context
router.post('/analyze-outfit-with-weather', upload.single('image'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'Image file is required' });
    }

    const imageBuffer = req.file.buffer;
    const imageType = req.file.mimetype;

    // Get weather data
    let weatherData = null;
    try {
      const WeatherService = require('../services/weatherService');
      const weatherService = new WeatherService();
      weatherData = await weatherService.getWeatherData();
      console.log('Weather data retrieved for outfit analysis:', weatherData);
    } catch (weatherError) {
      console.error('Failed to get weather data for outfit analysis:', weatherError);
      // Continue without weather data
    }

    // Use prompt service for weather-aware outfit analysis
    const PromptService = require('../services/promptService');
    const outfitPrompt = PromptService.generateWeatherAwareOutfitPrompt(weatherData);

    const analysis = await OpenAIService.analyzeImage(imageBuffer, imageType, outfitPrompt, 'outfit-analysis');
    res.json({ 
      analysis,
      weather: weatherData,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('Weather-Aware Outfit Analysis Error:', error);
    res.status(500).json({ 
      error: 'Failed to analyze outfit with weather',
      message: error.message 
    });
  }
});

// POST /api/ai/analyze-outfit - Basic outfit analysis
router.post('/analyze-outfit', upload.single('image'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'Image file is required' });
    }

    const imageBuffer = req.file.buffer;
    const imageType = req.file.mimetype;

    // Use prompt service for basic outfit analysis
    const PromptService = require('../services/promptService');
    const prompt = PromptService.generateOutfitAnalysisPrompt();
    const analysis = await OpenAIService.analyzeImage(imageBuffer, imageType, prompt, 'outfit-analysis');
    res.json({ 
      analysis,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('Outfit Analysis Error:', error);
    res.status(500).json({ 
      error: 'Failed to analyze outfit',
      message: error.message 
    });
  }
});

module.exports = router;
