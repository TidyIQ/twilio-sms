require("dotenv").config();

const express = require("express");
const http = require("http");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));

/* Twilio client connection */
const ACCOUNT_SID = process.env.TWILIO_ACCOUNT_SID;
const AUTH_TOKEN = process.env.TWILIO_AUTH_TOKEN;
const MY_PHONE_NUMBER = process.env.MY_PHONE_NUMBER;

const client = require("twilio")(ACCOUNT_SID, AUTH_TOKEN);

/* Outbound SMS */
app.post("/send", (req, res) => {
  res.header("Content-Type", "application/json");
  client.messages
    .create({
      body: req.body.message,
      from: MY_PHONE_NUMBER,
      to: req.body.to
    })
    .then(resp => {
      console.log(resp);
      res.send(JSON.stringify({ error: false, message: "Success" }));
    })
    .catch(err => {
      console.log(err);
      res.send(JSON.stringify({ error: true, message: err.message }));
    });
});

/* Launch server */
http.createServer(app).listen(1337, () => {
  console.log("Express server listening on port 1337");
});
