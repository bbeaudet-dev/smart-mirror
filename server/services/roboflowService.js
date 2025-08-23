const { detectObject } = require('roboflow');
const fs = require('fs');
const path = require('path');
const os = require('os');

/**
 * RoboflowService - Handles clothing detection using Roboflow API
 * 
 * This service integrates with Roboflow to detect clothing items in images
 * before sending them to OpenAI for enhanced outfit analysis.
 */
class RoboflowService {
  constructor() {
    // Using a pre-trained clothing detection model from Roboflow Universe
    // TODO: Replace with actual working model ID
    this.model = "clothing-detection-1"; // Placeholder - needs real model ID
    
    this.confidenceThreshold = 0.3;
    this.overlapThreshold = 0.5;
  }

  /**
   * Detect clothing items in an image
   * @param {Buffer} imageBuffer - Image buffer data
   * @returns {Promise<Array>} Array of detection results
   */
  async detectClothing(imageBuffer) {
    try {
      console.log('Starting Roboflow clothing detection...');
      
      if (!process.env.ROBOFLOW_API_KEY) {
        console.warn('ROBOFLOW_API_KEY not set, skipping detection');
        return [];
      }

      // Convert buffer to base64 string for Roboflow API
      const base64Image = imageBuffer.toString('base64');

      // Use the pre-trained clothing detection model
      const predictions = await detectObject(
        base64Image, // base64 image data
        this.model, // modelUrl
        process.env.ROBOFLOW_API_KEY, // apiKey
        {
          confidence: this.confidenceThreshold,
          overlap: this.overlapThreshold
        }
      );

      console.log('Roboflow predictions:', predictions);

      if (predictions && predictions.length > 0) {
        return predictions.map(pred => ({
          label: pred.class,
          confidence: pred.confidence,
          bbox: {
            x: pred.bbox.x,
            y: pred.bbox.y,
            width: pred.bbox.width,
            height: pred.bbox.height
          }
        }));
      } else {
        console.log('No predictions returned from Roboflow');
        return [];
      }
      
    } catch (error) {
      console.error('Roboflow detection failed:', error);
      return [];
    }
  }

  /**
   * Generate enhanced prompt using detected clothing items
   * @param {Array} detections - Array of detection results
   * @param {Object} weather - Weather data
   * @returns {string} Enhanced prompt for OpenAI
   */
  generateEnhancedPrompt(detections, weather) {
    if (!detections || detections.length === 0) {
      return `ROBOFLOW DETECTION: No clothing items detected. Please analyze this outfit considering it's ${weather.temperature}°F and ${weather.condition} today.`;
    }

    const detectedItems = detections.map(d => `${d.label} (${(d.confidence * 100).toFixed(0)}% confidence)`).join(", ");
    
    return `ROBOFLOW DETECTION: I detected the following clothing items: ${detectedItems}. 

Based on this Roboflow object detection analysis, please provide outfit feedback considering it's ${weather.temperature}°F and ${weather.condition} today.`;
  }
}

module.exports = RoboflowService;
