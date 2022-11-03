const userRouter = require('express').Router();
// const { celebrate, Joi } = require('celebrate');

const {
  getUser,
  updateUser,
} = require('../controllers/users');

const {
  updateUserValidation,
} = require('../middlewares/validation');

userRouter.get('/me', getUser);
userRouter.patch('/me', updateUserValidation, updateUser);

module.exports = userRouter;

// const {
//   // getUsers,
//   getUser,
//   // getUserId,
//   updateUser,
//   // updateAvatar,
// } = require('../controllers/users');
//
// userRouter.get('/', getUsers);
// userRouter.get('/me', getUserInfo);
//
// userRouter.get(
//   '/:userId',
//   celebrate({
//     params: Joi.object().keys({
//       userId: Joi.string().regex(/^[0-9a-f]{24}$/i),
//     }),
//   }),
//   getUserId,
// );
//
// userRouter.patch('/me', celebrate({
//   body: Joi.object().keys({
//     name: Joi.string().required().min(2).max(30),
//     about: Joi.string().required().min(2).max(30),
//   }),
// }), updateUser);
//
// userRouter.patch('/me/avatar', celebrate({
//   body: Joi.object().keys({
//     avatar: Joi.string().required()
//     .regex(/^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/),
//   }),
// }), updateAvatar);
//
// module.exports = userRouter;
