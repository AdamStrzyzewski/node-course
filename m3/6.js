const express = require("express");
const app = express();

const routes = require("./6routes");

app.use("/api", routes);

app.listen(3000, () => {
  console.log("Example app listening on port 3000!");
});
