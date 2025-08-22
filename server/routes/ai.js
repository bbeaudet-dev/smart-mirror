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

// POST /api/ai/chat - General AI conversation
router.post('/chat', async (req, res) => {
  try {
    const { message, context = 'smart-mirror' } = req.body;
    
    if (!message) {
      return res.status(400).json({ error: 'Message is required' });
    }

    const response = await OpenAIService.chat(message, context);
    res.json({ 
      response,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('AI Chat Error:', error);
    res.status(500).json({ 
      error: 'Failed to process AI chat request',
      message: error.message 
    });
  }
});



// POST /api/ai/motivation - Get motivational message
router.post('/motivation', async (req, res) => {
  try {
    const { timeOfDay = 'morning', mood = 'neutral' } = req.body;
    
    const PromptService = require('../services/promptService');
    const prompt = PromptService.generateMotivationPrompt(timeOfDay, mood);
    
    const response = await OpenAIService.chat(prompt, 'motivation');
    res.json({ 
      motivation: response,
      timeOfDay,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('Motivation Error:', error);
    res.status(500).json({ 
      error: 'Failed to generate motivation',
      message: error.message 
    });
  }
});

// POST /api/ai/outfit-recommendation - Get AI-generated outfit recommendation
router.post('/outfit-recommendation', async (req, res) => {
  try {
    const { 
      temperature, 
      condition, 
      chanceOfRain, 
      location,
      timeOfDay,
      recommendationType,
      forecast
    } = req.body;
    
    if (!temperature || !condition) {
      return res.status(400).json({ 
        error: 'Temperature and condition are required',
        message: 'Both temperature and condition must be provided for outfit recommendations'
      });
    }
    
    const PromptService = require('../services/promptService');
    const prompt = PromptService.generateOutfitRecommendationPrompt({
      temperature,
      condition,
      chanceOfRain,
      location,
      timeOfDay,
      recommendationType,
      forecast
    });

    const recommendation = await OpenAIService.chat(prompt, 'outfit-recommendation');
    res.json({ 
      recommendation,
      weather: { 
        temperature, 
        condition, 
        chanceOfRain, 
        location,
        timeOfDay,
        recommendationType
      },
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('Outfit Recommendation Error:', error);
    res.status(500).json({ 
      error: 'Failed to generate outfit recommendation',
      message: error.message 
    });
  }
});

// POST /api/ai/analyze-image - Image analysis with OpenAI Vision
router.post('/analyze-image', upload.single('image'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'Image file is required' });
    }

    const { prompt, context = 'outfit-analysis' } = req.body;
    const imageBuffer = req.file.buffer;
    const imageType = req.file.mimetype;

    const analysis = await OpenAIService.analyzeImage(imageBuffer, imageType, prompt, context);
    res.json({ 
      analysis,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('Image Analysis Error:', error);
    res.status(500).json({ 
      error: 'Failed to analyze image',
      message: error.message 
    });
  }
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

    // Build weather-aware prompt
    let outfitPrompt = "Analyze this outfit and provide fashion advice. Consider the style, colors, and overall look. Be encouraging and constructive.";
    
    if (weatherData && !weatherData.error && weatherData.current) {
      const { temperature, condition } = weatherData.current;
      outfitPrompt = `Analyze this outfit considering it's ${temperature}°F and ${condition} today. Provide fashion advice that considers the weather - suggest if the outfit is appropriate for the temperature and conditions, and offer constructive suggestions. Be encouraging and helpful.`;
    }

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

// POST /api/ai/test-image - Simple image recognition test
router.post('/test-image', upload.single('image'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'Image file is required' });
    }

    const imageBuffer = req.file.buffer;
    const imageType = req.file.mimetype;

    // Simple test prompt - just identify what's in the image
    const testPrompt = "What do you see in this image? Please describe what the person is wearing in a brief. Respond in the voice and style of Donald Trump - be confident, use his typical phrases and mannerisms.";

    const analysis = await OpenAIService.analyzeImage(imageBuffer, imageType, testPrompt, 'smart-mirror');
    res.json({ 
      analysis,
      timestamp: new Date().toISOString(),
      test: true
    });
  } catch (error) {
    console.error('Test Image Analysis Error:', error);
    res.status(500).json({ 
      error: 'Failed to analyze test image',
      message: error.message 
    });
  }
});

module.exports = router;
