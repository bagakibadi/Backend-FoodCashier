const express = require('express');
const menu = require('./menu');
const user = require('./user');

const router = express.Router();
router
  .use('/user', user)
  .use('/menu', menu)

module.exports = router;
