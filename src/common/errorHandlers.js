const { INTERNAL_SERVER_ERROR, getStatusText } = require('http-status-codes');

const CustomError = require('./errors');
const { logger } = require('./logger');

const uncaughtExceptionHandler = err => {
  logger.error(`Encaught exception: ${err.message}`);
};

const unhandledRejectionHandler = err => {
  logger.error(`Unhandled rejection: ${err.message}`);
};

const asyncErrorHandler = callback => async (req, res, next) => {
  try {
    return await callback(req, res, next);
  } catch (err) {
    return next(err);
  }
};

const errorHandler = (err, req, res) => {
  const { message } = err;

  logger.error(message);

  if (err instanceof CustomError) {
    const { statusCode } = err;

    return res.status(statusCode).send(message);
  }

  res.status(INTERNAL_SERVER_ERROR).send(getStatusText(INTERNAL_SERVER_ERROR));
};

module.exports = {
  uncaughtExceptionHandler,
  unhandledRejectionHandler,
  asyncErrorHandler,
  errorHandler
};
