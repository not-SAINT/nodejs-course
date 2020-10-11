const DB = require('../../common/localDB');
const Board = require('./board.model');
const Column = require('../column/column.model');
const tasksRepo = require('../tasks/task.memory.repository');

const getAll = async () => {
  return DB.boards;
};

const getById = async boardId => {
  const board = DB.boards.filter(({ id }) => id === boardId)[0];

  if (!board) {
    throw new Error(`The board with id = ${boardId} wasn't found.`);
  }

  return board;
};

const create = async boardData => {
  const { title } = boardData;
  const columns = boardData.columns
    ? boardData.columns.map(column => new Column(column))
    : [];
  const board = new Board({ title, columns });

  DB.boards.push(board);

  return board;
};

const deleteById = async id => {
  await tasksRepo.deleteAllByBoardId(id);

  DB.boards = DB.boards.filter(({ id: boardId }) => boardId !== id);
};

const updateById = async (boardId, boardData) => {
  const index = DB.boards.findIndex(({ id }) => id === boardId);

  const { title } = boardData;
  const columns = boardData.columns
    ? boardData.columns.map(column => new Column(column))
    : [];
  const updatedBoard = new Board({ id: boardId, title, columns });

  DB.boards[index] = updatedBoard;

  return updatedBoard;
};

module.exports = { getAll, getById, create, deleteById, updateById };
