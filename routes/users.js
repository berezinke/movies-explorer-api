const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');

const {
  getOwner, updateUser,
} = require('../controllers/users');

router.get('/me', getOwner);

router.patch('/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    email: Joi.string().email().required(),
  }),
}), updateUser);

module.exports = router;

// const validMongoId = /^[0-9A-F]+/i;
// const validUrl = /(https?:\/\/[a-z0-9_\-.]+[a-z]{2,9})(\/[a-z0-9_\-.])*?/i;
