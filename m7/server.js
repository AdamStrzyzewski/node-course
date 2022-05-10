// JSON Web Token
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

// env variables
const { PORT: port = 3000, DB_HOST: dbURI } = process.env;

const app = express();
app.use(express.json());
app.use(cors());

require("./config/passport");

// /register
// /login
// /list
app.use("/api", require("./routes"));

const connection = mongoose.connect(dbURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

connection
  .then(() => {
    app.listen(port, function () {
      console.log(`Server running. Use our API on port: ${port}`);
    });
  })
  .catch((err) =>
    console.log(`Server not running. Error message: ${err.message}`)
  );

app.use((err, _, res, __) => {
  //   if (env === "dev") {
  console.log(err.stack);
  //   }
  res.status(500).json({
    message: err.message,
  });
});

// const jwt = require("jsonwebtoken");

// const payload = { id: 23423, username: "John" };
// const secret = "f3ijgoi3j$G#GRE";
// const token = jwt.sign(payload, secret, { expiresIn: "12h" });
// console.log("token", token);

// const decodedBody = jwt.decode(token);
// console.log(decodedBody);

// try {
//   const verify = jwt.verify(token, secret);
//   console.log("verify", verify);
// } catch (e) {
//   console.log(e);
// }
