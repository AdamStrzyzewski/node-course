const sgMail = require("@sendgrid/mail");
require("dotenv").config();

sgMail.setApiKey(process.env.SEND_GRID_API_KEY);

const emailConfig = {
  from: "adamstrzyzewski9001@gmail.com",
  to: "adasstrzyzewski@gmail.com",
  subject: "Test Send grid web api",
  text: "text content of our email",
  bcc: ["adam.strzyzewski9001@gmail.com"], // UDW // blind carbon copy
  cc: ["adamstrzyzewski9001+cc@gmail.com"], // DW // carbon copy
  html: "<strong>html content, should be bold</strong>",
  // adamstrzyzewski9001@gmail.com === adam.strzyzewski9001@gmail.com === a.d.a.m.strzyzewski9001@gmail.com
  // adamstrzyzewski9001+netflix@gmail.com
};

sgMail
  .send(emailConfig)
  .then((res) => {
    console.log(res);
  })
  .catch((err) => {
    console.log(err);
  });
