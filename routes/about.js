const express = require('express');

const { index } = require('../controllers/about');

const router = express.Router();

router.get('/', index);

module.exports = router;