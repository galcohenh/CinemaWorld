const express = require('express');

const { index } = require('../controllers/admin');

const router = express.Router();

router.get('/', index);

module.exports = router;