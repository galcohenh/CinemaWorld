const express = require('express');

const { createHall, getHalls } = require('../controllers/hall');

const router = express.Router();

router.route('/')
    .post(createHall)
    .get(getHalls)

module.exports = router;