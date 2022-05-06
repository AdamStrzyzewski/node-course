const service = require("../service");

const get = async (req, res, next) => {
  try {
    // dostać listę tasków
    const tasks = await service.getAllTasks();
    res.json(tasks);
  } catch (e) {
    // jeśli się nie uda to wyrzucić błąd
    next(e);
  }
};

const getOne = async (req, res, next) => {
  const { taskId } = req.params;
  try {
    // dostać pojedynczy task
    const task = await service.getSingleTask(taskId);
    // jeżeli task nie istnieje, to chcemy uzyskać błąd 404 - not found
    if (!task) {
      res.status(404).json({ message: "Task not found" });
    } else {
      res.json(task);
    }
  } catch (e) {
    // jeśli się nie uda to wyrzucić błąd
    next(e);
  }
};

const post = async (req, res, next) => {
  const { title, text } = req.body;
  // próbujemy utworzyć
  // jeśli się nie uda, to wyrzucamy błąd 400 - bad request / 422 unprocessable entity
  try {
    const result = await service.createTask({ title, text });
    res.status(201).json({ message: "Task was created", task: result });
  } catch (e) {
    next(e);
  }
};

const deleteTask = async (req, res, next) => {
  const { taskId } = req.params;
  await service.deleteTask(taskId);
  res.status(204).json();
};

const put = async (req, res, next) => {
  const { taskId } = req.params;
  const taskToUpdate = req.body;
  try {
    const result = await service.updateTask(taskId, taskToUpdate);
    if (!result) {
      res.status(404).json({ message: "Task not found" });
    } else {
      res.json({ message: "task was updated", task: result });
    }
  } catch (e) {
    next(e);
  }
};

const patchIsDone = async (req, res, next) => {
  const { taskId } = req.params;
  const { isDone = false } = req.body;
  try {
    const result = await service.updateTask(taskId, { isDone });
    if (!result) {
      res.status(404).json({ message: "Task not found" });
    } else {
      res.json({
        message: `task was patched to isDone = ${isDone}`,
        task: result,
      });
    }
  } catch (e) {
    next(e);
  }
};

module.exports = {
  get,
  getOne,
  post,
  deleteTask,
  put,
  patchIsDone,
};
