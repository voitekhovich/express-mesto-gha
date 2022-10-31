module.exports = ((err, req, res, next) => {
  console.log(err);
  if (!err.statusCode) {
    res.status(500).send({ message: `На сервере произошла ошибка: ${err.message}` });
  } else {
    res.status(err.statusCode).send({ message: err.message });
    next();
  }
});
