const jwt = require('jsonwebtoken');
const { UNAUTHORIZED, OK, FORBIDDEN } = require('http-status-codes');
const bcrypt = require('bcryptjs');

const { JWT_SECRET_KEY } = require('./config');
const { getByLogin } = require('../resources/users/user.service');

const getToken = req => {
  const { authorization } = req.headers;

  if (authorization) {
    const bearer = authorization.split(' ')[0];

    if (bearer === 'Bearer') {
      return authorization.split(' ')[1];
    }
  }

  return null;
};

const tokenCheck = async (req, res, next) => {
  const token = getToken(req);

  if (token) {
    try {
      await jwt.verify(token, JWT_SECRET_KEY);
    } catch {
      return res.sendStatus(UNAUTHORIZED);
    }

    return next();
  }

  res.sendStatus(UNAUTHORIZED);
};

const tryLogin = async (req, res) => {
  const { login, password } = req.body;

  if (!login || !password) {
    res.sendStatus(FORBIDDEN);
  }

  const { password: hash, _id } = await getByLogin(login);
  const isPassValid = await bcrypt.compare(password, hash);

  if (!isPassValid) {
    res.sendStatus(FORBIDDEN);
  }

  const payload = { login, _id };
  const token = jwt.sign(payload, JWT_SECRET_KEY);

  res.status(OK).send({ token });
};

module.exports = { tokenCheck, tryLogin };
