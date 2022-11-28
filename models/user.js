const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const outValidator = require('validator');
const NotAuthError = require('../errores/errornotauth');

function validationEmail(val) {
  return outValidator.isEmail(val);
}

function validationUrl(val) {
  return outValidator.isURL(val);
}

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    validate: validationEmail,
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
  name: {
    type: String,
    default: 'Вася Батарейкин',
    minlength: 2,
    maxlength: 30,
  },
  avatar: {
    type: String,
    default: 'https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png',
    validate: validationUrl,
  },
});

userSchema.statics.findUserByParams = function (email, password) {
  return this.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        throw new NotAuthError('Неправильное имя пользователя или пароль!!!');
      }
      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            throw new NotAuthError('Неправильное имя пользователя или пароль');
          }
          return user;
        });
    });
};

module.exports = mongoose.model('user', userSchema);
