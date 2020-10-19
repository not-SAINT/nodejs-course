const expressWinston = require('express-winston');
const { createLogger, format, transports } = require('winston');
const { combine, timestamp, printf } = format;

const consoleFormat = printf(({ level, message, timestamp: time }) => {
  return `${time} ${level}: ${message}`;
});

const messageFormat = (req, res) => {
  const { method, url, query, body } = req;
  const { statusCode, responseTime } = res;

  return `${method} ${url} query = ${JSON.stringify(
    query
  )} body = ${JSON.stringify(body)} - ${statusCode} ${responseTime}ms`;
};

const options = {
  transports: [
    new transports.File({
      filename: './logs/errors.log',
      level: 'error',
      format: format.json()
    }),
    new transports.File({
      filename: './logs/combined.log',
      format: format.printf(
        info => `${new Date().toISOString()}, ${info.message}`
      )
    }),
    new transports.Console({
      format: combine(timestamp(), consoleFormat)
    })
  ],
  msg: messageFormat
};

const middlewareLogger = expressWinston.logger(options);
const logger = createLogger(options);

module.exports = { middlewareLogger, logger };
