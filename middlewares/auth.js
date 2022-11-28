const jwt = require('jsonwebtoken');
const NotAuthError = require('../errores/errornotauth');

const { NODE_ENV, JWT_SECRET } = process.env;

module.exports.authUser = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    throw new NotAuthError('Необходима авторизация');
  }

  if (!authorization.startsWith('Bearer ')) {
    throw new NotAuthError('Необходима авторизация');
  }

  const token = authorization.replace('Bearer ', '');
  let payload;

  try {
    payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : 'simpleKey');
    // payload = jwt.verify(token, 'simpleKey');
  } catch (err) {
    next(new NotAuthError('Необходима авторизация'));
  }

  req.user = payload; // записываем пейлоуд в объект запроса

  next(); // пропускаем запрос дальше
};
