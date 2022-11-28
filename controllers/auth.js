const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const NotAllowedError = require('../errores/errornotallowed');
const ServerError = require('../errores/errorserver');

const { NODE_ENV, JWT_SECRET } = process.env;

module.exports.createUser = (req, res, next) => {
  const {
    email, password, name,
  } = req.body;

  User.findOne({ email })
    .then((user) => {
      if (user) {
        throw new NotAllowedError('Такой пользователь уже есть!!!');
      }
    })
    .then(() => {
      bcrypt.hash(password, 10)
        .then((hash) => User.create({
          email, password: hash, name,
        })
          .then((user) => {
            res.send({
              _id: user._id,
              email: user.email,
              name: user.name,
            });
          })
          .catch(() => {
            throw new ServerError('Ошибка сервера');
          }));
    })
    .catch((err) => {
      next(err);
    });
};

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;

  User.findUserByParams(email, password, next)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, NODE_ENV === 'production' ? JWT_SECRET : 'simpleKey');
      res.send({ token });
    })
    .catch((err) => {
      next(err);
    });
};
