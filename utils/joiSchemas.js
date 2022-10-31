const { Joi } = require('celebrate');

module.exports.loginSсhema = {
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
  }),
};

module.exports.userSсhema = {
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    about: Joi.string().required().min(2).max(30),
  }),
};

module.exports.avatarSсhema = {
  body: Joi.object().keys({
    avatar: Joi.string().required(),
  }),
};

module.exports.cardSсhema = {
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    link: Joi.string().required(),
  }),
};

module.exports.cardIdSсhema = {
  body: Joi.object().keys({
    _id: Joi.string().required(),
  }),
};
