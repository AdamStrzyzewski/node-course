const mongoose = require("mongoose");
const { Schema } = mongoose;

const task = new Schema(
  {
    title: {
      type: String,
      minlength: 2,
      maxlength: 70,
    },
    text: {
      type: String,
      minlength: 3,
      maxlength: 170,
    },
    isDone: {
      type: Boolean,
      default: false,
    },
    /**
     *  
        String
        Number
        Date
        Buffer
        Boolean
        Array
        Schema.Types.mixed <-> any
        Schema.Types.ObjectId
     */
  },
  {
    // __v
    versionKey: false,
    // createdAt -> timestamp
    // updatedAt -> timestamp
    timestamps: true,
  }
);

// model -> rozszerzenie kolekcja
const Task = mongoose.model("tasks", task);

module.exports = Task;
