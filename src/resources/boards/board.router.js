const router = require('express').Router();

const { asyncErrorHandler } = require('../../common/errorHandlers');
const Board = require('./board.model');
const boardService = require('./board.service');
const taskRouter = require('../tasks/task.router');

router.route('/').get(
  asyncErrorHandler(async (req, res) => {
    const boards = await boardService.getAll();

    res.json(boards.map(Board.toResponse));
  })
);

router.route('/:id').get(
  asyncErrorHandler(async (req, res) => {
    const { id } = req.params;
    const board = await boardService.getById(id);

    res.json(Board.toResponse(board));
  })
);

router.route('/').post(
  asyncErrorHandler(async (req, res) => {
    const board = await boardService.create(req.body);

    res.json(Board.toResponse(board));
  })
);

router.route('/:id').delete(
  asyncErrorHandler(async (req, res) => {
    const { id } = req.params;

    await boardService.deleteById(id);

    res.json(`board is deleted with id = ${id}`);
  })
);

router.route('/:id').put(
  asyncErrorHandler(async (req, res) => {
    const { id } = req.params;
    const { title, columns } = req.body;
    const board = await boardService.updateById(id, { title, columns });

    res.json(Board.toResponse(board));
  })
);

router.use('/:boardId/tasks', taskRouter);

module.exports = router;
