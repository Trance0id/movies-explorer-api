const { celebrate, Joi } = require('celebrate');

const router = require('express').Router();

const auth = require('../middlewares/auth');
const usersRouter = require('./users');
const moviesRouter = require('./movies');
const { login, createUser } = require('../controllers/users');
const { COOKIE_OPTIONS } = require('../utils/constants');

const NotFoundError = require('../utils/errors/NotFoundError');

router.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  }),
}), login);

router.post('/signup', celebrate({
  body: Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
    name: Joi.string().min(2).max(30).required(),
  }),
}), createUser);

router.use(auth);

router.use('/users', usersRouter);
router.use('/movies', moviesRouter);

router.get('/signout', (req, res) => {
  res.clearCookie('jwt', COOKIE_OPTIONS).send({ message: 'Вы успешно вышли из аккаунта' });
});

router.use('/', (req, res, next) => {
  next(new NotFoundError(`Обращение к несуществующему эндпоинту ${req.url}`));
});

module.exports = router;
