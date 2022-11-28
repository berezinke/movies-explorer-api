const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');

const {
  getMovies, createMovie, deleteMovie,
} = require('../controllers/movie');
// , putMovieLike, deleteMovieLike

const validUrl = /(https?:\/\/[a-z0-9_\-.]+[a-z]{2,9})(\/[a-z0-9_\-.])*?/i;
const validMongoId = /^[0-9A-F]+/i;

router.get('/', getMovies);

router.post('/', celebrate({
  body: Joi.object().keys({
    country: Joi.string().required().min(2),
    director: Joi.string().required().min(2),
    duration: Joi.number().integer().positive().required(),
    year: Joi.string().required().min(2),
    description: Joi.string().required().min(2),
    image: Joi.string().required().pattern(validUrl),
    trailerLink: Joi.string().required().pattern(validUrl),
    thumbnail: Joi.string().required().pattern(validUrl),
    movieId: Joi.number().integer().positive().required(),
    nameRU: Joi.string().required().min(2),
    nameEN: Joi.string().required().min(2),
  }),
}), createMovie);

router.delete('/:id', celebrate({
  params: Joi.object().keys({
    id: Joi.string().pattern(validMongoId).min(24).max(24),
  }),
}), deleteMovie);

/* router.put('/:id/likes', celebrate({
  params: Joi.object().keys({
    id: Joi.string().pattern(validMongoId).min(24).max(24),
  }),
}), putCardLike);

router.delete('/:id/likes', celebrate({
  params: Joi.object().keys({
    id: Joi.string().pattern(validMongoId).min(24).max(24),
  }),
}), deleteCardLike); */

module.exports = router;
