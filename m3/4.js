const express = require("express");
const app = express();

app.use(express.urlencoded({ extended: false }));

// http://localhost:3000/contact/test@test.pl
// url param
app.get("/contact/:email", (req, res) => {
  const { email } = req.params;
  res.json({ email, email: encodeURIComponent(email) });
});

// http://localhost:3000/contact/test@test.pl/32423
// url params
app.get("/contact/:email/:id", (req, res) => {
  const { email, id } = req.params;
  res.json({ email, id });
});

// http://localhost:3000/contact?test=1&foo=teres
// http://localhost:3000/contact?email=te%26st%40test.pl // uri encoded email
// http://localhost:3000/contact?email=test&@test.pl // ostrożnie
// query params
app.get("/contact", (req, res) => {
  const { email, foo = 5 } = req.query;
  res.json({ email, foo });
});

// post
// put
// patch
// Insomnia REST client / Postman
// POST: localhost:3000/contact
// obsługi req.body
app.use(express.json());

app.post("/contact/:name", (req, res) => {
  const bodyName = req.body.name;
  const queryName = req.query.name;
  const paramsName = req.params.name;
  res.json({ bodyName, queryName, paramsName });
});

app.listen(3000, () => {
  console.log("Example app listening on port 3000!");
});

// delete - raczej nie przyjmuje body
