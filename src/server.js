const { PORT, MONGO_CONNECTION_STRING } = require('./common/config');
const app = require('./app');
const mongoose = require('mongoose');

const { logger } = require('./common/logger');
const { createAdmin } = require('./resources/users/user.service');

mongoose.connect(MONGO_CONNECTION_STRING, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const db = mongoose.connection;

db.dropDatabase();
createAdmin('admin');

db.on('error', ({ message }) => {
  logger.error(message);
});

db.once('open', () => {
  logger.info('DB opened.');
  app.listen(PORT, () =>
    logger.info(`App is running on http://localhost:${PORT}`)
  );
});
