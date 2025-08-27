# Archived Prompts

This file contains prompts that were removed from the codebase but preserved for reference.

## Removed Routes (Major Cleanup)

### Chat & General Analysis

- `/api/ai/chat` - General AI conversation endpoint
- `/api/ai/analyze-image` - Generic image analysis with custom prompt
- `/api/ai/test-image` - Simple image description endpoint
- `/api/ai/analyze-outfit` - Basic outfit analysis endpoint

### Motivation Features

- `/api/ai/motivation` - Text-only motivation endpoint
- `/api/ai/motivate-with-image` - Image-based motivation endpoint

## Removed Prompts

### Text-Only Motivation

```javascript
// From promptService.js - generateMotivationPrompt()
"Give me a brief, encouraging ${timeOfDay} motivation message. Keep it under 100 words and make it feel personal and uplifting. Consider that this is for someone using a smart mirror.";
```

### Image-Based Motivation

```javascript
// From server/routes/ai.js - /motivate-with-image endpoint
"Look at this person and provide an encouraging, motivational message. Be positive, uplifting, and inspiring. Focus on their potential and encourage them to have a great day.";
```

### Basic Outfit Analysis

```javascript
// From server/routes/ai.js - /analyze-outfit endpoint
"Analyze this outfit and provide fashion advice. Consider the style, colors, and overall look. Be encouraging and constructive.";
```

### Generic Image Analysis

```javascript
// From promptService.js - generateGenericImagePrompt()
"Look at this image and provide a brief, general description of what you see. Focus on the main elements and overall scene.";
```

## Removed API Methods

- `getMotivation()` from ApiClient
- `motivateWithImage()` from ApiClient
- `testImage()` from ApiClient
- `analyzeOutfit()` from ApiClient
- `sendAiChat()` from ApiClient

## Removed Prompt Methods

- `generateMotivationPrompt()` from PromptService
- `generateGenericImagePrompt()` from PromptService

---
