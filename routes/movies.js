const { celebrate, Joi } = require('celebrate');

const moviesRouter = require('express').Router();

const { linkPattern } = require('../utils/constants');

const {
  getMovies,
  createMovie,
  deleteMovie,
} = require('../controllers/movies');

moviesRouter.get('/', getMovies);
moviesRouter.post('/', celebrate({
  body: Joi.object().keys({
    country: Joi.string().min(2).max(30).required(),
    director: Joi.string().min(2).max(30).required(),
    duration: Joi.number().min(0).required(),
    year: Joi.string().length(4).required(),
    description: Joi.string().required(),
    image: Joi.string().pattern(linkPattern).required(),
    trailerLink: Joi.string().pattern(linkPattern).required(),
    thumbnail: Joi.string().pattern(linkPattern).required(),
    movieId: Joi.string().required(),
    nameRU: Joi.string().min(2).max(50).required(),
    nameEN: Joi.string().min(2).max(50).required(),
  }),
}), createMovie);
moviesRouter.delete('/:_id', celebrate({
  params: Joi.object().keys({
    _id: Joi.string().required(),
  }),
}), deleteMovie);

module.exports = moviesRouter;
