const { Router } = require("express");

const router = Router();

router.get("/", (req, res) => {
  const { username } = req.user;
  res.json({ message: `You are authorized: ${username}` });
});

module.exports = router;
