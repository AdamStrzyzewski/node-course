const express = require("express");
const router = express.Router();
const taskController = require("../controllers/tasks");

router.get("/tasks", taskController.get);
router.get("/tasks/:taskId", taskController.getOne);
router.post("/tasks", taskController.post);
router.put("/tasks/:taskId", taskController.put);
router.patch("/tasks/:taskId/isDone", taskController.patchIsDone);
router.delete("/tasks/:taskId", taskController.deleteTask);

module.exports = router;
