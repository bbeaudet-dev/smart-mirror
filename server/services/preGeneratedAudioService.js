const fs = require('fs').promises;
const path = require('path');
const TTSService = require('./ttsService');

class PreGeneratedAudioService {
  constructor() {
    this.audioDir = path.join(__dirname, '../data/audio-pre-generated');
    this.motionResponses = [
      "Hey you! Over here!",
      "What do we have HERE?",
      "Look who decided to show up!",
      "Why hello there, come on in!",
      "Welcome, step right up!",
      "Let me take a look at YOU!",
      "Ahhh, a visitor. Come on in!",
      "Step into the spotlight!",
      "Time for your close-up!",
      "Look what the cat dragged in!",
      "What's this? A new face?",
      "I've been WAITING all day for you!",
      "You're finally here!",
      "Hey, you can't sneak past me that easily!",
      "Hey, you. Yes, you! Over here!",
      "Hello stranger! What brings you here?",
    ];
    
    this.welcomeResponses = [
      "Welcome to Fractal! Let me give you a Fit Check!",
      "Are you here for game night? Let me see your outfit!",
      "Why don't you pose for an outfit check?",
      "Time for a Fit Check.",
      "Are you down for a Fit Check?",
      "How about a personal Fit Check?",
      "Time for a vibe check! Pose for the camera!",
    ];

    this.sendoffResponses = [
      "Enjoy the event! Have an amazing time!",
      "Have a fantastic time tonight!",
      "See you later! Hope you have a wonderful time!",
      "Have fun at Game Night, You're going to love it!",
      "Enjoy yourself tonight! You're going to have a blast!",
      "Thanks for stopping by! Enjoy the event!",
      "Thanks for coming to see me! Have a wonderful time!",
    ];

    this.voices = ['ash', 'coral', 'alloy']; // Voices for pre-generated audio
    this.ttsService = new TTSService();
  }

  /**
   * Generate all pre-generated audio files
   */
  async generateAllAudio() {
    console.log('🎵 Generating pre-generated audio files...');
    
    try {
      // Ensure directory exists
      await fs.mkdir(this.audioDir, { recursive: true });

      // Clear existing audio files for regeneration
      console.log('🗑️  Clearing existing audio files...');
      const existingFiles = await fs.readdir(this.audioDir);
      for (const file of existingFiles) {
        if (file.endsWith('.mp3')) {
          await fs.unlink(path.join(this.audioDir, file));
          console.log(`🗑️  Deleted: ${file}`);
        }
      }

      // Generate motion response audio in all voices
      console.log('📢 Generating motion response audio...');
      for (let i = 0; i < this.motionResponses.length; i++) {
        const text = this.motionResponses[i];
        for (const voice of this.voices) {
          const filename = `motion_${i}_${voice}.mp3`;
          await this.generateAudioFile(text, filename, voice);
        }
      }

      // Generate welcome response audio in all voices
      console.log('👋 Generating welcome response audio...');
      for (let i = 0; i < this.welcomeResponses.length; i++) {
        const text = this.welcomeResponses[i];
        for (const voice of this.voices) {
          const filename = `welcome_${i}_${voice}.mp3`;
          await this.generateAudioFile(text, filename, voice);
        }
      }

      // Generate sendoff response audio in all voices
      console.log('👋 Generating sendoff response audio...');
      for (let i = 0; i < this.sendoffResponses.length; i++) {
        const text = this.sendoffResponses[i];
        for (const voice of this.voices) {
          const filename = `sendoff_${i}_${voice}.mp3`;
          await this.generateAudioFile(text, filename, voice);
        }
      }

      console.log('✅ All pre-generated audio files created successfully!');
    } catch (error) {
      console.error('❌ Error generating pre-generated audio:', error);
      throw error;
    }
  }

