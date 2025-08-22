export class SpeechService {
  private voices: SpeechSynthesisVoice[] = [];
  private isEnabled: boolean = true;

  constructor() {
    this.loadVoices();
  }

  private loadVoices() {
    if (speechSynthesis.onvoiceschanged !== undefined) {
      speechSynthesis.onvoiceschanged = () => {
        this.voices = speechSynthesis.getVoices();
        console.log('Available voices:', this.voices.length);
      };
    }
  }

  /**
   * Speak text using the Web Speech API
   */
  speak(text: string) {
    if (!this.isEnabled || !text) {
      return;
    }

    // Cancel any currently speaking
    speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    
    // Set default voice properties
    utterance.rate = 0.9; // Slightly slower for clarity
    utterance.pitch = 1.0;
    utterance.volume = 0.8; // Good volume for mirror display

    // Try to use a good default voice
    const preferredVoices = this.voices.filter(voice => 
      voice.lang.startsWith('en') && 
      (voice.name.includes('Alex') || voice.name.includes('Samantha') || voice.name.includes('Google'))
    );
    
    if (preferredVoices.length > 0) {
      utterance.voice = preferredVoices[0];
    }

    console.log('Speaking:', text.substring(0, 50) + '...');
    speechSynthesis.speak(utterance);
  }

  /**
   * Stop any currently speaking
   */
  stop() {
    speechSynthesis.cancel();
  }

  /**
   * Enable or disable speech
   */
  setEnabled(enabled: boolean) {
    this.isEnabled = enabled;
    if (!enabled) {
      this.stop();
    }
  }

  /**
   * Check if speech is available
   */
  isAvailable(): boolean {
    return 'speechSynthesis' in window;
  }
}

// Export a singleton instance
export const speechService = new SpeechService();
