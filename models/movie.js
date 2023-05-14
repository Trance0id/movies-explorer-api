const mongoose = require('mongoose');
const validator = require('validator');

const movieSchema = mongoose.Schema({
  country: {
    type: String,
    required: [true, 'country field is required'],
  },
  director: {
    type: String,
    required: [true, 'director field is required'],
  },
  duration: {
    type: Number,
    required: [true, 'duration field is required'],
    min: [0, 'duration cannot be less than zero'],
  },
  year: {
    type: String,
    required: [true, 'year field is required'],
    length: [4, 'Year is 4 characters long'],
  },
  description: {
    type: String,
    required: [true, 'description field is required'],
  },
  image: {
    type: String,
    required: [true, 'image field is required'],
    validate: validator.isURL,
  },
  trailerLink: {
    type: String,
    required: [true, 'trailerLink field is required'],
    validate: validator.isURL,
  },
  thumbnail: {
    type: String,
    required: [true, 'thumbnail field is required'],
    validate: validator.isURL,
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: [true, 'owner field is required'],
  },
  movieId: {
    type: String,
    required: [true, 'movieId field is required'],
  },
  nameRU: {
    type: String,
    required: [true, 'nameRU field is required'],
  },
  nameEN: {
    type: String,
    required: [true, 'nameEN field is required'],
  },
});

module.exports = mongoose.model('movie', movieSchema);
