const mongoose = require("mongoose");
const express = require("express");
const app = new express();

require("dotenv").config();

app.use(express.json());
app.use("/", require("./routes").router);

const connection = mongoose.connect(process.env.DB_SRV, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

connection
  .then(() => {
    app.listen(3000).on("listening", () => {
      console.log("runninng ", 3000);
    });
  })
  .catch((err) =>
    console.log(`Server not running. Error message: ${err.message}`)
  );
