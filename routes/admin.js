const express = require('express');

const { index, createMovieForm, manageMoviesForm, createScreenForm, manageScreensForm, createHallForm, manageHallsForm } = require('../controllers/admin');

const router = express.Router();

router.get('/', index);

router.get('/createMovieForm', createMovieForm);
router.get('/manageMoviesForm', manageMoviesForm);
router.get('/createScreenForm', createScreenForm);
router.get('/manageScreensForm', manageScreensForm);
router.get('/createHallForm', createHallForm);
router.get('/manageHallsForm', manageHallsForm);

module.exports = router;