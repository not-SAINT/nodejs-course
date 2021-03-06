const { errorHandler } = require('./utils');

const checkArguments = async ({ shift, action }) => {
  if (isNaN(shift) && typeof shift === 'number') {
    errorHandler('argument "shift" is not number', 8);
  }

  if (shift === undefined) {
    errorHandler('argument "shift" is required', 8);
  }

  if (action === undefined) {
    errorHandler('argument "action" is required', 8);
  }

  if (action !== 'encode' && action !== 'decode') {
    errorHandler(
      'argument "action" has not valid value ["encode"|"decode"]',
      8
    );
  }
};

module.exports = checkArguments;
