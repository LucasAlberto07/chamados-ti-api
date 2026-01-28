const path = require('path');
require('dotenv').config();

const storagePath = process.env.DATABASE_URL || path.join(__dirname, '..', 'database.sqlite');

module.exports = {
  development: {
    dialect: 'sqlite',
    storage: storagePath,
    logging: false,
  },
  test: {
    dialect: 'sqlite',
    storage: storagePath,
    logging: false,
  },
  production: {
    dialect: 'sqlite',
    storage: storagePath,
    logging: false,
  }
};
