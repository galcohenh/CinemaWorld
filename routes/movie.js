const express = require('express');

const { index, createMovie, getMovies, getMovie } = require('../controllers/movie');

const router = express.Router();
const apiRouter = express.Router();

// router.get('/', index);

router.route('/')
    .get(index)
    // .post(screenIndex)

router.route('/api/movies').get(getMovies).post(createMovie)
router.route('/api/movies/:id').get(getMovie)
// apiRouter.get('/getMovies', getMovies)
// apiRouter.post('/createMovie', createMovie)

module.exports = {router, apiRouter};