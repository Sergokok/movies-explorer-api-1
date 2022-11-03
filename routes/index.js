const router = require('express').Router();
const { login, createUser } = require('../controllers/users');
const routerUsers = require('./users');
const routerMovies = require('./movies');
const auth = require('../middlewares/auth');
const NotFoundError = require('../errors/not-found-err');
const { PAGE_NOT_FOUND_ERR_MSG } = require('../utils/constants');
const { createUserValidation, loginValidation } = require('../middlewares/validaton');

router.post('/signin', loginValidation, login);

router.post('/signup', createUserValidation, createUser);

router.use(auth);

// router.post('/signout', (req, res) => {
//   res.clearCookie('jwt').send({ message: 'Bye' });
// });

router.use('/users', routerUsers);
router.use('/movies', routerMovies);

router.use('*', (req, res, next) => {
  next(new NotFoundError(PAGE_NOT_FOUND_ERR_MSG));
});

module.exports = router;
