// cross-origin resource sharing
const express = require("express");
const cors = require("cors");
const app = express();

// with it, we enable cors
// app.use(cors());

// alternatively we can block to certain origins
app.use(
  cors({
    origin: ["https://www.google.com"], // use this with google.com and
    // fetch("http://localhost:3000/").then(req => req.text()).then(console.log)
    // fetch("http://localhost:3000/",{method:'POST'}).then(req => req.text()).then(console.log)
    methods: "GET", // allowed methods
    // less important for now
    // allowedHeaders: ["Content-Type", "Authorization"],
    // exposedHeaders: ["Content-Type", "Authorization"],
    // credentials: true,
    // maxAge: 3600,
    // preflightContinue: true,
    // optionsSuccessStatus: 200,
  })
);

app.get("/", (req, res, next) => {
  res.json({ message: "CORS is activated" });
});

app.post("/", (req, res, next) => {
  res.json({ message: "POST" });
});

app.listen(3000, function () {
  console.log("CORS-enabled web server listening on port 3000");
});
