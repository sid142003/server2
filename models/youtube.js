const {google} = require('googleapis');

const youtubeModel = {
    createBroadcast: function(auth, broadcastDetails, callback) {
        const youtube = google.youtube({version: 'v3', auth});
        youtube.liveBroadcasts.insert({
            part: 'snippet,status',
            resource: broadcastDetails
        }, callback);
    },

    createStream: function(auth, streamDetails, callback) {
        const youtube = google.youtube({version: 'v3', auth});
        youtube.liveStreams.insert({
            part: 'snippet,cdn',
            resource: streamDetails
        }, callback);
    },

    bindBroadcastAndStream: function(auth, broadcastId, streamId, callback) {
        const youtube = google.youtube({version: 'v3', auth});
        youtube.liveBroadcasts.bind({
            part: 'id,contentDetails',
            id: broadcastId,
            streamId: streamId
        }, callback);
    }
};

module.exports = youtubeModel;
