const { createError } = require('../middlewares/createError.js');
const { TodoModel } = require('../models/TodosModel.js');


/**
 * 
 * @type {import('express').RequestHandler}
 */
const getAll = async (req, res, next) => {
  try {
    const todos = await TodoModel.findAll();
    if (todos) {
      res.status(200).json({
        status: 'success',
        message: 'Todos fetched.',
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
  try {
    const todo = await TodoModel.findOne({
      where: {
        id: req.params.id
      }
    });
    if (todo) {
      res.status(200).json({
        status: 'success',
        message: 'Todo found.',
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
  try {
    const newTodo = await TodoModel.create(req.body);
    if (newTodo) {
      res.status(201).json({
        status: 'success',
        message: 'Todo created.',
        todo: newTodo
      });
    } else {
      next(createError(500, 'Todo cannot be created.'));
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
        status: 'success',
        message: 'Todo updated.',
        todo
      });
    } else {
      next(createError(500, 'Todo cannot be updated.'));
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
  try {
    await TodoModel.destroy(req.params.id);
    res.status(200).json({
      status: 'success',
      message: 'Todo deleted.',
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
