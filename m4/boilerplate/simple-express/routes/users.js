const express = require("express");
const router = express.Router();

// hardcoded data set
const users = [
  { id: "1", username: "Felix", surname: "Brown", email: "felix@test.com" },
  { id: "2", username: "Sonya", surname: "Redhead", email: "sonya@test.com" },
  { id: "3", username: "Conan", surname: "Barbarian", email: "conan@test.com" },
];

/* GET users listing. */
router.get("/", function (req, res, next) {
  const { offset = 0, limit = 1 } = req.query;

  res.send(users.slice(offset, limit)); // refactor
});

router.get("/:id", function (req, res, next) {
  const { id } = req.params;
  const [user] = users.filter((el) => el.id === id);
  res.send(user);
});

module.exports = router;
