const express = require("express");
const app = express();
const path = require("path");

// NOTE: bardzo ważna opcja, pozwala na przyjęcie argumentów z body wysłanych
// poprzez formularz HTML
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(express.static(path.join(__dirname, "public")));

app.put("/login", (req, res) => {
  res.json(req.body);
});

app.listen(3000, () => {
  console.log("Example app listening on port 3000!");
});
