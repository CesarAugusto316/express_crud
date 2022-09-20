const { Router } = require('express');
const { controllerTodos } = require('../controllers/controllerTodos.js');


const routerTodo = Router();

routerTodo.route('/')
  .get(controllerTodos.getAll)
  .post(controllerTodos.create);

routerTodo.route('/:id')
  .get(controllerTodos.getById)
  .patch(controllerTodos.update)
  .delete(controllerTodos.remove);

module.exports = { routerTodo };
