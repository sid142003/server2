// Initialize express router

const express = require('express');
const router = express.Router();
const {getVideos, uploadVideo} = require('../controllers/uploadVideoController');


router.post('/upload', uploadVideo);
router.get('/getVideo', getVideos);

module.exports = router;
