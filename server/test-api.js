const axios = require('axios');

const BASE_URL = 'http://localhost:5005/api';

async function testAPI() {
  console.log('🌐 Testing API Endpoints...\n');

  // Test 1: Health check
  console.log('1. Testing health check...');
  try {
    const health = await axios.get(`${BASE_URL}/health`);
    console.log('✅ Server is running:', health.data);
  } catch (error) {
    console.error('❌ Server not running. Start with: npm run server:dev');
    return;
  }

  // Test 2: AI Chat
  console.log('\n2. Testing AI chat...');
  try {
    const chatResponse = await axios.post(`${BASE_URL}/ai/chat`, {
      message: 'Hello! Give me a quick morning motivation for my smart mirror demo.',
      context: 'smart-mirror'
    });
    console.log('✅ Chat response:', chatResponse.data.response);
  } catch (error) {
    console.error('❌ Chat failed:', error.response?.data?.error || error.message);
  }

  // Test 3: Motivation
  console.log('\n3. Testing motivation...');
  try {
    const motivationResponse = await axios.post(`${BASE_URL}/ai/motivation`, {
      timeOfDay: 'morning',
      mood: 'excited'
    });
    console.log('✅ Motivation:', motivationResponse.data.motivation);
  } catch (error) {
    console.error('❌ Motivation failed:', error.response?.data?.error || error.message);
  }

  // Test 4: Outfit recommendation
  console.log('\n4. Testing outfit recommendation...');
  try {
    const outfitResponse = await axios.post(`${BASE_URL}/ai/outfit-recommendation`, {
      temperature: 75,
      condition: 'sunny',
      timeOfDay: 'morning',
      recommendationType: 'current'
    });
    console.log('✅ Outfit recommendation:', outfitResponse.data.recommendation);
  } catch (error) {
    console.error('❌ Outfit recommendation failed:', error.response?.data?.error || error.message);
  }

  console.log('\n🎉 API tests completed!');
}

testAPI().catch(console.error);
