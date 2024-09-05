const express = require('express');
const router = express.Router();
const {google} = require('googleapis');
const OAuth2 = google.auth.OAuth2;
const youtubeController = require('../controllers/youtubeController');



// router.get('/authenticate', (req, res) => {
//     console.log('authenticate   ');
//   const authorizationUrl = oauth2Client.generateAuthUrl({
//     access_type: 'offline',
//     scope: scopes
//   });
//   console.log('authorizationUrl   ',authorizationUrl);
//   res.redirect(authorizationUrl);
// });

// router.get('/events', async (req, res) => {
//     console.log('events   ',req.query.code);
//     if (req.query.code) { // Make sure 'code' is present in the query parameters
//         try {
//             const {tokens} = await oauth2Client.getToken(req.query.code);
//             oauth2Client.setCredentials(tokens);

//             // Here you can redirect to another page or handle the login success
//             res.redirect('/success'); // Redirect to a success page or another route
//         } catch (err) {
//             console.error("Failed to exchange code for tokens", err);
//             res.status(500).send("Authentication error");
//         }
//     } else {
//         res.status(400).send("No code in request");
//     }
// });

module.exports = router;
