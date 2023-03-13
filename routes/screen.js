const express = require('express');

const { index, addScreen, deleteScreen } = require('../controllers/screen');

const router = express.Router();

router.route('/')
    .get(index)
    .post(addScreen)
    .delete(deleteScreen)

module.exports = router;