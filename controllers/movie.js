const Movie = require('../models/movie');
const IncorrrectUserError = require('../errores/errorincorrectuser');
const NotFoundError = require('../errores/errornotfound');
const ServerError = require('../errores/errorserver');

module.exports.getMovies = (req, res, next) => {
  Movie.find({})
    .then((movies) => {
      res.send({ data: movies });
    })
    .catch((err) => {
      next(err);
    });
};

module.exports.createMovie = (req, res) => {
  const { country, director, duration,
    year, description, image, trailerLink,
    thumbnail, movieId, nameRU, nameEN,
  } = req.body;
  const owner = req.user._id;
  Movie.create({
    country, director, duration,
    year, description, image, trailerLink,
    thumbnail, movieId, nameRU, nameEN, owner
  })
    .then((movie) => {
      res.send({ data: movie });
    })
    .catch(() => {
      throw new ServerError('Ошибка сервера');
    });
};

module.exports.deleteMovie = (req, res, next) => {
  Movie.findById(req.params.id)
    .then((movie) => {
      if (!movie) {
        throw new NotFoundError('Карточка не нашлась. Удалить нельзя');
      }
      if (movie.owner.toString() === req.user._id) {
        Movie.findByIdAndRemove(req.params.id).orFail()
          .then(() => {
            res.send({ message: 'Удаление удалось!' });
          })
          .catch(() => {
            throw new ServerError('Ошибка сервера');
          });
      } else {
        throw new IncorrrectUserError('Нет прав на удаление');
      }
    })
    .catch((err) => {
      next(err);
    });
};

/*
module.exports.putCardLike = (req, res, next) => {
  const owner = req.user._id;
  Card.findByIdAndUpdate(
    req.params.id,
    { $addToSet: { likes: owner } }, // добавить _id в массив, если его там нет
    { new: true },
  )
    .then((card) => {
      if (!card) {
        throw new NotFoundError('Карточка не нашлась. Поставить лайк нельзя');
      }
      res.send({ data: card });
    })
    .catch((err) => {
      next(err);
    });
};

module.exports.deleteCardLike = (req, res, next) => {
  const owner = req.user._id;
  Card.findByIdAndUpdate(
    req.params.id,
    { $pull: { likes: owner } }, // убрать _id из массива
    { new: true },
  )
    .then((card) => {
      if (!card) {
        throw new NotFoundError('Карточка не нашлась. Снять лайк нельзя');
      }
      res.send({ data: card });
    })
    .catch((err) => {
      next(err);
    });
};
*/
// const errorCatch = require('./errorcatch');
