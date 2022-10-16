const mongoose = require('mongoose');
const User = require('../models/user');
const { NotFoundError, IncorrectDataError } = require('../utils/errors');

module.exports.getUsers = (req, res, next) => {
  User.find({})
    .then((users) => res.send({ users }))
    .catch((err) => next(err));
};

module.exports.createUser = (req, res, next) => {
  const { name, about, avatar } = req.body;

  User.create({ name, about, avatar })
    .then((user) => res.send({ user }))
    .catch((err) => {
      if (err instanceof mongoose.Error.ValidationError) {
        throw new IncorrectDataError('Переданы некорректные данные при создании пользователя');
      }
      next(err);
    })
    .catch((err) => next(err));
};

module.exports.getUserById = (req, res, next) => {
  User.findById(req.params.userId)
    .then((user) => {
      if (!user) throw new NotFoundError('Пользователь по указанному _id не найден');
      res.send({ user });
    })
    .catch((err) => next(err));
};

module.exports.patchUsersMe = (req, res, next) => {
  const { name, about } = req.body;

  User.findByIdAndUpdate(req.user._id, { name, about }, { new: true, runValidators: true })
    .orFail(new NotFoundError('Пользователь с указанным _id не найден'))
    .then((user) => res.send({ user }))
    .catch((err) => {
      if (err instanceof mongoose.Error.ValidationError) {
        throw new IncorrectDataError('Переданы некорректные данные при обновлении профиля');
      }
      next(err);
    })
    .catch((err) => next(err));
};

module.exports.patchUsersMeAvatar = (req, res, next) => {
  const { avatar } = req.body;

  User.findByIdAndUpdate(req.user._id, { avatar }, { new: true, runValidators: true })
    .orFail(new NotFoundError('Пользователь с указанным _id не найден'))
    .then((user) => res.send({ user }))
    .catch((err) => {
      if (err instanceof mongoose.Error.ValidationError) {
        throw new IncorrectDataError('Переданы некорректные данные при обновлении аватара');
      }
      next(err);
    })
    .catch((err) => next(err));
};
