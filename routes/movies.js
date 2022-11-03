const moviesRouter = require('express').Router();
// const { celebrate, Joi } = require('celebrate');

const {
  getMovies,
  createMovies,
  deleteMovies,
} = require('../controllers/movies');

const {
  createMovieValidation,
  deleteMovieValidation,
} = require('../middlewares/validation');

moviesRouter.get('/', getMovies);
moviesRouter.post('/', createMovieValidation, createMovies);
moviesRouter.delete('/:movieId', deleteMovieValidation, deleteMovies);

module.exports = moviesRouter;

// moviesRouter.get('/', getMovies);
// moviesRouter.post('/', celebrate({
//   body: Joi.object().keys({
//     name: Joi.string().required().min(2).max(30),
// eslint-disable-next-line max-len
//     link: Joi.string().required().regex(/^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/),
//   }),
// }), createMovies);
//
// moviesRouter.delete('/:movieId', celebrate({
//   params: Joi.object().keys({
//     cardId: Joi.string().regex(/^[0-9a-f]{24}$/i),
//   }),
// }), deleteMovies);

// moviesRouter.put('/:cardId/likes', celebrate({
//   params: Joi.object().keys({
//     cardId: Joi.string().regex(/^[0-9a-f]{24}$/i),
//   }),
// }), likeCard);
//
// moviesRouter.delete('/:cardId/likes', celebrate({
//   params: Joi.object().keys({
//     cardId: Joi.string().regex(/^[0-9a-f]{24}$/i),
//   }),
// }), dislikeCard);

// module.exports = moviesRouter;
