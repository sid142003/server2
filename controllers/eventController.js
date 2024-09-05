const Event = require('../models/Event');
const Booking = require('../models/Booking');
const { scheduleEventReminder } = require('../services/agendaService');
const User = require('../models/User');
// Create Booking
exports.createBooking = async (req, res) => {
  console.log('Creating booking');
  try {
    const { eventId } = req.body;
    console.log('Creating booking for event:', eventId);
    const userId = req.user.id; // Assuming you have the user's ID from the authentication token
console.log('Creating booking for user:', userId);


    const event = await Event.findById(eventId);
    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const newBooking = new Booking({
      user: userId,
      event: eventId
    });

    await newBooking.save();

    // Schedule reminder for the user
    const notificationTime = new Date(event.startTime.getTime() - 5 * 60000);
    scheduleEventReminder(user.phone, `Reminder: Your booked event "${event.title}" is starting in 5 minutes.`, notificationTime);

    res.status(201).json({ message: 'Booking created', booking: newBooking });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
// Get Bookings for a User
exports.getUserBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ user: req.user.id }).populate('event');
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Existing create event functionality
exports.createEvent = async (req, res) => {
  try {
    const { title, description,imageUrl, startTime, endTime,viewerCode } = req.body;
    const organizer = req.user.id; // Assuming you have the user's ID from the authentication token
  
    const newEvent = new Event({ title, description,imageUrl, startTime, endTime,organizer,viewerCode});
    console.log('Saving new event:', newEvent);
    await newEvent.save();
    console.log('Event saved successfully');


    // Schedule a reminder 5 minutes before the event starts
    const notificationTime = new Date(new Date(startTime).getTime() - 5 * 60000);
    const organizerDetails = await User.findById(organizer);
    scheduleEventReminder(organizerDetails.phone, `Reminder: Your event "${title}" is starting in 5 minutes.`, notificationTime);

    res.status(201).send('Event created');
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getEvents = async (req, res) => {
  try {
    const events = await Event.find();
    console.log('Events:', events);
    res.json(events);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

exports.getEventsByEventId = async (req, res) => {
  try {
    const { eventId } = req.params;
    const event = await Event.findById(eventId);
    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }
    res.json(event);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}



exports.getUserBookingsbyEventid = async (req, res) => {
  const { eventId } = req.params;
    const userId = req.user.id; // Assuming user ID is correctly populated from authentication middleware
  try {
    
    
    // Check if the event exists
    const eventExists = await Event.exists({ _id: eventId });
    if (!eventExists) {
      return res.status(404).json({ message: "Event not found" });
    }

    // Check if the user exists
    const userExists = await User.exists({ _id: userId });
    if (!userExists) {
      return res.status(404).json({ message: "User not found" });
    }

    // Check if there is a booking for the event by this user
    const booking = await Booking.findOne({ user: userId, event: eventId });
    if (!booking) {
      // No booking found - not necessarily an error, so responding with 200 OK
      return res.status(200).json({ hasBooking: false });
    }

    // Booking found - returning success response with booking details
    res.status(200).json({ hasBooking: true, booking });
  } catch (error) {
    console.error(`Error fetching booking for user ${userId} and event ${eventId}:`, error);
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
};