const express = require('express');

const { index, createMovieForm, manageMoviesForm } = require('../controllers/admin');

const router = express.Router();

router.get('/', index);

router.get('/createMovieForm', createMovieForm);
router.get('/manageMoviesForm', manageMoviesForm);

module.exports = router;