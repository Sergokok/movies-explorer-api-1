const Movies = require('../models/movies');

const NotFoundError = require('../errors/not-found-err');
const ForbiddenError = require('../errors/forbidden-err');
const ServerError = require('../errors/server-err');
const BadRequestError = require('../errors/bad-request-err');
const {
  FORBIDDEN_ERR_MSG,
  MOVIE_NOT_FOUND_ERR_MSG,
  SERVER_ERR_MSG,
  BAD_REQUEST_ERR_MSG,
} = require('../utils/constants');

// GET /movies — возвращает все сохранённые пользователем фильмы;

module.exports.getMovies = (req, res, next) => {
  Movies.find({ owner: req.user._id })
    .then((movies) => res.send(movies))
    .catch(next);
};

// module.exports.getMovies = (req, res, next) => {
//   Movies.find({})
//     .then((movies) => res.send({ movies }))
//     .catch(() => {
//       next(new ServerError(SERVER_ERR_MSG));
//     });
// };

// POST /movies — создаёт фильм с переданными в теле
module.exports.getMovies = (req, res, next) => {
  Movies.create({
    ...req.body, owner: req.user._id,
  })
    .then((movie) => res.send(movie))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return next(new BadRequestError(BAD_REQUEST_ERR_MSG));
      }
      return next(new ServerError(SERVER_ERR_MSG));
    });
};
// module.exports.createMovies = (req, res, next) => {
//   const { name, link, owner = req.user._id } = req.body;
//   Movies.create({ name, link, owner })
//     .then((card) => {
//       res.send(card);
//     })
//     .catch((err) => {
//       if (err.name === 'ValidationError') {
//         return next(new BadRequestError(BAD_REQUEST_ERR_MSG));
//       }
//       return next(new ServerError(SERVER_ERR_MSG));
//     });
// };

// DELETE /movies/:movieId — удаляет сохранённый фильм по id;
module.exports.deleteMovies = (req, res, next) => {
  const { movieId } = req.params;
  Movies.findById(movieId)
    .orFail(new NotFoundError(MOVIE_NOT_FOUND_ERR_MSG))
    .then((movie) => {
      if (!movie.owner.equals(req.user._id)) {
        next(new ForbiddenError(FORBIDDEN_ERR_MSG));
      } else {
        Movies.findByIdAndRemove(movieId)
          .then(() => res.send({ message: movie }))
          .catch(next);
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequestError(BAD_REQUEST_ERR_MSG));
      } else {
        next(err);
      }
    });
};

// module.exports.deleteCard = (req, res, next) => {
//   Movies.findById(req.params.cardId)
//     .then((card) => {
//       if (card) {
//         if (card.owner.toString() === req.user._id) {
//           Card.findByIdAndRemove(req.params.cardId)
//             .then((deletedCard) => res.send({ deletedCard }));
//         } else {
//           return next(new ForbiddenError(FORBIDDEN_ERR_MSG));
//         }
//       } else {
//         return next(new NotFoundError(MOVIE_NOT_FOUND_ERR_MSG));
//       }
//     })
//     .catch((err) => {
//       if (err.name === 'CastError') {
//         return next(new BadRequestError(BAD_REQUEST_ERR_MSG));
//       }
//       return next(new ServerError(BAD_REQUEST_ERR_MSG));
//     });
// };

// module.exports.likeCard = (req, res, next) => {
//   Movies.findByIdAndUpdate(
//     req.params.cardId,
//     { $addToSet: { likes: req.user._id } },
//     { new: true, runValidators: true },
//   )
//     .then((card) => {
//       if (card) {
//         return res.send(card);
//       }
//       return next(new NotFoundError(MOVIE_NOT_FOUND_ERR_MSG));
//     })
//     .catch((err) => {
//       if (err.name === 'CastError' || err.name === 'ValidationError') {
//         return next(new BadRequestError(BAD_REQUEST_ERR_MSG));
//       }
//       return next(new ServerError(SERVER_ERR_MSG));
//     });
// };
//
// module.exports.dislikeCard = (req, res, next) => {
//   Movies.findByIdAndUpdate(
//     req.params.cardId,
//     { $pull: { likes: req.user._id } },
//     { new: true, runValidators: true },
//   )
//     .then((card) => {
//       if (card) {
//         res.send(card);
//       }
//       return next(new NotFoundError(MOVIE_NOT_FOUND_ERR_MSG));
//     })
//     .catch((err) => {
//       if (err.name === 'CastError') {
//         return next(new BadRequestError(BAD_REQUEST_ERR_MSG));
//       }
//       return next(new ServerError(SERVER_ERR_MSG));
//     });
// };
