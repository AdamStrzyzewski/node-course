// const { Router } = require("express");
// const route = Router();

const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.send("getting a list of blog entries");
});

router.post("/", (req, res) => {
  res.send("add a record blog");
});

router.put("/", (req, res) => {
  res.send("update blog entry");
});

module.exports = router;
