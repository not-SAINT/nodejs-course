const tasksRepo = require('./task.memory.repository');

const getAll = boardId => tasksRepo.getAll(boardId);

const getById = (taskId, boardId) => tasksRepo.getById(taskId, boardId);

const create = taskData => tasksRepo.create(taskData);

const deleteById = id => tasksRepo.deleteById(id);

const updateById = (id, taskData) => tasksRepo.updateById(id, taskData);

module.exports = { getAll, getById, create, deleteById, updateById };
