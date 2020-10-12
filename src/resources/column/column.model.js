const uuid = require('uuid');

class Column {
  constructor({ id = uuid(), title = 'new column', order = 1 } = {}) {
    this.id = id;
    this.title = title;
    this.order = order;
  }

  static toResponse({ id, title, order }) {
    return { id, title, order };
  }
}

module.exports = Column;
