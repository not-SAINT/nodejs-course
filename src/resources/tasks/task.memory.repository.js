const { NOT_FOUND } = require('http-status-codes');

const CustomError = require('../../common/errors');
const DB = require('../../common/localDB');
const Task = require('./task.model');

const getAll = async id => {
  return DB.tasks.filter(({ boardId }) => boardId === id);
};

const getById = async (taskId, boardId) => {
  const tasks = await getAll(boardId);
  const task = tasks.find(({ id }) => id === taskId);

  if (!task) {
    throw new CustomError(
      NOT_FOUND,
      `The task with id = ${taskId} wasn't found.`
    );
  }

  return task;
};

const create = async taskData => {
  const task = new Task(taskData);

  DB.tasks.push(task);

  return task;
};

const deleteById = async taskId => {
  DB.tasks = DB.tasks.filter(({ id }) => id !== taskId);
};

const updateById = async (taskId, taskData) => {
  const index = DB.tasks.findIndex(({ id }) => id === taskId);
  const updatedTask = { id: taskId, ...taskData };

  DB.tasks[index] = updatedTask;

  return updatedTask;
};

const deleteAllByBoardId = async id => {
  DB.tasks = DB.tasks.filter(({ boardId }) => boardId !== id);
};

const unassignUserById = async userId => {
  DB.tasks = DB.tasks.map(task =>
    task.userId === userId ? { ...task, userId: null } : task
  );
};

module.exports = {
  getAll,
  getById,
  create,
  deleteById,
  updateById,
  deleteAllByBoardId,
  unassignUserById
};
