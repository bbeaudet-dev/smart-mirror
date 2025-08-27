const express = require('express');
const CalendarService = require('../services/calendarService');
const { getStoredTokens } = require('./auth');

const router = express.Router();

// Middleware to check authentication
const requireAuth = (req, res, next) => {
  const tokens = getStoredTokens();
  if (!tokens) {
    return res.status(401).json({ 
      error: 'Not authenticated', 
      message: 'Please connect your Google Calendar first' 
    });
  }
  
  // Set credentials for this request
  CalendarService.setCredentials(tokens);
  next();
};

// GET /api/calendar/today - Get today's events
router.get('/today', async (req, res) => {
  try {
    // Always return dummy data for demo
    const events = CalendarService.getDummyTodayEvents();
    res.json({
      events,
      count: events.length,
      date: new Date().toISOString().split('T')[0]
    });
  } catch (error) {
    console.error('Error fetching today\'s events:', error);
    res.status(500).json({ 
      error: 'Failed to fetch today\'s events',
      message: error.message 
    });
  }
});

// GET /api/calendar/tomorrow - Get tomorrow's events
router.get('/tomorrow', async (req, res) => {
  try {
    // Always return dummy data for demo
    const events = CalendarService.getDummyUpcomingEvents(1).filter(event => {
      const eventDate = new Date(event.start).toDateString();
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      return eventDate === tomorrow.toDateString();
    });
    res.json({
      events,
      count: events.length,
      date: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString().split('T')[0]
    });
  } catch (error) {
    console.error('Error fetching tomorrow\'s events:', error);
    res.status(500).json({ 
      error: 'Failed to fetch tomorrow\'s events',
      message: error.message 
    });
  }
});

// GET /api/calendar/next - Get next upcoming event
router.get('/next', async (req, res) => {
  try {
    // Always return dummy data for demo
    const event = CalendarService.getDummyNextEvent();
    res.json({
      event,
      hasNextEvent: !!event
    });
  } catch (error) {
    console.error('Error fetching next event:', error);
    res.status(500).json({ 
      error: 'Failed to fetch next event',
      message: error.message 
    });
  }
});

// GET /api/calendar/upcoming - Get upcoming events
router.get('/upcoming', requireAuth, async (req, res) => {
  try {
    const days = parseInt(req.query.days) || 7;
    const events = await CalendarService.getUpcomingEvents(days);
    res.json({
      events,
      count: events.length,
      days
    });
  } catch (error) {
    console.error('Error fetching upcoming events:', error);
    res.status(500).json({ 
      error: 'Failed to fetch upcoming events',
      message: error.message 
    });
  }
});

// GET /api/calendar/summary - Get calendar summary
router.get('/summary', async (req, res) => {
  try {
    // Always return dummy data for demo
    const todayEvents = CalendarService.getDummyTodayEvents();
    const tomorrowEvents = CalendarService.getDummyUpcomingEvents(1).filter(event => {
      const eventDate = new Date(event.start).toDateString();
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      return eventDate === tomorrow.toDateString();
    });
    const nextEvent = CalendarService.getDummyNextEvent();

    console.log('Today events (dummy):', todayEvents);
    console.log('Tomorrow events (dummy):', tomorrowEvents);
    console.log('Next event (dummy):', nextEvent);

    const now = new Date();
    const nextEventTime = nextEvent ? new Date(nextEvent.start) : null;
    const minutesUntilNext = nextEventTime ? 
      Math.round((nextEventTime - now) / (1000 * 60)) : null;

    const response = {
      todayEvents: todayEvents,
      todayCount: todayEvents.length,
      tomorrowEvents: tomorrowEvents,
      tomorrowCount: tomorrowEvents.length,
      nextEvent: nextEvent ? {
        ...nextEvent,
        minutesUntil: minutesUntilNext
      } : null,
      hasNextEvent: !!nextEvent,
      summary: {
        todayEvents: todayEvents.length,
        tomorrowEvents: tomorrowEvents.length,
        nextEventIn: minutesUntilNext ? `${minutesUntilNext} minutes` : null
      }
    };

    console.log('Calendar summary response (dummy):', response);
    res.json(response);
  } catch (error) {
    console.error('Error fetching calendar summary:', error);
    res.status(500).json({ 
      error: 'Failed to fetch calendar summary',
      message: error.message 
    });
  }
});

module.exports = router;
