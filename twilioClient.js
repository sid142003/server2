const twilio = require('twilio');
require('dotenv').config(); // Load environment variables from the .env file

// Make sure these environment variables are correctly defined
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;



// Validate that the SID and token are retrieved correctly
if (!accountSid || !authToken) {
  console.error('Twilio SID or Auth Token is missing or incorrect');
  process.exit(1); // Exit if credentials are not properly set
}

const client = new twilio(accountSid, authToken);

exports.sendSMS = (to, body) => {
  client.messages.create({
    body: body,
    to: to,  // Text this number
    from: process.env.TWILIO_PHONE_NUMBER // From a valid Twilio number
  })
  .then((message) => console.log(message.sid))
  .catch((error) => console.error("Failed to send SMS:", error)); // Enhanced error handling
};
