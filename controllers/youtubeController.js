const youtubeModel = require('../models/youtube'); 
const youtubeController = {
    handleAuth: function(auth, res) {
        const broadcastDetails = {
            snippet: {
                scheduledStartTime: '2024-01-30T00:00:00.000Z',
                title: 'New Live Event',
                description: 'This is a test broadcast.'
            },
            status: {
                privacyStatus: 'private',
            }
        };
        youtubeModel.createBroadcast(auth, broadcastDetails, (err, data) => {
            if (err) {
                console.error('Error creating broadcast:', err);
                return;
            }
            console.log('Broadcast created:', data);
            const streamDetails = {
                snippet: {
                    title: 'New Live Stream',
                    description: 'This is a test stream.'
                },
                cdn: {
                    frameRate: '30fps',
                    resolution: '720p',
                    ingestionType: 'rtmp'
                }
            };
            youtubeModel.createStream(auth, streamDetails, (err, data) => {
                if (err) {
                    console.error('Error creating stream:', err);
                    return;
                }
                console.log('Stream created:', data);
                youtubeModel.bindBroadcastAndStream(auth, data.data.id, data.data.id, (err, data) => {
                    if (err) {
                        console.error('Error binding broadcast and stream:', err);
                        return;
                    }
                    console.log('Broadcast and Stream bound successfully:', data);
                    res.send('Stream setup complete. You can close this tab.');
                });
            });
        });
    }
};

module.exports = youtubeController;
