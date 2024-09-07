const Event = require('../models/Event');
const User = require('../models/User');
const Video = require('../models/VideoUpload');

// upload video
exports.uploadVideo = async (req, res) => {
  try {
    const {  videoUrl, organizer ,eventId } = req.body;
   
    const newVideo = new Video({ videoUrl, organizer ,eventId });
    console.log('Saving new video:', newVideo);
    await newVideo.save();
    console.log('Video saved successfully');
    res.status(201).json({ message: 'Video uploaded', video: newVideo });
    }
    catch (error) {
    res.status(500).json({ message: error.message });
    }

};

exports.getVideos = async (req, res) => {
  const { eventId } = req.query; // Use query instead of body to extract eventId
  if (!eventId) {
      return res.status(400).json({ message: "Event ID is required as a query parameter." });
  }

  try {
      const videos = await Video.find({ eventId }); // Query the database for videos with the given eventId
      res.json(videos);
  } catch (error) {
      console.error('Error fetching videos:', error);
      res.status(500).json({ message: error.message });
  }
};


