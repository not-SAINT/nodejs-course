const boardsRepo = require('./board.memory.repository');

const getAll = () => boardsRepo.getAll();

const getById = id => boardsRepo.getById(id);

const create = boardData => boardsRepo.create(boardData);

const deleteById = id => boardsRepo.deleteById(id);

const updateById = (id, boardData) => boardsRepo.updateById(id, boardData);

module.exports = { getAll, getById, create, deleteById, updateById };
