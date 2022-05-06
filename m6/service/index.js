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
  return Task.findOne({ _id: objectIdTaskId }).lean();
};

const createTask = ({ text, title }) => Task.create({ title, text });

const deleteTask = (taskId) => Task.deleteOne({ _id: taskId });

const updateTask = (taskId, taskToUpdate) =>
  Task.findOneAndUpdate(
    {
      _id: taskId,
    },
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
