const { default: mongoose } = require("mongoose");

// Using models to save new todo into our database
const Schema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    isCompleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timeStamp: true,
  }
);

const TodoModel = mongoose.models.todo || mongoose.model("todo", Schema);

export default TodoModel;
