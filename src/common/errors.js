const { getStatusText } = require('http-status-codes');

class CustomError extends Error {
  constructor(statusCode, message) {
    const customMessage = message ? `. ${message}` : '';

    super();
    this.statusCode = statusCode;
    this.message = `${getStatusText(statusCode)}${customMessage}`;
  }
}

module.exports = CustomError;
