const express = require('express');
const swaggerUI = require('swagger-ui-express');
const path = require('path');
const YAML = require('yamljs');
const { BAD_REQUEST } = require('http-status-codes');

const CustomError = require('./common/errors');
const userRouter = require('./resources/users/user.router');
const boardRouter = require('./resources/boards/board.router');
const { middlewareLogger } = require('./common/logger');
const {
  uncaughtExceptionHandler,
  unhandledRejectionHandler,
  errorHandler,
  asyncErrorHandler
} = require('./common/errorHandlers');
const { tokenCheck, tryLogin } = require('./common/authentication');

const app = express();
const swaggerDocument = YAML.load(path.join(__dirname, '../doc/api.yaml'));

app.use(express.json());

app.use(middlewareLogger);

app.use('/doc', swaggerUI.serve, swaggerUI.setup(swaggerDocument));

app.use('/', (req, res, next) => {
  if (req.originalUrl === '/') {
    res.send('Service is running!');
    return;
  }
  next();
});

app.post('/login', asyncErrorHandler(tryLogin));
app.use(asyncErrorHandler(tokenCheck));

app.use('/users', userRouter);
app.use('/boards', boardRouter);

app.all('*', () => {
  throw new CustomError(BAD_REQUEST);
});

app.use(errorHandler);

process.on('uncaughtException', uncaughtExceptionHandler);
process.on('unhandledRejection', unhandledRejectionHandler);

module.exports = app;
