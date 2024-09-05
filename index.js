const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const userRoutes = require('./routes/users');
const eventRoutes = require('./routes/events');
const bookingRoutes = require('./routes/bookings');
const youtubeRoutes = require('./routes/youtube');
const uploadVideoRoutes = require('./routes/uploadVideo');
const multer = require('multer');
const upload = multer({ storage: multer.memoryStorage() });
const AWS = require('aws-sdk');
const NodeMediaServer = require('node-media-server');
const PORT = process.env.PORT || 5000;
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json()); // For parsing application/json

AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION
});

const s3 = new AWS.S3();

app.post('/api/upload', upload.single('image'), async (req, res) => {
  const file = req.file;
  console.log('Uploading file:', file);
  const params = {
    Bucket: process.env.S3_BUCKET_NAME,
    Key: `uploads/${Date.now()}_${file.originalname}`,
    Body: file.buffer,
    ACL: 'public-read', // Set the ACL according to your security needs
    ContentType: file.mimetype
  };

  try {
    const data = await s3.upload(params).promise();
    console.log('File uploaded successfully:', data.Location);
    res.json({ url: data.Location });
  } catch (err) {
    console.error('Error in uploading file on s3 due to ', err);
    res.status(500).send('Failed to upload image');
  }
});

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.log(err));

app.use('/api/users', userRoutes);
app.use('/api/events', eventRoutes);
app.use('/api/bookings', bookingRoutes);
app.use('/api/youtube', youtubeRoutes);

app.use('/api/videoList',uploadVideoRoutes);



app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
