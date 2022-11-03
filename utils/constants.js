const DB_URL = 'mongodb://localhost:27017/moviesdb';
const SECRET_KEY = 'some-secret-key';

const BAD_REQUEST_ERR_MSG = 'Переданы некорректные данные.';
const CONFLICT_ERR_MSG = 'Данный email уже существует.';
const FORBIDDEN_ERR_MSG = 'Доступ запрещен.';
const USER_NOT_FOUND_ERR_MSG = 'Пользователь не найден.';
const MOVIE_NOT_FOUND_ERR_MSG = 'Фильм не найден.';
const PAGE_NOT_FOUND_ERR_MSG = 'Страница не найдена';
const AUTHORIZATION_ERR_MSG = 'Необходима авторизация.';
const SERVER_ERR_MSG = 'Ошибка сервера';
const INVALID_USER_DATA_ERR_MSG = 'Неправильные логин или пароль.';
const INVALID_URL_ERR_MSG = 'Введите корректный URL';
const INVALID_EMAIL_ERR_MSG = 'Введите корректный email';

module.exports = {
  DB_URL,
  SECRET_KEY,
  BAD_REQUEST_ERR_MSG,
  CONFLICT_ERR_MSG,
  FORBIDDEN_ERR_MSG,
  USER_NOT_FOUND_ERR_MSG,
  MOVIE_NOT_FOUND_ERR_MSG,
  PAGE_NOT_FOUND_ERR_MSG,
  AUTHORIZATION_ERR_MSG,
  SERVER_ERR_MSG,
  INVALID_USER_DATA_ERR_MSG,
  INVALID_URL_ERR_MSG,
  INVALID_EMAIL_ERR_MSG,
};
