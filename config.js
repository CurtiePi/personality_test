require('dotenv').config();

const env = process.env.NODE_ENV;  // 'dev' or 'test'

const dev = {
  app: {
    port: parseInt(process.env.DEV_APP_PORT) || 3000
  },

  db: {
    host: process.env.DEV_DB_HOST || 'localhost',
    port: parseInt(process.env.DEV_DB_PORT) || 27017,
    name: process.env.DEV_DB_NAME || 'db'
  },
  data: {
    users: '/assets/dev_users.json',
    questions: '/assets/dev_questions.json'
  }
};

const test = {
  app: {
    port: parseInt(process.env.TEST_APP_PORT) || 3000
  },
  db: {
    host: process.env.TEST_DB_HOST || 'localhost',
    port: parseInt(process.env.TEST_DB_PORT) || 27107,
    name: process.env.TEST_DB_NAME || 'test'
  },
  data: {
    users: '/assets/test_users.json',
    questions: '/assets/test_questions.json'
  }
};

const config = {
  dev,
  test
};

module.exports = config[env];

