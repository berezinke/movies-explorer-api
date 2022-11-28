const NotFoundError = require('../errores/errornotfound');

module.exports.errorPath = () => {
  throw new NotFoundError('Такого пути программа пока не знает');
};
