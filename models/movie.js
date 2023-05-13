const mongoose = require('mongoose');
const validator = require('validator');

const movieSchema = mongoose.Schema({
  country: {
    type: String,
    required: true,
    minLength: [2, 'Must be at least 2 characters'],
    maxLength: [30, 'Must be less than 30 characters'],
  },
  director: {
    type: String,
    required: true,
    minLength: [2, 'Must be at least 2 characters'],
    maxLength: [30, 'Must be less than 30 characters'],
  },
  duration: {
    type: Number,
    required: true,
    min: [0, 'duration cannot be less than zero'],
  },
  year: {
    type: String,
    required: true,
    length: [4, 'Year is 4 characters long'],
  },
  description: {
    type: String,
    required: true,
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
    required: true,
  },
  movieId: {
    type: String,
    required: true,
  },
  nameRU: {
    type: String,
    required: true,
    minLength: [2, 'Must be at least 2 characters'],
    maxLength: [50, 'Must be less than 30 characters'],
  },
  nameEN: {
    type: String,
    required: true,
    minLength: [2, 'Must be at least 2 characters'],
    maxLength: [50, 'Must be less than 30 characters'],
  },
});

module.exports = mongoose.model('movie', movieSchema);
