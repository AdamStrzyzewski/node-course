const express = require("express");
const app = express();

app
  .route("/blog")
  .get((req, res) => {
    res.send("getting a list of blog entries");
  })
  .post((req, res) => {
    res.send("add a record blog");
  })
  .put((req, res) => {
    res.send("update blog entry");
  });

app.listen(3000, () => {
  console.log("Example app listening on port 3000!");
});
