const Movie = require('../models/movie');
const NotFoundError = require('../utils/errors/NotFoundError');
const ForbiddenError = require('../utils/errors/ForbiddenError');
const IncorrectError = require('../utils/errors/IncorrectError');

const getMovies = (req, res, next) => {
  Movie.find({ owner: req.user._id })
    .populate(['owner'])
    .then((movies) => {
      res.send(movies);
    })
    .catch(next);
};

const createMovie = (req, res, next) => {
  const ownerId = req.user._id;
  Movie.create({ ...req.body, owner: ownerId })
    .then((movie) => {
      res.send(movie);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new IncorrectError('Введены неверные данные'));
      } else {
        next(err);
      }
    });
};

const deleteMovie = (req, res, next) => {
  const { _id } = req.params;
  Movie.findOne({ _id })
    .orFail(new NotFoundError('Фильм не найден'))
    .then((movie) => {
      if (movie.owner.toString() === req.user._id) {
        return Movie.deleteOne({ _id });
      }
      throw new ForbiddenError('Отказано в доступе');
    })
    .then(() => res.send({ message: 'Фильм удален' }))
    .catch(next);
};

module.exports = {
  getMovies,
  createMovie,
  deleteMovie,
};
