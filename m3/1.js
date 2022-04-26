const express = require("express");
const app = express();

// GET - http / REST API
// request - obiekt
// response - obiekt
app.get("/", (req, res) => {
  res.send("Hello World!");
});

// app.get("/contact", (req, res) => {
//   res.send("<h1>Contact page</h1>");
// });

// 0 or 1 raz
// app.get("/con?tact", (req, res) => {
//   res.send(`<h1>Contact page ?</h1> - ${req.originalUrl}`);
// });

// 1 lub więcej
// app.get("/con+tact", (req, res) => {
//   res.send(`<h1>Contact page + </h1> - ${req.originalUrl}`);
// });

// dowolny symbol
// http://localhost:3000/con432423tact - prawidłowa ścieżka
app.get("/con*tact", (req, res) => {
  res.send(`<h1>Contact page * </h1> - ${req.originalUrl}`);
});

app.listen(3000, () => {
  console.log("example app is listening");
});
