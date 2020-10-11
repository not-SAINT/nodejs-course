const uuid = require('uuid');

class Board {
  constructor({ id = uuid(), title = 'new board', columns = [] } = {}) {
    this.id = id;
    this.title = title;
    this.columns = [...columns];
  }

  static toResponse({ id, title, columns }) {
    return { id, title, columns };
  }
}

module.exports = Board;
