const express = require('express');

const { index, addScreen } = require('../controllers/screen');

const router = express.Router();

router.route('/')
    .get(index)
    .post(addScreen);

module.exports = router;