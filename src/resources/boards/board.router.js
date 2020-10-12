const router = require('express').Router();

const Board = require('./board.model');
const boardService = require('./board.service');
const taskRouter = require('../tasks/task.router');

router.route('/').get(async (req, res) => {
  const boards = await boardService.getAll();

  res.json(boards.map(Board.toResponse));
});

router.route('/:id').get(async (req, res) => {
  try {
    const { id } = req.params;
    const board = await boardService.getById(id);

    res.json(Board.toResponse(board));
  } catch ({ message }) {
    res.status(404).send(message);
  }
});

router.route('/').post(async (req, res) => {
  const board = await boardService.create(req.body);

  res.json(Board.toResponse(board));
});

router.route('/:id').delete(async (req, res) => {
  const { id } = req.params;

  await boardService.deleteById(id);

  res.json(`board is deleted with id = ${id}`);
});

router.route('/:id').put(async (req, res) => {
  const { id } = req.params;
  const { title, columns } = req.body;
  const board = await boardService.updateById(id, { title, columns });

  res.json(Board.toResponse(board));
});

router.use('/:boardId/tasks', taskRouter);

module.exports = router;
