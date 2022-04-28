const express = require("express");
const router = express.Router();

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express", test: "123" });
});

router.post("/login", (req, res) => {
  const { email, password } = req.body;
  res.render("response", { title: "Simple express app", email, password });
});

module.exports = router;
