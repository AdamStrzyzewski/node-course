const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();
app.use(express.json());
app.use(cors());

// api
const apiRouter = require("./api");
app.use("/api", apiRouter);

app.use((_, res, __) => {
  res.status(404).json({
    message: "Use api on routes: /api/tasks",
  });
});

// test, development/dev, staging, production
// NODE_ENV=dev npm run dev
const env = process.env.NODE_ENV;

app.use((err, _, res, __) => {
  if (env === "dev") {
    console.log(err.stack);
  }
  res.status(500).json({
    message: err.message,
  });
});

const uriDb = process.env.DB_URI;
const port = process.env.PORT;

const connection = mongoose.connect(uriDb, {
  // NOTE: mongoose 6^
  // mongo 5^
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

connection
  .then(() => {
    console.log("connected");
    app.listen(port, () => {
      console.log("express server is running");
    });
  })
  .catch((err) => {
    console.log("error with connection");
    process.exit(1);
  });
