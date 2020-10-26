const { NOT_FOUND } = require('http-status-codes');

const CustomError = require('../../common/errors');
const Task = require('./task.model');

const getAll = async boardId => Task.find({ boardId }).exec();

const getById = async (id, boardId) => {
  const task = await Task.findOne({ _id: id, boardId });

  if (!task) {
    throw new CustomError(NOT_FOUND, `The task with id = ${id} wasn't found.`);
  }

  return task;
};

const create = async taskData => Task.create(taskData);

const deleteById = async id => Task.deleteOne({ _id: id });

const updateById = async (id, taskData) => {
  const { boardId } = taskData;

  await Task.updateOne({ _id: id }, taskData);

  return getById(id, boardId);
};

const deleteAllByBoardId = async boardId => Task.deleteMany({ boardId });

const unassignUserById = async userId =>
  Task.updateMany({ userId }, { userId: null });

module.exports = {
  getAll,
  getById,
  create,
  deleteById,
  updateById,
  deleteAllByBoardId,
  unassignUserById
};
