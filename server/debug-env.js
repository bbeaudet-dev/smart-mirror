require('dotenv').config();

console.log('🔍 Debugging Environment Variables...\n');

console.log('Current working directory:', process.cwd());
console.log('NODE_ENV:', process.env.NODE_ENV);
console.log('PORT:', process.env.PORT);
console.log('OPENAI_API_KEY exists:', !!process.env.OPENAI_API_KEY);
console.log('OPENAI_API_KEY starts with:', process.env.OPENAI_API_KEY ? process.env.OPENAI_API_KEY.substring(0, 20) + '...' : 'NOT SET');

// Check if .env file exists
const fs = require('fs');
const path = require('path');
const envPath = path.join(__dirname, '.env');
console.log('.env file exists:', fs.existsSync(envPath));

if (fs.existsSync(envPath)) {
  const envContent = fs.readFileSync(envPath, 'utf8');
  const hasOpenAI = envContent.includes('OPENAI_API_KEY');
  console.log('.env contains OPENAI_API_KEY:', hasOpenAI);
}
