const { celebrate, Joi } = require('celebrate');

const router = require('express').Router();

const auth = require('../middlewares/auth');
const usersRouter = require('./users');
const moviesRouter = require('./movies');
const { login, createUser } = require('../controllers/users');

const NotFoundError = require('../utils/errors/NotFoundError');

// const { linkPattern } = require('../utils/constants');

router.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().min(2).max(30).required(),
  }),
}), login);
router.post('/signup', celebrate({
  body: Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().min(2).max(30).required(),
    name: Joi.string().min(2).max(30),
  }),
}), createUser);
router.get('/signout', (req, res) => {
  res.clearCookie('jwt', {
    maxAge: 3600000 * 24 * 7, httpOnly: true, sameSite: 'none', secure: true,
  }).send({ message: 'Вы успешно вышли из аккаунта' });
});

router.use(auth);
router.use('/users', usersRouter);
router.use('/movies', moviesRouter);

router.use('/:anything', (req, res, next) => {
  const { anything } = req.params;
  next(new NotFoundError(`Обращение к несуществующемму эндпоинту ${anything}`));
});

module.exports = router;
