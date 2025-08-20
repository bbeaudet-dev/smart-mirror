const express = require("express");
const router = express.Router();

// Health check endpoint for WebRTC service
router.get("/health", (req, res) => {
  res.json({ 
    status: "ok", 
    service: "webrtc",
    message: "WebRTC signaling service is running"
  });
});

// Get connection status
router.get("/status", (req, res) => {
  // TODO: This will be implemented when we have the WebRTC service instance
  res.json({ 
    status: "connected",
    activeConnections: 0 //TODO: Will be updated when we integrate with WebRTC service
  });
});

// FIXME: Manual frame capture trigger (for testing)
router.post("/capture-frame", (req, res) => {
  const { phoneId } = req.body;
  
  if (!phoneId) {
    return res.status(400).json({ error: "phoneId is required" });
  }

  // TODO: This will trigger frame capture for the specified phone
  // TODO: Will be implemented when we integrate with frame capture service
  console.log(`Manual frame capture requested for phone: ${phoneId}`);
  
  res.json({ 
    success: true, 
    message: `Frame capture triggered for phone ${phoneId}` 
  });
});

module.exports = router;
