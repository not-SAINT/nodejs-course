const fs = require('fs');
const util = require('util');

const errorHandler = (msg, exitCode = 1) => {
  const exit = process.exit;

  process.stderr.write(`\nError: ${msg}`);
  exit(exitCode);
};

const promisedFileAccess = util.promisify(fs.access);

const checkFileExists = async filePath => {
  await promisedFileAccess(filePath);

  return true;
};

module.exports = {
  errorHandler,
  checkFileExists
};