  /**
   * Generate a single audio file
   */
  async generateAudioFile(text, filename, voice) {
    const filepath = path.join(this.audioDir, filename);

    try {
      console.log(`🎤 Generating: "${text}" -> ${filename} (voice: ${voice})`);
      const result = await this.ttsService.generateSpeech(text, voice);
      
      // Save the audio buffer to file
      await fs.writeFile(filepath, result.audioBuffer);
      console.log(`✅ Generated: ${filename}`);
      
      return filepath;
    } catch (error) {
      console.error(`❌ Failed to generate ${filename}:`, error);
      throw error;
    }
  }

  /**
   * Get a random motion response audio file
   */
  async getRandomMotionAudio(voice) {
    const index = Math.floor(Math.random() * this.motionResponses.length);
    const filename = `motion_${index}_${voice}.mp3`;
    const filepath = path.join(this.audioDir, filename);
    
    try {
      await fs.access(filepath);
      return {
        filepath,
        text: this.motionResponses[index],
        type: 'motion',
        voice: voice
      };
    } catch {
      throw new Error(`Motion audio file not found: ${filename}`);
    }
  }

  /**
   * Get a random welcome response audio file
   */
  async getRandomWelcomeAudio(voice) {
    const index = Math.floor(Math.random() * this.welcomeResponses.length);
    const filename = `welcome_${index}_${voice}.mp3`;
    const filepath = path.join(this.audioDir, filename);
    
    try {
      await fs.access(filepath);
      return {
        filepath,
        text: this.welcomeResponses[index],
        type: 'welcome',
        voice: voice
      };
    } catch {
      throw new Error(`Welcome audio file not found: ${filename}`);
    }
  }

  /**
   * Get a random sendoff response audio file
   */
  async getRandomSendoffAudio(voice) {
    const index = Math.floor(Math.random() * this.sendoffResponses.length);
    const filename = `sendoff_${index}_${voice}.mp3`;
    const filepath = path.join(this.audioDir, filename);
    
    try {
      await fs.access(filepath);
      return {
        filepath,
        text: this.sendoffResponses[index],
        type: 'sendoff',
        voice: voice
      };
    } catch {
      throw new Error(`Sendoff audio file not found: ${filename}`);
    }
  }

  /**
   * Check if all pre-generated audio files exist
   */
  async checkAudioFiles() {
    const allFiles = [];
    
    // Check motion response files for all voices
    for (let i = 0; i < this.motionResponses.length; i++) {
      for (const voice of this.voices) {
        allFiles.push(`motion_${i}_${voice}.mp3`);
      }
    }
    
    // Check welcome response files for all voices
    for (let i = 0; i < this.welcomeResponses.length; i++) {
      for (const voice of this.voices) {
        allFiles.push(`welcome_${i}_${voice}.mp3`);
      }
    }

    // Check sendoff response files for all voices
    for (let i = 0; i < this.sendoffResponses.length; i++) {
      for (const voice of this.voices) {
        allFiles.push(`sendoff_${i}_${voice}.mp3`);
      }
    }

    const missingFiles = [];
    for (const filename of allFiles) {
      try {
        await fs.access(path.join(this.audioDir, filename));
      } catch {
        missingFiles.push(filename);
      }
    }

    return {
      total: allFiles.length,
      existing: allFiles.length - missingFiles.length,
      missing: missingFiles,
      isComplete: missingFiles.length === 0
    };
  }

  /**
   * Get all available responses for debugging
   */
  getAllResponses() {
    return {
      motion: this.motionResponses,
      welcome: this.welcomeResponses,
      sendoff: this.sendoffResponses
    };
  }

  /**
   * Get motion responses array
   */
  getMotionResponses() {
    return this.motionResponses;
  }

  /**
   * Get welcome responses array
   */
  getWelcomeResponses() {
    return this.welcomeResponses;
  }

  /**
   * Get sendoff responses array
   */
  getSendoffResponses() {
    return this.sendoffResponses;
  }
}

module.exports = new PreGeneratedAudioService();
