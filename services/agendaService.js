const Agenda = require('agenda');
const { sendSMS } = require('../twilioClient');  // Adjust path as necessary

const mongoConnectionString = process.env.MONGODB_URI;  // Use the same MongoDB connection string from your .env

const agenda = new Agenda({db: {address: mongoConnectionString, collection: 'agendaJobs'}});

// Define a job for sending SMS notifications
agenda.define('send event reminder', async job => {
  const { phoneNumber, message } = job.attrs.data;
  sendSMS(phoneNumber, message);
});

// Start agenda
agenda.on('ready', async () => {
  await agenda.start();
  console.log('Agenda job scheduler started!');
});

async function scheduleEventReminder(phoneNumber, message, notificationTime) {
    await agenda.schedule(notificationTime, 'send event reminder', { phoneNumber, message });
    console.log(`Scheduled an event reminder for ${notificationTime}`);
  }

module.exports = { scheduleEventReminder };
