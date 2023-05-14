const { NODE_ENV, JWT_SECRET } = process.env;
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/user');
const NotFoundError = require('../utils/errors/NotFoundError');
const IncorrectError = require('../utils/errors/IncorrectError');
const ConflictError = require('../utils/errors/ConflictError');
const { COOKIE_OPTIONS } = require('../utils/constants');

const login = (req, res, next) => {
  res.stages += 'login started';
  const { email, password } = req.body;
  User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, NODE_ENV === 'production' ? JWT_SECRET : 'secret-key', { expiresIn: '7d' });
      res.cookie('jwt', token, COOKIE_OPTIONS).send({ message: 'Вы успешно авторизовались' });
    })
    .catch((err) => {
      res.clearCookie('jwt');
      next(err);
    });
};

const getUser = (req, res, next) => {
  res.stages += 'getuser started';
  const userId = req.params.userId || req.user._id;
  User.findById(userId)
    .orFail(() => {
      throw new NotFoundError('Пользователь не найдён');
    })
    .then((user) => {
      res.send(user);
    })
    .catch(next);
};

const createUser = (req, res, next) => {
  res.stages += 'create started';
  const { email, password, name } = req.body;

  bcrypt
    .hash(password, 10)
    .then((hash) => User.create({
      email, password: hash, name,
    }))
    .then((user) => {
      User.findById(user._id)
        .then((userFound) => {
          res.send(userFound);
        });
    })
    .catch((err) => {
      if (err.code === 11000) {
        next(new ConflictError('Пользователь с таким email уже существует'));
      } else if (err.name === 'ValidationError') {
        next(new IncorrectError('Введены некорректные данные'));
      } else {
        next(err);
      }
    });
};

const modifyUser = (req, res, next) => {
  User.findByIdAndUpdate(req.user._id, req.body, {
    new: true,
    runValidators: true,
  })
    .then((user) => {
      res.send(user);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new IncorrectError('Введены некорректные данные'));
      } else {
        next(err);
      }
    });
};

module.exports = {
  login,
  getUser,
  createUser,
  modifyUser,
};
