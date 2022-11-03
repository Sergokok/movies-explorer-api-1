require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const helmet = require('helmet');
// const cookieParser = require('cookie-parser');
// const { celebrate, Joi, errors } = require('celebrate');
const { errors } = require('celebrate');
// const { cors } = require('./middlewares/cors');
const limiter = require('./middlewares/rateLimiter');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const { PORT, DB_LINK } = require('./utils/config');

// const auth = require('./middlewares/auth');
// const { createUser, login } = require('./controllers/users');
// const NotFoundError = require('./errors/not-found-err');

// const { PORT = 3000 } = process.env;
//
// mongoose.connect('mongodb://localhost:27017/mestodb', {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
//   // family: 4, // Use IPv4, skip trying IPv6
// });

const app = express();
// логгер запросов
app.use(requestLogger);
// rate-limiter (защита от DDOS)
app.use(limiter);
// заголовки безопасности
app.use(helmet());

// app.use(cors);
// парсер содержимого запросов
app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));
// Добавляем поддержку CORS
app.use(require('./middlewares/cors'));
// Подключение к БД
mongoose.connect(DB_LINK);
// Подключаем роуты (перенесли в routes/index.js)
app.use('/', require('./routes'));
// Подключаем логгер ошибок (перенесли в middlewares/logger.js)
app.use(errorLogger);
// Подключаем обработчик ошибок celebrate
app.use(errors());
// Подключаем свой обработчик ошибок сервера
app.use(require('./middlewares/errorHandler'));

app.listen(PORT);

// app.use(cookieParser());

// app.get('/crash-test', () => {
//   setTimeout(() => {
//     throw new Error('Сервер сейчас упадёт');
//   }, 0);
// });
//
// app.post('/signin', celebrate({
//   body: Joi.object().keys({
//     email: Joi.string().required().email(),
//     password: Joi.string().required(),
//   }),
// }), login);
//
// app.post('/signup', celebrate({
//   body: Joi.object().keys({
//     name: Joi.string().min(2).max(30),
//     about: Joi.string().min(2).max(30),
//     avatar: Joi.string().regex(/^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/),
//     email: Joi.string().required().email(),
//     password: Joi.string().required(),
//   }),
// }), createUser);
//
// app.use(auth);
//
// app.use('/users', require('./routes/users'));
// app.use('/cards', require('./routes/cards'));
//
// app.use('*', (req, res, next) => {
//   next(new NotFoundError('Запрашиваемый ресурс не найден'));
// });
//
// app.use(errorLogger);
//
// app.use(errors());
//
// app.use((err, req, res, next) => {
//   const statusCode = err.statusCode || 500;
//   const message = statusCode === 500 ? 'Ошибка сервера' : err.message;
//   res.status(statusCode).send({ message });
//   next();
// });
//
// app.listen(PORT);
