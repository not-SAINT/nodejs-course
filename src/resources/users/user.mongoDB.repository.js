const { NOT_FOUND, FORBIDDEN } = require('http-status-codes');
const bcrypt = require('bcryptjs');

const User = require('./user.model');
const { unassignUserById } = require('../tasks/task.mongoDB.repository');
const { SALT_SIZE } = require('../../common/config');
const CustomError = require('../../common/errors');

const getAll = () => User.find({});

const getById = async id => {
  const user = await User.findById(id);

  if (!user) {
    throw new CustomError(NOT_FOUND, `The user with id = ${id} wasn't found.`);
  }

  return user;
};

const getByLogin = async login => {
  const user = await User.findOne({ login });

  if (!user) {
    throw new CustomError(FORBIDDEN);
  }

  return user;
};

const create = async userData => {
  const { name, login, password } = userData;
  const hashedPass = await bcrypt.hash(password, SALT_SIZE);

  return User.create({ name, login, password: hashedPass });
};

const createAdmin = async adminName => {
  const hashedPass = await bcrypt.hash(adminName, SALT_SIZE);

  return await User.create({
    name: adminName,
    login: adminName,
    password: hashedPass
  });
};

const deleteById = async id => {
  await unassignUserById(id);

  return User.deleteOne({ _id: id });
};

const updateById = async (id, userData) => {
  const { password } = userData;
  const hashedPass = await bcrypt.hash(password, SALT_SIZE);

  await User.updateOne({ _id: id }, { ...userData, password: hashedPass });

  return getById(id);
};

module.exports = {
  getAll,
  getById,
  getByLogin,
  create,
  deleteById,
  updateById,
  createAdmin
};
