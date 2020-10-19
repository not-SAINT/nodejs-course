const router = require('express').Router({ mergeParams: true });

const { asyncErrorHandler } = require('../../common/errorHandlers');
const User = require('./task.model');
const tasksService = require('./task.service');

router.route('/').get(async (req, res) => {
  const { boardId } = req.params;
  const tasks = await tasksService.getAll(boardId);

  res.json(tasks.map(User.toResponse));
});

router.route('/:id').get(
  asyncErrorHandler(async (req, res) => {
    const { boardId, id: taskId } = req.params;
    const task = await tasksService.getById(taskId, boardId);

    res.json(User.toResponse(task));
  })
);

router.route('/').post(async (req, res) => {
  const { boardId } = req.params;
  const task = await tasksService.create({ ...req.body, boardId });

  res.json(User.toResponse(task));
});

router.route('/:id').delete(async (req, res) => {
  const { id: taskId } = req.params;

  await tasksService.deleteById(taskId);

  res.json(`task is deleted with id = ${taskId}`);
});

router.route('/:id').put(async (req, res) => {
  const { id: taskId } = req.params;
  const task = await tasksService.updateById(taskId, { ...req.body });

  res.json(User.toResponse(task));
});

module.exports = router;
