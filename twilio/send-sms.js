const config = require('../config/twilio')

const client = require("twilio")(config.twilio.accountSid, config.twilio.authToken);
client.messages.create({
    to: '',
    from: config.twilio.phoneNumber,
    body: 'Test'
  })
  .then((message) => console.log(message.status));