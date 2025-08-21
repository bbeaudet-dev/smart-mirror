import { useState, useEffect } from 'react';
import ApiClient from '../services/apiClient';
import LocationService from '../services/locationService';

/**
 * Custom hook for managing all Smart Mirror data
 * Handles location detection, data fetching, and state management
 */
export const useSmartMirrorData = () => {
  // Main data state
  const [data, setData] = useState({
    weather: null
  });

  // AI data state
  const [aiData, setAiData] = useState({
    motivation: null,
    outfitRecommendation: null
  });

  // UI state
  const [error, setError] = useState(null);
  const [aiLoading, setAiLoading] = useState(false);
  const [location, setLocation] = useState(null);
  const [isInitialLoad, setIsInitialLoad] = useState(true);
  const [refreshingStates, setRefreshingStates] = useState({
    weather: false
  });

  // Initialize location detection
  useEffect(() => {
    const initializeLocation = async () => {
      try {
        const detectedLocation = await LocationService.getLocationWithFallback();
        setLocation(detectedLocation);
      } catch (error) {
        console.error('Location detection failed:', error);
        const storedLocation = LocationService.getStoredLocation();
        setLocation(storedLocation);
      }
    };

    initializeLocation();
  }, []);

  // Fetch main data when location is available
  useEffect(() => {
    if (!location) return;

    const fetchData = async (dataType = 'all') => {
      try {
        setError(null);
        
        // Set refreshing state for specific data type
        if (dataType !== 'all') {
          setRefreshingStates(prev => ({ ...prev, [dataType]: true }));
        }
        
        const dailyData = await ApiClient.getDailySummary(location);
        setData(dailyData);
        
        // Mark initial load as complete
        if (isInitialLoad) {
          setIsInitialLoad(false);
        }
      } catch (error) {
        console.error('Failed to fetch data:', error);
        setError('Failed to load data');
      } finally {
        // Clear refreshing state
        if (dataType !== 'all') {
          setRefreshingStates(prev => ({ ...prev, [dataType]: false }));
        }
      }
    };

    // Initial load
    fetchData();

    // Auto-refresh data at appropriate intervals (stale while revalidate)
    const weatherInterval = setInterval(() => fetchData('weather'), 3 * 60 * 1000); // Weather every 3 minutes
    
    return () => {
      clearInterval(weatherInterval);
    };
  }, [location]);

  // Fetch AI data when weather data is available
  useEffect(() => {
    if (!data.weather || data.weather.error) return;

    const fetchAiData = async () => {
      try {
        setAiLoading(true);

        // Get current time of day
        const hour = new Date().getHours();
        const timeOfDay = hour < 5 ? 'night' : 
                         hour < 12 ? 'morning' : 
                         hour < 17 ? 'afternoon' : 
                         hour < 21 ? 'evening' : 'night';
        
        // Fetch motivation (daily or morning/evening based)
        const currentHour = new Date().getHours();
        const motivationTimeOfDay = currentHour < 12 ? 'morning' : 'evening';
        const motivationResponse = await ApiClient.getMotivation(motivationTimeOfDay, 'daily');
        
        // Fetch outfit recommendation using real weather data with time context
        let outfitResponse;
        if (data.weather && !data.weather.error && data.weather.current.temperature && data.weather.current.condition) {
          const currentHour = new Date().getHours();
          const recommendationType = currentHour >= 20 ? 'tomorrow' : 'current';
          
          outfitResponse = await ApiClient.getOutfitRecommendation(
            data.weather.current.temperature,
            data.weather.current.condition,
            timeOfDay,
            recommendationType,
            data.weather.forecast
          );
        } else {
          outfitResponse = { recommendation: 'Weather data unavailable for outfit recommendations' };
        }

        setAiData({
          motivation: motivationResponse.motivation,
          outfitRecommendation: outfitResponse.recommendation
        });
      } catch (error) {
        console.error('Failed to fetch AI data:', error);
        setAiData({
          motivation: 'Unable to load motivation',
          outfitRecommendation: 'Unable to load outfit recommendation'
        });
      } finally {
        setAiLoading(false);
      }
    };

    fetchAiData();

    // Only refresh AI data when weather changes significantly or time of day changes
    // This is handled by the dependency on data.weather, so we don't need a timer
  }, [data.weather, isInitialLoad]);

  return {
    data,
    aiData,
    isInitialLoad,
    error,
    aiLoading,
    location,
    refreshingStates
  };
};
