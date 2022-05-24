// https://app.sendgrid.com/guide
// https://app.sendgrid.com/guide/integrate

const nodemailer = require("nodemailer");

require("dotenv").config();

const auth = {
  user: process.env.SEND_GRID_USERNAME,
  pass: process.env.SEND_GRID_PASSWORD,
};

const client = nodemailer.createTransport({
  service: "SendGrid",
  auth,
});

const emailOptions = {
  from: "adamstrzyzewski9001@gmail.com",
  to: "adamstrzyzewski9001@gmail.com",
  subject: "Test nodemailer",
  text: "Cześć, to jest tekstowa zawartość",
};

client
  .sendMail(emailOptions)
  .then((info) => {
    console.log(info);
  })
  .catch((err) => {
    console.log(err);
  });
