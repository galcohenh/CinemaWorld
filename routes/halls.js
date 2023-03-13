const express = require('express');

const { createHall, getHalls, deleteHall } = require('../controllers/hall');

const router = express.Router();

router.route('/')
    .post(createHall)
    .get(getHalls)

router.route('/:id')
    .delete(deleteHall)

module.exports = router;