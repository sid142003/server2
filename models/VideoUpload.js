
const mongoose = require('mongoose');

const videoSchema = new mongoose.Schema({
    videoUrl: {
        type: String,
        required: true
    },
    organizer: {
        type: String, // Reference to Organizer
        required: true
    },
    eventId: {
        type: String, // Reference to Event
        required: true
    },

    uploadedAt: {
        type: Date,
        default: Date.now
    }
});

const Video = mongoose.model('Video', videoSchema);

module.exports = Video;