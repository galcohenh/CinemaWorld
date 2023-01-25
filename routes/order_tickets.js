const express = require('express');

const { index } = require('../controllers/order_tickets');

const router = express.Router();

router.get('/', index);

module.exports = router;