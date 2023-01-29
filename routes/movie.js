const express = require('express');

const { index, createMovie, getMovies, getMovie } = require('../controllers/movie');

const router = express.Router();

router.route('/')
    .get(index)
    // .post(screenIndex)

router.route('/api/movies')
    .post(createMovie)
    .get(getMovies)

router.route('/api/movies/:id')
    .get(getMovie)


module.exports = {router};