// const { Router } = require("express");
// const route = Router();

const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.send("To główny endpoint");
});

router.get("/about", (req, res) => {
  res.send("About section");
});

module.exports = router;
