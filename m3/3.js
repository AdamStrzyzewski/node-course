const fs = require("fs").promises;
const express = require("express");
const app = express();

// middleware
app.use(async (req, res, next) => {
  if (req.originalUrl === "/1") {
    res.locals.randomNumber = Math.random();
    await fs.appendFile("log.txt", `${req.method} - url: ${req.originalUrl}\n`);
    next();
  } else {
    res.json({ message: "endpoint /2 is currently offline" });
  }
});

app.get("/1", (req, res) => {
  res.json({ path: 1, number: res.locals.randomNumber });
});

app.get("/2", (req, res) => {
  res.json({ path: 2 });
});

app.listen(3000, () => {
  console.log("Example app listening on port 3000!");
});

// autoryzacja / sprawdzenie autoryzacji
// obliczenia
// logowanie requestów
// obsługa błędów
