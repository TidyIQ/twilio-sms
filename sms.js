const ACCOUNT_SID = process.env.TWILIO_ACCOUNT_SID;
const AUTH_TOKEN = process.env.TWILIO_AUTH_TOKEN;
const PHONE_NUMBER = process.env.TWILIO_NUMBER;

const client = require("twilio")(ACCOUNT_SID, AUTH_TOKEN);

client.messages
  .create({
    body: "New test",
    from: PHONE_NUMBER,
    to: "+61438828333"
  })
  .then(message => console.log(message.sid));
