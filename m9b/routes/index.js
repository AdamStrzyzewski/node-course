const { Router } = require("express");
const User = require("../User");

const router = Router();

const helloWorld = (req, res) => {
  res.send("hello world");
};

const hello = (req, res) => {
  const name = req.params.name ?? "world";
  res.send(`hello ${name}!`);
};

router.get("/hello", helloWorld);
router.get("/hello/:name", hello);

// create a single user
router.post("/users", async (req, res) => {
  await User.create(req.body); // should be validated
  res.status(201).json({ message: "created" });
});

// list all users
router.get("/users", async (req, res) => {
  const users = await User.find({}).lean();
  res.json(users);
});

// delete all users
router.delete("/users", async (req, res) => {
  await User.deleteMany({});
  res.status(204).send();
});

module.exports = {
  helloWorld,
  hello,
  router,
};
