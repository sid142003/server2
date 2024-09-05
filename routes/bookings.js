const express = require('express');
const router = express.Router();
const { createBooking, getUserBookings, getUserBookingsbyEventid } = require('../controllers/eventController');
const  authenticateToken= require('../middleware/auth'); // Middleware to check JWT token

// Post a booking
router.post('/create-booking',  authenticateToken, createBooking);

router.get('/mybookings/:eventId',  authenticateToken, getUserBookingsbyEventid);

// Get bookings for logged-in user
router.get('/mybookings',  authenticateToken, getUserBookings);

module.exports = router;
