const { Router } = require("express");
const router = Router();
const authMiddleware = require("../middlewares/jwt");

router.use("/auth", require("./auth"));
router.use("/list", authMiddleware, require("./list"));

module.exports = router;
