const DB = require('../../common/localDB');
const User = require('./user.model');

const getAll = async () => {
  return DB.users;
};

const getById = async userId => {
  return DB.users.filter(({ id }) => id === userId)[0];
};

const create = async userData => {
  const user = new User(userData);

  DB.users.push(user);

  return user;
};

const deleteById = async userId => {
  DB.users.filter(({ id }) => id !== userId);
};

const updateById = async (userId, userData) => {
  const index = DB.users.findIndex(({ id }) => id === userId);
  const updatedUser = { id: userId, ...userData };

  DB.users[index] = updatedUser;

  return updatedUser;
};

module.exports = { getAll, getById, create, deleteById, updateById };
