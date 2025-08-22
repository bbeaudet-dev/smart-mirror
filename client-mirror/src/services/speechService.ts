export class SpeechService {
  private voices: SpeechSynthesisVoice[] = [];
  private isEnabled: boolean = true;
  private selectedVoice: SpeechSynthesisVoice | null = null;

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
    
    // Set better voice properties
    utterance.rate = 1.0; // Normal speed
    utterance.pitch = 1.0;
    utterance.volume = 0.9; // Good volume for mirror display

    // Use selected voice or try to use the best available voice
    if (this.selectedVoice) {
      utterance.voice = this.selectedVoice;
      console.log('Using selected voice:', this.selectedVoice.name);
    } else {
      const preferredVoices = this.voices.filter(voice => 
        voice.lang.startsWith('en') && 
        (voice.name.includes('Alex') || 
         voice.name.includes('Samantha') || 
         voice.name.includes('Google') ||
         voice.name.includes('Daniel') ||
         voice.name.includes('Victoria') ||
         voice.name.includes('Karen'))
      );
      
      if (preferredVoices.length > 0) {
        utterance.voice = preferredVoices[0];
        console.log('Using preferred voice:', preferredVoices[0].name);
      } else {
        console.log('Available voices:', this.voices.map(v => `${v.name} (${v.lang})`));
      }
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

  /**
   * Get list of available voices
   */
  getAvailableVoices(): SpeechSynthesisVoice[] {
    return this.voices;
  }

  /**
   * Set a specific voice by name
   */
  setVoice(voiceName: string) {
    const voice = this.voices.find(v => v.name === voiceName);
    if (voice) {
      this.selectedVoice = voice;
      console.log('Voice set to:', voice.name);
    } else {
      console.log('Voice not found:', voiceName);
      console.log('Available voices:', this.voices.map(v => v.name));
    }
  }
}

// Export a singleton instance
export const speechService = new SpeechService();
