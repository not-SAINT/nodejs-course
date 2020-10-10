const usersRepo = require('./user.memory.repository');

const getAll = () => usersRepo.getAll();

const getById = id => usersRepo.getById(id);

const create = userData => {
  return usersRepo.create(userData);
};

const deleteById = id => usersRepo.deleteById(id);

const updateById = (id, userData) => usersRepo.updateById(id, userData);

module.exports = { getAll, getById, create, deleteById, updateById };
