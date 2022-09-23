const { Router } = require('express');
const { controllerTodos } = require('../controllers/controllerTodos.js');
const { validateToken } = require('../middlewares/validateToken.js');


const routerTodo = Router();

routerTodo.route('/')
  .get(controllerTodos.getAll)
  .post(validateToken, controllerTodos.create);

routerTodo.route('/:id')
  .get(validateToken, controllerTodos.getById)
  .patch(validateToken, controllerTodos.update)
  .delete(validateToken, controllerTodos.remove);

module.exports = { routerTodo };
