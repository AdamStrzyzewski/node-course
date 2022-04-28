// cors cross-origin resource sharing
const express = require("express");
const cors = require("cors");
const app = express();

// open
// fetch("http://localhost:3000/").then(req => req.text()).then(console.log) - in chrome inspector
app.use(
  cors({
    origin: ["http://localhost:3000/"], // zdefiniować host/origin które mogą żądać
    // methods: "POST", // dozwolone metody
    // allowedHeaders: [] // nagłówki na które zezwalamy w żądaniu
    // exposedHeaders: [] // nagłówki na które zezwalamy żeby się w odpowiedzi
    // credentials // zgodzić sie na logowanie
  })
);

app.get("/", (req, res, next) => {
  res.json({ message: "CORS GET" });
});

app.post("/", (req, res, next) => {
  res.json({ message: "CORS POST" });
});

app.listen(3000, function () {
  console.log("CORS-enabled web server listening on port 3000");
});
