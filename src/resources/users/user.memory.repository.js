const DB = require('../../common/localDB');
const User = require('./user.model');
const tasksRepo = require('../tasks/task.memory.repository');

const getAll = async () => {
  return DB.users;
};

const getById = async userId => {
  const user = DB.users.filter(({ id }) => id === userId)[0];

  if (!user) {
    throw new Error(`The user with id = ${userId} wasn't found.`);
  }

  return user;
};

const create = async userData => {
  const user = new User(userData);

  DB.users.push(user);

  return user;
};

const deleteById = async userId => {
  await tasksRepo.unassignUserById(userId);

  DB.users = DB.users.filter(({ id }) => id !== userId);
};

const updateById = async (userId, userData) => {
  const index = DB.users.findIndex(({ id }) => id === userId);
  const updatedUser = { id: userId, ...userData };

  DB.users[index] = updatedUser;

  return updatedUser;
};

module.exports = { getAll, getById, create, deleteById, updateById };
