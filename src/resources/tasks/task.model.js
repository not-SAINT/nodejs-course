const mongoose = require('mongoose');
const { Schema } = mongoose;

const Task = new Schema(
  {
    title: { type: String, default: 'new task' },
    order: { type: Number, default: 1 },
    description: { type: String, default: 'super task' },
    userId: { type: Schema.Types.ObjectId, ref: 'User' },
    boardId: { type: Schema.Types.ObjectId, ref: 'Board' },
    columnId: { type: String, default: null }
  },
  { collection: 'tasks', versionKey: false }
);

Task.statics.toResponse = ({
  id,
  title,
  order,
  description,
  userId,
  boardId,
  columnId
}) => {
  return { id, title, order, description, userId, boardId, columnId };
};

module.exports = mongoose.model('tasks', Task);
