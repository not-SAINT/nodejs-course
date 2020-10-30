const usersRepo = require('./user.mongoDB.repository');

const getAll = () => usersRepo.getAll();

const getById = id => usersRepo.getById(id);

const getByLogin = login => usersRepo.getByLogin(login);

const create = userData => usersRepo.create(userData);

const createAdmin = adminName => usersRepo.createAdmin(adminName);

const deleteById = id => usersRepo.deleteById(id);

const updateById = (id, userData) => usersRepo.updateById(id, userData);

module.exports = {
  getAll,
  getById,
  getByLogin,
  create,
  deleteById,
  updateById,
  createAdmin
};
