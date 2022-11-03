require('dotenv').config();

const {
  NODE_ENV,
  PORT = 3000,
  DB_LINK = 'mongodb://localhost:27017/moviesdb',
  JWT_SECRET,
} = process.env;

module.exports = {
  DB_LINK,
  PORT,
  JWT_SECRET: NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret',
};
