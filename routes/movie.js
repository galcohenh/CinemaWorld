const express = require('express');

const { index } = require('../controllers/movie');

const router = express.Router();

router.get('/', index);

module.exports = router;