import ApiClient from './apiClient';

export interface AiAnalysisResult {
  analysis: string;
  weather?: {
    current?: {
      temperature: number;
      condition: string;
    };
    error?: string;
  };
}

export class AiAnalysisService {
  /**
   * Test AI analysis with a simple prompt
   */
  static async testImage(imageFile: File): Promise<AiAnalysisResult> {
    try {
      console.log("Testing AI analysis...");
      
      // Use a more general prompt that won't trigger safety filters
      const prompt = "Describe what you see in this image in a friendly, helpful way. Focus on the overall scene, colors, and general atmosphere.";
      const result = await ApiClient.analyzeImage(imageFile, prompt, 'ai-response');
      
      console.log("AI Analysis result:", result);
      return result as AiAnalysisResult;
    } catch (error) {
      console.error("AI Analysis failed:", error);
      throw new Error("AI analysis failed. Please try again.");
    }
  }

  /**
   * Analyze outfit with fashion advice
   */
  static async analyzeOutfit(imageFile: File): Promise<AiAnalysisResult> {
    try {
      console.log("Starting outfit analysis...");
      
      const prompt = "Analyze this outfit and provide fashion advice. Consider the style, colors, and overall look. Be encouraging and constructive.";
      const result = await ApiClient.analyzeImage(imageFile, prompt, 'outfit-analysis');
      
      console.log("Outfit Analysis result:", result);
      return result as AiAnalysisResult;
    } catch (error) {
      console.error("Outfit Analysis failed:", error);
      throw new Error("Outfit analysis failed. Please try again.");
    }
  }

  /**
   * Analyze outfit with weather context
   */
  static async analyzeOutfitWithWeather(imageFile: File): Promise<AiAnalysisResult> {
    try {
      console.log("Starting weather-aware outfit analysis...");
      
      // Use a critical, negative personality for weather outfit analysis
      const prompt = `Look at this image and analyze the clothing/outfit considering the current weather. Respond like a very critical and negative fashion expert who finds faults with everything. Be overly critical, find problems, and act superior. Make negative comments about the outfit while acting like you're the only one who knows fashion. Be entertaining but mean-spirited, focusing on what's wrong rather than what's right. Use phrases like "Tremendous" and "incredible", "Many people are saying...", "Believe me", "Nobody knows fashion better than me", "It's a disgrace", "It's a disaster", and use frequent superlatives ("the best," "the worst," "like never before"). Do not try to identify or recognize any specific person - just analyze the fashion choices.`;
      const result = await ApiClient.analyzeImage(imageFile, prompt, 'outfit-analysis');
      
      console.log("Weather-Aware Outfit Analysis result:", result);
      return result as AiAnalysisResult;
    } catch (error) {
      console.error("Weather-Aware Outfit Analysis failed:", error);
      throw new Error("Weather-aware outfit analysis failed. Please try again.");
    }
  }

  /**
   * Generate motivational message
   */
  static async generateMotivation(imageFile: File): Promise<AiAnalysisResult> {
    try {
      console.log("Generating motivational message...");
      
      const prompt = "Look at this person and provide an encouraging, motivational message. Be positive, uplifting, and inspiring. Focus on their potential and encourage them to have a great day.";
      const result = await ApiClient.analyzeImage(imageFile, prompt, 'motivation');
      
      console.log("Motivation result:", result);
      return result as AiAnalysisResult;
    } catch (error) {
      console.error("Motivation generation failed:", error);
      throw new Error("Motivation generation failed. Please try again.");
    }
  }

  /**
   * Generate Snoop Dogg style analysis
   */
  static async generateSnoopStyle(imageFile: File): Promise<AiAnalysisResult> {
    try {
      console.log("Generating Snoop Dogg style analysis...");
      
      const prompt = "Analyze this outfit and provide fashion advice in the style of Snoop Dogg. Use his mannerisms, slang, and style - keep it real, be encouraging and positive. Give genuine fashion advice while maintaining his personality.";
      const result = await ApiClient.analyzeImage(imageFile, prompt, 'ai-response');
      
      console.log("Snoop Dogg result:", result);
      return result as AiAnalysisResult;
    } catch (error) {
      console.error("Snoop Dogg analysis failed:", error);
      throw new Error("Snoop Dogg analysis failed. Please try again.");
    }
  }

  /**
   * Generate Snoop Dogg style analysis with weather context
   */
  static async generateSnoopWeather(imageFile: File): Promise<AiAnalysisResult> {
    try {
      console.log("Generating Snoop Dogg weather-aware analysis...");
      
      // Use the weather-aware endpoint that includes real weather data
      const result = await ApiClient.analyzeOutfitWithWeather(imageFile) as AiAnalysisResult;
      
      // Use the AI analysis directly
      let analysisText = result.analysis;
      
      console.log("Snoop Dogg Weather result:", result);
      return { ...result, analysis: analysisText } as AiAnalysisResult;
    } catch (error) {
      console.error("Snoop Dogg Weather analysis failed:", error);
      throw new Error("Snoop Dogg Weather analysis failed. Please try again.");
    }
  }

  /**
   * Format analysis result with weather info
   */
  static formatAnalysisWithWeather(result: AiAnalysisResult): string {
    let analysisText = result.analysis;
    
    if (result.weather && !result.weather.error) {
      const weather = result.weather.current;
      if (weather) {
        analysisText = `🌤️ Weather: ${weather.temperature}°F, ${weather.condition}\n\n${analysisText}`;
      }
    }
    
    return analysisText;
  }
}
