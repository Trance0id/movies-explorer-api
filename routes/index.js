const { celebrate, Joi } = require('celebrate');

const globalRouter = require('express').Router();

const auth = require('../middlewares/auth');
const usersRouter = require('./users');
const moviesRouter = require('./movies');
const { login, createUser } = require('../controllers/users');
const { COOKIE_OPTIONS } = require('../utils/constants');

const NotFoundError = require('../utils/errors/NotFoundError');

globalRouter.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  }),
}), login);

globalRouter.post('/signup', celebrate({
  body: Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
    name: Joi.string().min(2).max(30).required(),
  }),
}), createUser);

globalRouter.use(auth);

// globalRouter.use((req, res, next) => { res.send(req.headers); next(); });

globalRouter.get('/signout', (req, res) => {
  res.clearCookie('jwt', COOKIE_OPTIONS).send({ message: 'Вы успешно вышли из аккаунта' });
});

globalRouter.use('/users', usersRouter);
globalRouter.use('/movies', moviesRouter);

globalRouter.use('/', (req, res, next) => {
  next(new NotFoundError('Обращение к несуществующему эндпоинту'));
});

module.exports = globalRouter;
