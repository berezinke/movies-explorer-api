const User = require('../models/user');
const NotFoundError = require('../errores/errornotfound');

module.exports.getUserById = (req, res, next) => {
  User.findById(req.params.id)
    .then((user) => {
      if (!user) {
        throw new NotFoundError('Таких данных в базе нет');
      }
      res.send({ data: user });
    })
    .catch((err) => {
      next(err);
    });
};

module.exports.getOwner = (req, res, next) => {
  User.findById(req.user._id)
    .then((user) => {
      if (!user) {
        throw new NotFoundError('Таких данных в базе нет');
      }
      res.send({ data: user });
    })
    .catch((err) => {
      next(err);
    });
};

module.exports.updateUser = (req, res, next) => {
  const { name, about } = req.body;
  User.findByIdAndUpdate(
    req.user._id,
    { name, about },
    { new: true, runValidators: true }, // Обн рез, валидация, создание если не найден
  )
    .then((user) => {
      if (!user) {
        throw new NotFoundError('Пользователь не найден');
      }
      res.send({ data: user });
    })
    .catch((err) => {
      next(err);
    });
};

module.exports.updateAvatar = (req, res, next) => {
  const { avatar } = req.body;
  User.findByIdAndUpdate(
    req.user._id,
    { avatar },
    { new: true, runValidators: true },
  )
    .then((user) => {
      if (!user) {
        throw new NotFoundError('Пользователь не найден');
      }
      res.send({ data: user });
    })
    .catch((err) => {
      next(err);
    });
};
