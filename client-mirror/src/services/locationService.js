/**
 * Client-side Location Service
 * Handles geolocation and location management for the smart mirror
 */

class LocationService {
  /**
   * Get current location using browser geolocation
   * @returns {Promise<Object>} - Location data with coordinates
   */
  static async getCurrentLocation() {
    return new Promise((resolve, reject) => {
      if (!navigator.geolocation) {
        reject(new Error('Geolocation is not supported by this browser'));
        return;
      }

      navigator.geolocation.getCurrentPosition(
        (position) => {
          resolve({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            accuracy: position.coords.accuracy,
            timestamp: position.timestamp
          });
        },
        (error) => {
          console.error('Geolocation error:', error);
          reject(new Error(`Location error: ${error.message}`));
        },
        {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 300000 // 5 minutes
        }
      );
    });
  }

  /**
   * Convert coordinates to location string for weather API
   * @param {number} latitude - Latitude
   * @param {number} longitude - Longitude
   * @returns {string} - Location string
   */
  static coordinatesToLocation(latitude, longitude) {
    return `${latitude},${longitude}`;
  }

  /**
   * Get location from localStorage or return default
   * @returns {string} - Stored location or default
   */
  static getStoredLocation() {
    return localStorage.getItem('smartMirrorLocation') || 'New York, NY';
  }

  /**
   * Store location in localStorage
   * @param {string} location - Location to store
   */
  static storeLocation(location) {
    localStorage.setItem('smartMirrorLocation', location);
  }

  /**
   * Get location with fallback strategy
   * 1. Try geolocation
   * 2. Use stored location
   * 3. Use default location
   * @returns {Promise<string>} - Location string
   */
  static async getLocationWithFallback() {
    try {
      // Try to get current location
      const coords = await this.getCurrentLocation();
      const location = this.coordinatesToLocation(coords.latitude, coords.longitude);
      this.storeLocation(location);
      return location;
    } catch (error) {
      console.warn('Using fallback location:', error.message);
      // Use stored location or default
      return this.getStoredLocation();
    }
  }

  /**
   * Check if geolocation is available
   * @returns {boolean} - True if geolocation is supported
   */
  static isGeolocationSupported() {
    return !!navigator.geolocation;
  }

  /**
   * Get location permission status
   * @returns {Promise<string>} - Permission status
   */
  static async getLocationPermissionStatus() {
    if (!navigator.permissions) {
      return 'unknown';
    }
    
    try {
      const result = await navigator.permissions.query({ name: 'geolocation' });
      return result.state;
    } catch (error) {
      return 'unknown';
    }
  }
}

export default LocationService;
