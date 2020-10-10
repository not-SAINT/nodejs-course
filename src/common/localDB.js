const User = require('../resources/users/user.model');

const DB = {
  boards: [],
  users: [],
  tasks: []
};

DB.users.push(new User(), new User());

module.exports = DB;
