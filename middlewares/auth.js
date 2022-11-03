require('dotenv').config();
const jwt = require('jsonwebtoken');
const AuthorizationError = require('../errors/authorization-err');
const { JWT_SECRET } = require('../utils/config');
const { AUTHORIZATION_ERR_MSG } = require('../utils/constants');

// const { NODE_ENV, JWT_SECRET } = process.env;

const auth = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization || !authorization.startsWith('Bearer ')) {
    throw new AuthorizationError(AUTHORIZATION_ERR_MSG);
  }
  const token = authorization.replace('Bearer ', '');
  let payload;

  try {
    payload = jwt.verify(token, JWT_SECRET);
  }
  catch (err) {
    throw new AuthorizationError(AUTHORIZATION_ERR_MSG);
  }
  req.user = payload;
  return next();
};

//   if (req.cookies.jwt) {
//     const token = req.cookies.jwt;
//     let payload;
//
//     try {
//       payload = jwt.verify(token, JWT_SECRET);
//     } catch (err) {
//       return next(new AuthorizationError('Необходима авторизация'));
//     }
//
//     req.user = payload;
//
//     next();
//   } else {
//     next(new AuthorizationError('Необходима авторизация'));
//   }
// };

module.exports = auth;
