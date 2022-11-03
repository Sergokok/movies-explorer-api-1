/* eslint-disable import/no-unresolved */
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/users');

// const AuthorizationError = require('../errors/authorization-err');
const BadRequestError = require('../errors/bad-request-err');
const ConflictError = require('../errors/conflict-err');
const NotFoundError = require('../errors/not-found-err');
// const ServerError = require('../errors/server-err');
const {
  BAD_REQUEST_ERR_MSG,
  CONFLICT_ERR_MSG,
  USER_NOT_FOUND_ERR_MSG,
} = require('../utils/constants');

const { JWT_SECRET, NODE_ENV } = process.env;

// POST / signin  — авторизация пользователя
module.exports.login = (req, res, next) => {
  const { email, password } = req.body;
  User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, NODE_ENV === 'production' ? JWT_SECRET : 'secret-key', { expiresIn: '7d' });
      res.send({ token });
    })
    .catch(next);
};

// GET /users/me — возвращает информацию о текущем пользователе
module.exports.getUser = (req, res, next) => {
  User.findById(req.user._id)
    .orFail(new NotFoundError(USER_NOT_FOUND_ERR_MSG))
    .then((user) => res.send(user))
    .catch(next);
};

// POST /signup регистрация пользователя
module.exports.createUser = (req, res, next) => {
  const {
    name, email, password,
  } = req.body;
  bcrypt.hash(password, 10)
    .then((hash) => User.create({
      name, email, password: hash,
    }))
    .then((user) => {
      res.send({
        _id: user._id,
        name: user.name,
        email: user.email,
      });
    })
    .catch((err) => {
      if (err.code === 11000) {
        next(new ConflictError(CONFLICT_ERR_MSG));
      } else if (err.name === 'ValidationError') {
        next(new BadRequestError(BAD_REQUEST_ERR_MSG));
      } else {
        next(err);
      }
    });
};

// PATCH /users/me — обновляет профиль пользователя
module.exports.updateUser = (req, res, next) => {
  const { name, email } = req.body;
  User.findByIdAndUpdate(req.user._id, { name, email }, { new: true, runValidators: true })
    .orFail(new NotFoundError(USER_NOT_FOUND_ERR_MSG))
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError(BAD_REQUEST_ERR_MSG));
      } else {
        next(err);
      }
    });
};
