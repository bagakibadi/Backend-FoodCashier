const express = require('express');
const Router = express.Router();
const controller = require('../controller/user');

Router
  .get('/', controller.userGet)
  .post('/', controller.register)
  .get('/:id', controller.userDetail)
  .post('/login', controller.login)
  // .patch('/update/:id_user', controller.updateUser)
  .delete('/:id', controller.deleteUser)

module.exports = Router