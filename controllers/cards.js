const mongoose = require('mongoose');
const Card = require('../models/card');
const { IncorrectDataError, NotFoundError } = require('../utils/errors');

module.exports.getCards = (req, res, next) => {
  Card.find({})
    .then((cards) => res.send({ cards }))
    .catch((err) => next(err));
};

module.exports.createCard = (req, res, next) => {
  const { name, link } = req.body;
  const owner = req.user._id;

  Card.create({ name, link, owner })
    .then((card) => res.send(card))
    .catch((err) => {
      if (err instanceof mongoose.Error.ValidationError) {
        throw new IncorrectDataError('Переданы некорректные данные при создании карточки');
      }
      next(err);
    })
    .catch((err) => next(err));
};

module.exports.delCardById = (req, res, next) => {
  Card.findByIdAndRemove(req.params.cardId)
    .orFail(new NotFoundError('Карточка с указанным _id не найдена'))
    .then((card) => res.send({ card }))
    .catch((err) => {
      if (err instanceof mongoose.Error.CastError) {
        throw new IncorrectDataError('Некорректно указан _id карточки');
      }
      next(err);
    })
    .catch((err) => next(err));
};

module.exports.putCardLike = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .orFail(new NotFoundError('Передан несуществующий _id карточки'))
    .then((card) => res.send({ card }))
    .catch((err) => {
      if (err instanceof mongoose.Error.CastError) {
        throw new IncorrectDataError('Переданы некорректные данные для постановки/снятии лайка');
      }
      next(err);
    })
    .catch((err) => next(err));
};

module.exports.delCardLike = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .orFail(new NotFoundError('Передан несуществующий _id карточки'))
    .then((card) => res.send({ card }))
    .catch((err) => {
      if (err instanceof mongoose.Error.CastError) {
        throw new IncorrectDataError('Переданы некорректные данные для постановки/снятии лайка');
      }
      next(err);
    })
    .catch((err) => next(err));
};
