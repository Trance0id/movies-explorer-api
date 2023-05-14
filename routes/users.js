const { celebrate, Joi } = require('celebrate');
const usersRouter = require('express').Router();

const {
  getUser,
  modifyUser,
} = require('../controllers/users');

usersRouter.get('/me', getUser);

usersRouter.patch('/me', celebrate({
  body: Joi.object().keys({
    email: Joi.string().email().required(),
    name: Joi.string().min(2).max(30).required(),
  }),
}), modifyUser);

module.exports = usersRouter;
