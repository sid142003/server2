const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  imageUrl: {
    type: String,
    required: true
  },
  startTime: {
    type: Date,
    required: true
  },
  endTime: {
    type: Date,
    required: true
  },
  organizer: {
    type: String,
    required: true
  },
  viewerCode: {
    type: String,
    required: true,
    unique: true // Ensures the code is unique across all events
  }
});

module.exports = mongoose.model('Event', eventSchema);
