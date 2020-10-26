const { NOT_FOUND } = require('http-status-codes');

const CustomError = require('../../common/errors');
const Column = require('../column/column.model');
const Board = require('./board.model');
const { deleteAllByBoardId } = require('../tasks/task.mongoDB.repository');

const getAll = async () => Board.find({});

const getById = async id => {
  const board = await Board.findById(id);

  if (!board) {
    throw new CustomError(NOT_FOUND, `The board with id = ${id} wasn't found.`);
  }

  return board;
};

const create = async boardData => {
  const { title } = boardData;

  const columns = boardData.columns
    ? boardData.columns.map(column => new Column(column))
    : [];

  return Board.create({ title, columns });
};

const deleteById = async id => {
  await deleteAllByBoardId(id);

  return Board.deleteOne({ _id: id });
};

const updateById = async (id, boardData) => {
  await Board.updateOne({ _id: id }, boardData);

  return getById(id);
};

module.exports = { getAll, getById, create, deleteById, updateById };
