import React, { useState, useEffect } from 'react';
import ApiClient from '../services/apiClient';

const DebugPanel: React.FC = () => {
  const [apiStatus, setApiStatus] = useState<string>('Checking...');
  const [weatherStatus, setWeatherStatus] = useState<string>('Checking...');
  const [aiStatus, setAiStatus] = useState<string>('Checking...');
  const [serverUrl, setServerUrl] = useState<string>('');

  useEffect(() => {
    const checkApiHealth = async () => {
      try {
        // Get the current API URL being used
        const url = import.meta.env.VITE_API_URL || 
          (window.location.hostname === 'localhost' ? 'http://localhost:5005' : `http://${window.location.hostname}:5005`);
        setServerUrl(url);

        // Test basic API health
        const healthResponse = await fetch(`${url}/api/health`);
        if (healthResponse.ok) {
          setApiStatus('✅ Connected');
        } else {
          setApiStatus(`❌ HTTP ${healthResponse.status}`);
        }
      } catch (error) {
        setApiStatus(`❌ Error: ${error.message}`);
      }
    };

    const checkWeather = async () => {
      try {
        const data = await ApiClient.getWeather();
        if (data && data.weather) {
          setWeatherStatus(`✅ Working (${data.weather.current.temperature}°F)`);
        } else {
          setWeatherStatus('❌ No weather data');
        }
      } catch (error) {
        setWeatherStatus(`❌ Error: ${error.message}`);
      }
    };

    const checkAI = async () => {
      try {
        // Test AI endpoint with a simple text request
        const response = await ApiClient.post('/api/ai/chat', {
          message: 'Hello',
          context: 'smart-mirror'
        });
        if (response && response.response) {
          setAiStatus('✅ Working');
        } else {
          setAiStatus('❌ No response');
        }
      } catch (error) {
        setAiStatus(`❌ Error: ${error.message}`);
      }
    };

    checkApiHealth();
    checkWeather();
    checkAI();
  }, []);

  return (
    <div className="fixed top-4 right-4 bg-black bg-opacity-80 text-white p-4 rounded-lg text-xs font-mono z-50">
      <h4 className="font-bold mb-2">Debug Info</h4>
      <div className="space-y-1">
        <div>Server: {serverUrl}</div>
        <div>API: {apiStatus}</div>
        <div>Weather: {weatherStatus}</div>
        <div>AI: {aiStatus}</div>
        <div>Location: {window.location.href}</div>
      </div>
    </div>
  );
};

export default DebugPanel;
