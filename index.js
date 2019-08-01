require("dotenv").config();

const express = require("express");
const http = require("http");
const MessagingResponse = require("twilio").twiml.MessagingResponse;

const app = express();

/* Inbound SMS route */
app.post("/sms", (req, res) => {
  const twiml = new MessagingResponse();

  twiml.message("The Robots are coming! Head for the hills!");

  res.writeHead(200, { "Content-Type": "text/xml" });
  res.end(twiml.toString());
});

/* Launch server */
http.createServer(app).listen(1337, () => {
  console.log("Express server listening on port 1337");
});
