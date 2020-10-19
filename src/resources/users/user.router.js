const router = require('express').Router();

const { asyncErrorHandler } = require('../../common/errorHandlers');
const User = require('./user.model');
const usersService = require('./user.service');

router.route('/').get(async (req, res) => {
  const users = await usersService.getAll();

  res.json(users.map(User.toResponse));
});

router.route('/:id').get(
  asyncErrorHandler(async (req, res) => {
    const { id } = req.params;
    const user = await usersService.getById(id);

    res.json(User.toResponse(user));
  })
);

router.route('/').post(async (req, res) => {
  const user = await usersService.create(req.body);

  res.json(User.toResponse(user));
});

router.route('/:id').delete(async (req, res) => {
  const { id } = req.params;

  await usersService.deleteById(id);

  res.json(`user is deleted with id = ${id}`);
});

router.route('/:id').put(async (req, res) => {
  const { id } = req.params;
  const { name, login, password } = req.body;
  const user = await usersService.updateById(id, { name, login, password });

  res.json(User.toResponse(user));
});

module.exports = router;
