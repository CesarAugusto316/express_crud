const { createError } = require('../middlewares/createError.js');
const { TodoModel } = require('../models/TodosModel.js');


/**
 * 
 * @type {import('express').RequestHandler}
 */
const getAll = async (req, res, next) => {
  console.log(req.userPayload);
  try {
    const todos = await TodoModel.findAll();
    if (todos) {
      res.status(200).json({
        todos
      });
    } else {
      next(createError(404, 'Todos not found.'));
    }
  } catch (error) {
    next(error);
  }
};

/**
 * 
 * @type {import('express').RequestHandler}
 */
const getById = async (req, res, next) => {
  console.log(req.userPayload);
  try {
    const todo = await TodoModel.findOne({
      where: {
        id: req.params.id
      }
    });
    if (todo) {
      res.status(200).json({
        todo
      });
    } else {
      next(createError(404, 'Todo not found.'));
    }
  } catch (error) {
    next(error);
  }
};

/**
 * 
 * @type {import('express').RequestHandler}
 */
const create = async (req, res, next) => {
  console.log(req.userPayload);
  try {
    const newTodo = await TodoModel.create(req.body);
    if (newTodo) {
      res.status(201).json({
        todo: newTodo
      });
    } else {
      next(createError(400, 'Todo cannot be created.'));
    }
  } catch (error) {
    next(error);
  }
};

/**
 * 
 * @type {import('express').RequestHandler}
 */
const update = async (req, res, next) => {
  console.log(req.userPayload);
  try {
    const todo = await TodoModel.findOne({
      where: {
        id: req.params.id
      }
    });
    if (todo) {
      todo.set({
        ...req.body
      })
        .save();

      res.status(200).json({
        todo
      });
    } else {
      next(createError(404, 'Todo cannot be updated.'));
    }
  } catch (error) {
    next(error);
  }
};

/**
 * 
 * @type {import('express').RequestHandler}
 */
const remove = async (req, res, next) => {
  console.log(req.userPayload);
  try {
    await TodoModel.destroy({
      where: {
        id: req.params.id
      }
    });
    res.status(200).json({
      todo: null
    });
  } catch (error) {
    next(error);
  }
};

const controllerTodos = {
  getAll,
  getById,
  create,
  update,
  remove
};

module.exports = { controllerTodos };
