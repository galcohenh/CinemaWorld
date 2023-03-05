const express = require('express');

const { index, createMovie, getMovies, getMovie,getMoviesByGenre } = require('../controllers/movie');

const router = express.Router();

router.route('/')
    .get(index)
    // .post(screenIndex)

router.route('/api/movies')
    .post(createMovie)
    .get(getMovies)

router.route('/api/movies/:id')
    .get(getMovie)

router.route('/api/genre/:genre')
    .get(getMoviesByGenre);
  


module.exports = {router};