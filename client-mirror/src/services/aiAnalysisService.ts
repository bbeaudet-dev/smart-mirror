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
      
      // Use a more specific prompt that won't trigger safety filters
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
      
      // Use a confident, opinionated personality for weather outfit analysis
      const prompt = `Analyze this outfit considering the current weather. Respond like Donald Trump, or else a narcissist who has the mannerisms and tendencies of the current US president. Be entertaining and engaging, but also give genuinely helpful fashion advice. Consider the weather conditions and suggest improvements if needed.`;
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
      
      const prompt = "Analyze this outfit and provide fashion advice in the style of Snoop Dogg. Use his mannerisms, slang, and style - keep it real, use some 'izzle' language, but be encouraging and positive. Give genuine fashion advice while maintaining his personality.";
      const result = await ApiClient.analyzeImage(imageFile, prompt, 'ai-response');
      
      console.log("Snoop Dogg result:", result);
      return result as AiAnalysisResult;
    } catch (error) {
      console.error("Snoop Dogg analysis failed:", error);
      throw new Error("Snoop Dogg analysis failed. Please try again.");
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
