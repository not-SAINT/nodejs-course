const router = require('express').Router({ mergeParams: true });

const { asyncErrorHandler } = require('../../common/errorHandlers');
const Task = require('./task.model');
const tasksService = require('./task.service');

router.route('/').get(
  asyncErrorHandler(async (req, res) => {
    const { boardId } = req.params;
    const tasks = await tasksService.getAll(boardId);

    res.json(tasks.map(Task.toResponse));
  })
);

router.route('/:id').get(
  asyncErrorHandler(async (req, res) => {
    const { boardId, id: taskId } = req.params;
    const task = await tasksService.getById(taskId, boardId);

    res.json(Task.toResponse(task));
  })
);

router.route('/').post(
  asyncErrorHandler(async (req, res) => {
    const { boardId } = req.params;
    const task = await tasksService.create({ ...req.body, boardId });

    res.json(Task.toResponse(task));
  })
);

router.route('/:id').delete(
  asyncErrorHandler(async (req, res) => {
    const { id: taskId } = req.params;

    await tasksService.deleteById(taskId);

    res.json(`task is deleted with id = ${taskId}`);
  })
);

router.route('/:id').put(
  asyncErrorHandler(async (req, res) => {
    const { id: taskId } = req.params;
    const task = await tasksService.updateById(taskId, { ...req.body });

    res.json(Task.toResponse(task));
  })
);

module.exports = router;
