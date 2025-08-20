require('dotenv').config();
const OpenAIService = require('./services/openai');

async function testAI() {
  console.log('🤖 Testing OpenAI Integration...\n');

  // Test 1: Check if API key is configured
  console.log('1. Checking API key configuration...');
  if (!OpenAIService.isConfigured()) {
    console.error('❌ OPENAI_API_KEY not found in environment variables');
    console.log('   Please add your OpenAI API key to server/.env');
    return;
  }
  console.log('✅ API key configured\n');

  // Test 2: Simple chat
  console.log('2. Testing basic chat...');
  try {
    const response = await OpenAIService.chat('Hello! I\'m testing my smart mirror. Can you give me a quick morning motivation?');
    console.log('✅ Chat response received:');
    console.log(`   "${response}"\n`);
  } catch (error) {
    console.error('❌ Chat test failed:', error.message);
    return;
  }

  // Test 3: Motivation generation
  console.log('3. Testing motivation generation...');
  try {
    const motivation = await OpenAIService.generateMotivation('morning', 'excited');
    console.log('✅ Motivation generated:');
    console.log(`   "${motivation}"\n`);
  } catch (error) {
    console.error('❌ Motivation test failed:', error.message);
    return;
  }

  // Test 4: Outfit recommendation
  console.log('4. Testing outfit recommendation...');
  try {
    const prompt = `It's 75°F and sunny today. I have a job interview. What should I wear?`;
    const outfit = await OpenAIService.chat(prompt, 'outfit-recommendation');
    console.log('✅ Outfit recommendation generated:');
    console.log(`   "${outfit}"\n`);
  } catch (error) {
    console.error('❌ Outfit recommendation test failed:', error.message);
    return;
  }

  console.log('🎉 All tests passed! Your OpenAI integration is working correctly.');
  console.log('\nNext steps:');
  console.log('1. Start the server: npm run server:dev');
  console.log('2. Test the API endpoints with curl or Postman');
  console.log('3. Move on to webcam integration');
}

// Run the test
testAI().catch(console.error);
