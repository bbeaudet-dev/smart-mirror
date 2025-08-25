const express = require('express');
const TTSService = require('../services/ttsService');

const router = express.Router();
const ttsService = new TTSService();

/**
 * Generate speech from text
 * POST /api/tts/generate
 */
router.post('/generate', async (req, res) => {
  try {
    const { text, voice, personality } = req.body;

    if (!text) {
      return res.status(400).json({ error: 'Text is required' });
    }

    console.log(`TTS request: "${text.substring(0, 50)}..." with voice: ${voice || personality || 'default'}`);

    const result = await ttsService.generateSpeech(text, voice, personality);

    // Set response headers for audio
    res.set({
      'Content-Type': 'audio/opus',
      'Content-Length': result.audioBuffer.length,
      'Cache-Control': 'public, max-age=3600', // Cache for 1 hour
      'X-Voice': result.voice,
      'X-Cached': result.cached
    });

    res.send(result.audioBuffer);

  } catch (error) {
    console.error('TTS generation error:', error);
    res.status(500).json({ error: error.message });
  }
});

/**
 * Get available voices
 * GET /api/tts/voices
 */
router.get('/voices', (req, res) => {
  try {
    const voices = ttsService.getAvailableVoices();
    res.json({ voices });
  } catch (error) {
    console.error('Error getting voices:', error);
    res.status(500).json({ error: error.message });
  }
});

/**
 * Clear audio cache
 * DELETE /api/tts/cache
 */
router.delete('/cache', (req, res) => {
  try {
    ttsService.clearCache();
    res.json({ message: 'Audio cache cleared' });
  } catch (error) {
    console.error('Error clearing cache:', error);
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
