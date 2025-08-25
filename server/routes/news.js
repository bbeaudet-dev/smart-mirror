const express = require('express');
const NewsService = require('../services/newsService');

const router = express.Router();

// GET /api/news/headlines - Get top headlines
router.get('/headlines', async (req, res) => {
  try {
    const count = parseInt(req.query.count) || 5;
    const headlines = await NewsService.getTopHeadlines(count);
    
    res.json({
      headlines,
      count: headlines.length,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('Error fetching headlines:', error);
    res.status(500).json({ 
      error: 'Failed to fetch headlines',
      message: error.message 
    });
  }
});

// GET /api/news/category/:category - Get news by category
router.get('/category/:category', async (req, res) => {
  try {
    const { category } = req.params;
    const count = parseInt(req.query.count) || 5;
    const headlines = await NewsService.getNewsByCategory(category, count);
    
    res.json({
      headlines,
      category,
      count: headlines.length,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error(`Error fetching ${req.params.category} news:`, error);
    res.status(500).json({ 
      error: `Failed to fetch ${req.params.category} news`,
      message: error.message 
    });
  }
});

module.exports = router;
