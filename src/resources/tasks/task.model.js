const uuid = require('uuid');

class Task {
  constructor({
    id = uuid(),
    title = 'new task',
    order = 1,
    description = 'super task',
    userId = null,
    boardId = null,
    columnId = null
  } = {}) {
    this.id = id;
    this.title = title;
    this.order = order;
    this.description = description;
    this.userId = userId;
    this.boardId = boardId;
    this.columnId = columnId;
  }

  static toResponse({
    id,
    title,
    order,
    description,
    userId,
    boardId,
    columnId
  }) {
    return { id, title, order, description, userId, boardId, columnId };
  }
}

module.exports = Task;
