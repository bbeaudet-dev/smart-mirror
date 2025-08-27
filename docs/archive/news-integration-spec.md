# News Integration Specification

## Overview

Simple news feed integration using NewsAPI.org to display top headlines on the smart mirror.

## Features

- **Top Headlines**: Display 5 most recent top headlines from US news sources
- **Auto-refresh**: Updates every 15 minutes
- **Compact Display**: Shows headline title, source, and time ago
- **Error Handling**: Graceful fallback when API is unavailable

## Technical Implementation

### Backend

- **Service**: `server/services/newsService.js`
- **Routes**: `server/routes/news.js`
- **API Endpoints**:
  - `GET /api/news/headlines` - Get top headlines
  - `GET /api/news/category/:category` - Get news by category (future use)

### Frontend

- **Client**: `client-mirror/src/services/newsClient.js`
- **Component**: `client-mirror/src/components/modules/NewsPanel.tsx`
- **Position**: Right column, underneath calendar panel

### Environment Variables

- `NEWS_API_KEY` - NewsAPI.org API key

## API Configuration

1. Sign up at [NewsAPI.org](https://newsapi.org/)
2. Get free API key (100 requests/day)
3. Add `NEWS_API_KEY=your_key_here` to `.env` files

## Layout

- **Weather**: 30% width (left)
- **Blank Space**: 40% width (middle)
- **Calendar**: 30% width (right)
- **News**: 30% width (underneath calendar, right-aligned)

## Future Enhancements

- Category-based news (politics, tech, environment, gaming)
- News source filtering
- Clickable headlines (if touch interface added)
- News sentiment analysis
- Local news integration

## Rate Limits

- NewsAPI free tier: 100 requests/day
- Current usage: ~96 requests/day (4 requests/hour for 15-min refresh)
- Consider caching for production use
