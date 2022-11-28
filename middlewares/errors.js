module.exports.catchErrores = (err, req, res, next) => {
  if (err.statusCode) {
    res.status(err.statusCode).send({ message: `${err.message} ${err.statusCode}` });
  } else {
    res.status(500).send({ message: 'Внутренняя ошибка сервера...' });
  }
  next(); // пропускаем запрос дальше
};
