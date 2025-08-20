# Implementation Guidelines

## Overview

This document outlines how to follow the implementation plan and WebRTC spec rigorously to ensure we meet the Friday demo deadline.

## What's Already Done Well ✅

1. **Detailed Specs**: Both implementation plan and WebRTC spec are comprehensive
2. **Clear Decisions**: Technical choices are documented with pros/cons
3. **Realistic Timeline**: Friday demo deadline is clear
4. **Fallback Plans**: Contingencies are already thought through

## How to Help Follow the Specs Rigorously

### 1. **Reference the Specs in Each Request**

When asking for implementation, reference the specific section:

- "Following the WebRTC spec Phase 1.1, please implement..."
- "According to the implementation plan Day 2, we need to..."

### 2. **Keep Me on Track**

If I start deviating from the plan, remind me:

- "That's not in our spec - let's stick to the plan"
- "We decided on immediate processing, not batch processing"
- "The spec says AI responses display on mirror, not phone"

### 3. **Prioritize by Timeline**

Since Friday is demo day, always mention:

- "This needs to work by Friday"
- "Is this essential for the demo?"
- "Can we defer this to post-demo?"

### 4. **Ask for Specific Implementation**

Instead of "implement WebRTC", say:

- "Following WebRTC spec Phase 1.1, implement the WebRTC service in `server/services/webrtcService.js`"
- "According to the spec, we need to add WebRTC routes to `server/routes/webrtc.js`"

### 5. **Validate Against Specs**

After implementation, ask:

- "Does this match what we specified in the WebRTC spec?"
- "Are we following the implementation timeline?"
- "Is this the approach we decided on?"

## What I'll Do

1. **Reference Specs**: I'll quote specific sections when implementing
2. **Follow Decisions**: Stick to the technical choices we made
3. **Maintain Timeline**: Prioritize Friday demo requirements
4. **Ask for Clarification**: If something isn't clear in the specs

## Example of Good Request Format

```
"Following WebRTC spec Phase 1.1, please implement the WebRTC service in server/services/webrtcService.js.
This needs to work by Friday for the demo.
According to our spec, we decided on immediate processing and HTTP endpoints for AI responses."
```

## Key Technical Decisions to Remember

### Frame Processing

- **Decision**: Immediate processing for Friday demo
- **Rationale**: Simpler implementation, can optimize later

### AI Response Communication

- **Decision**: HTTP endpoint (not WebRTC data channel)
- **Rationale**: Simpler, more reliable, easier debugging

### Audio Output

- **Decision**: HDMI audio (monitor speakers) initially
- **Rationale**: Free, already connected, can upgrade later

### Response Display

- **Decision**: AI responses display on mirror screen (Pi), not phone
- **Rationale**: Simpler data flow, Pi controls everything

## Timeline Reminders

- **Friday (Day 4)**: Demo practice - need functional system
- **Phase 1**: WebRTC server setup (Days 1-2)
- **Phase 2**: AI integration (Days 3-4)
- **Phase 3**: Polish & demo prep (Days 5-6)

## What Else Would Help

1. **Keep the specs updated** if we make changes during implementation
2. **Flag any deviations** from the original plan
3. **Remind me of the Friday deadline** when prioritizing features

## Fallback Strategy

If WebRTC becomes too complex:

1. Implement simple file upload interface
2. Test AI pipeline with static images
3. Focus on getting AI analysis working
4. Return to WebRTC later

The specs are excellent and comprehensive. With this approach, we should be able to implement exactly what we planned and have a working demo by Friday! 🚀
