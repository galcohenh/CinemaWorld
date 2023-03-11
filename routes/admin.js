const express = require('express');

const { index, createMovieForm, manageMoviesForm, createScreenForm, manageScreensForm, createUserForm, manageUsersForm } = require('../controllers/admin');

const router = express.Router();

router.get('/', index);

router.get('/createMovieForm', createMovieForm);
router.get('/manageMoviesForm', manageMoviesForm);
router.get('/createScreenForm', createScreenForm);
router.get('/manageScreensForm', manageScreensForm);
router.get('/createUserForm', createUserForm);
router.get('/manageUsersForm', manageUsersForm);

module.exports = router;