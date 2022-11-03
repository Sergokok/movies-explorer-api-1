const mongoose = require('mongoose');
const { isURL } = require('validator');
const { INVALID_URL_ERR_MSG } = require('../utils/constants');

const movieSchema = new mongoose.Schema({
  country: {
    type: String,
    required: true,
  },
  director: {
    type: String,
    required: true,
  },
  duration: {
    type: Number,
    required: true,
  },
  year: {
    type: String,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
    validate: {
      validator: (v) => isURL(v),
      message: INVALID_URL_ERR_MSG,
    },
  },
  trailerLink: {
    type: String,
    required: true,
    validate: {
      validator: (v) => isURL(v),
      message: INVALID_URL_ERR_MSG,
    },
  },
  thumbnail: {
    type: String,
    required: true,
    validate: {
      validator: (v) => isURL(v),
      message: INVALID_URL_ERR_MSG,
    },
  },
  owner: {
    type: mongoose.ObjectId,
    ref: 'user',
    required: true,
  },
  moveId: {
    type: Number,
    required: true,
  },
  nameRU: {
    type: String,
    required: true,
  },
  nameEN: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('movie', movieSchema);

// const cardSchema = new mongoose.Schema({
//   name: {
//     type: String,
//     required: true,
//     minlength: 2,
//     maxlength: 30,
//   },
//   link: {
//     type: String,
//     required: true,
//     validate: {
//       validator:
//         (v) => /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/.test(v),
//       message: 'Неверный формат ссылки',
//     },
//   },
//   owner: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'user',
//     required: true,
//   },
//   likes: {
//     type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'user' }],
//     default: [],
//   },
//   createdAt: {
//     type: Date,
//     default: Date.now,
//   },
// });

// module.exports = mongoose.model('card', cardSchema);
