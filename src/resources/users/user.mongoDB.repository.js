const { NOT_FOUND } = require('http-status-codes');

const User = require('./user.model');
const { unassignUserById } = require('../tasks/task.mongoDB.repository');
const CustomError = require('../../common/errors');

const getAll = () => User.find({});

const getById = async id => {
  const user = await User.findById(id);

  if (!user) {
    throw new CustomError(NOT_FOUND, `The user with id = ${id} wasn't found.`);
  }

  return user;
};

const create = userData => {
  const { name, login, password } = userData;

  return User.create({ name, login, password });
};

const deleteById = async id => {
  await unassignUserById(id);

  return User.deleteOne({ _id: id });
};

const updateById = async (id, userData) => {
  await User.updateOne({ _id: id }, userData);

  return getById(id);
};

module.exports = { getAll, getById, create, deleteById, updateById };
