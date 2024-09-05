const express = require('express');
const router = express.Router();
const { createEvent, getEvents, getEventsByEventId } = require('../controllers/eventController');
const authenticateToken = require('../middleware/auth');

router.post('/create-event', authenticateToken , createEvent);
router.get('/get-events',  getEvents);
router.get('/get-event-by-eventid/:eventId', getEventsByEventId);


module.exports = router;
