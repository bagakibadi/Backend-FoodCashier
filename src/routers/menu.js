const express = require('express');
const Router = express.Router();
const controller = require('../controller/menu');

Router
  .get('/', controller.getMenu)
  .post('/create', controller.createMenu)
  .get('/:id', controller.detailMenu)
  // .delete('/:id', controller.delete)
  // .patch('/:id', controller.update)

module.exports = Router