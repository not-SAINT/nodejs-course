const mongoose = require('mongoose');
const { Schema } = mongoose;

const Board = new Schema(
  {
    title: { type: String, default: 'new board' },
    columns: [{ type: Object, default: [] }]
  },
  { collection: 'boards', versionKey: false }
);

Board.statics.toResponse = ({ id, title, columns }) => {
  return { id, title, columns };
};

module.exports = mongoose.model('boards', Board);
