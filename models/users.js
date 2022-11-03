const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const { isEmail } = require('validator');
const AuthorizationError = require('../errors/authorization-err');
const { INVALID_USER_DATA_ERR_MSG, INVALID_EMAIL_ERR_MSG } = require('../utils/constants');

// eslint-disable-next-line import/no-unresolved
// const validator = require('validator');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: (v) => isEmail(v),
      message: INVALID_EMAIL_ERR_MSG,
    },
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
});

userSchema.statics.findUserByCredentials = function findUserByCredentials(email, password) {
  return this.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        return Promise.reject(new AuthorizationError(INVALID_USER_DATA_ERR_MSG));
      }

      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            return Promise.reject(new AuthorizationError(INVALID_USER_DATA_ERR_MSG));
          }

          return user;
        });
    });
};

module.exports = mongoose.model('user', userSchema);

// const userSchema = new mongoose.Schema({
//   name: {
//     type: String,
//     minlength: 2,
//     maxlength: 30,
//     default: 'Жак-Ив Кусто',
//   },
//   about: {
//     type: String,
//     minlength: 2,
//     maxlength: 30,
//     default: 'Исследователь',
//   },
//   avatar: {
//     type: String,
//     default: 'https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png',
//     validate: {
//       validator(v) {
//         return /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/.test(v);
//       },
//       message: 'Некорректный URL',
//     },
//   },
//   password: {
//     type: String,
//     required: [true, 'Данное поле должно быть заполнено'],
//     select: false,
//   },
//   email: {
//     type: String,
//     required: [true, 'Данное поле должно быть заполнено'],
//     unique: true,
//     validate: {
//       validator:
//         validator.isEmail,
//       message: 'Неверный формат почты',
//     },
//   },
// });
//
// userSchema.methods.toJSON = function toJSON() {
//   const user = this.toObject();
//   delete user.password;
//   return user;
// };
//
// module.exports = mongoose.model('user', userSchema);
