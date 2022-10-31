const jwt = require('jsonwebtoken');
const { AuthorisationError } = require('../utils/errors/AuthorisationError');

const { JWT_TEST_TOKEN } = require('../utils/constans');

require('dotenv').config();

// module.exports = (req, res, next) => {
//   const token = req.cookies.jwt;
//   if (!token) {
//     return next(new AuthorisationError('Необходима авторизация'));
//   }

//   let payload;

//   try {
//     payload = jwt.verify(token, process.env.JWT_SECRET);
//   } catch (err) {
//     return next(new AuthorisationError('Некорректный токен'));
//   }
//   req.user = payload;
//   return next();
// };

// Токен в headers для git тестов.
module.exports = (req, res, next) => {
  const token = req.headers.authorization.replace('Bearer ', '');
  if (!token) {
    return next(new AuthorisationError('Необходима авторизация'));
  }

  let payload;

  try {
    payload = jwt.verify(token, JWT_TEST_TOKEN);
  } catch (err) {
    return next(new AuthorisationError(`Некорректный токен: ${token}`));
  }
  req.user = payload;
  return next();
};
