const {
  Types: { ObjectId },
} = require("mongoose");
const Task = require("./schemas/tasks");

const getAllTasks = () => Task.find({}).lean();

const getSingleTask = (taskId) => {
  let objectIdTaskId;
  try {
    // map to ObjecId
    objectIdTaskId = ObjectId(taskId);
  } catch (e) {
    return null;
  }
  return Task.findById(objectIdTaskId).lean();
};

const createTask = ({ text, title }) => Task.create({ title, text });

const deleteTask = (taskId) => Task.findByIdAndRemove(taskId);

const updateTask = (taskId, taskToUpdate) =>
  Task.findByIdAndUpdate(
    taskId,
    { $set: taskToUpdate },
    {
      // do we want the state of the document from before or after operation
      new: true,
      // we select if we want to run mongoose validators from schema
      runValidators: true,
      // throw errors when payload has field from outside of schema
      strict: "throw",
    }
  );

module.exports = {
  getAllTasks,
  getSingleTask,
  createTask,
  deleteTask,
  updateTask,
};
