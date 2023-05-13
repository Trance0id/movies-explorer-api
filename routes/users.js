const { celebrate, Joi } = require('celebrate');
const usersRouter = require('express').Router();

// const { linkPattern } = require('../utils/constants');

const {
  getUser,
  modifyUser,
} = require('../controllers/users');

usersRouter.get('/me', getUser);
usersRouter.patch('/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
  }),
}), modifyUser);

module.exports = usersRouter;
