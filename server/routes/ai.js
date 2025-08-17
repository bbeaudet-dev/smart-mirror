const express = require('express');
const multer = require('multer');
const OpenAI = require('../services/openai');

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

    const response = await OpenAI.chat(message, context);
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

// POST /api/ai/analyze-image - Image analysis with OpenAI Vision
router.post('/analyze-image', upload.single('image'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'Image file is required' });
    }

    const { prompt, context = 'outfit-analysis' } = req.body;
    const imageBuffer = req.file.buffer;
    const imageType = req.file.mimetype;

    const analysis = await OpenAI.analyzeImage(imageBuffer, imageType, prompt, context);
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

// POST /api/ai/motivation - Get motivational message
router.post('/motivation', async (req, res) => {
  try {
    const { timeOfDay = 'morning', mood = 'neutral' } = req.body;
    
    const prompt = `Give me a brief, encouraging ${timeOfDay} motivation message. Keep it under 100 words and make it feel personal and uplifting. Consider that this is for someone using a smart mirror.`;
    
    const response = await OpenAI.chat(prompt, 'motivation');
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

// POST /api/ai/outfit-feedback - Specific outfit analysis
router.post('/outfit-feedback', upload.single('image'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'Image file is required' });
    }

    const { weather, occasion, style } = req.body;
    const imageBuffer = req.file.buffer;
    const imageType = req.file.mimetype;

    const prompt = `Analyze this outfit considering:
    - Weather: ${weather || 'unknown'}
    - Occasion: ${occasion || 'casual'}
    - Style preference: ${style || 'not specified'}
    
    Provide brief, friendly feedback on:
    1. How well it suits the weather
    2. Style suggestions
    3. Overall impression
    
    Keep it encouraging and under 150 words.`;

    const feedback = await OpenAI.analyzeImage(imageBuffer, imageType, prompt, 'outfit-feedback');
    res.json({ 
      feedback,
      weather,
      occasion,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('Outfit Feedback Error:', error);
    res.status(500).json({ 
      error: 'Failed to analyze outfit',
      message: error.message 
    });
  }
});

module.exports = router;
