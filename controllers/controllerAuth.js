const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { UserModel } = require('../models/UserModel.js');
const { createError } = require('../middlewares/createError.js');


/**
 * 
 * @type{import('express').RequestHandler}
 */
const signUp = async (req, res, next) => {
  try {
    if (!req.body.password) throw new Error('No password was provided');

    const encryptedPassword = await bcrypt.hash(req.body.password, 10);
    const newUser = await UserModel
      .create({
        ...req.body,
        password: encryptedPassword
      });

    res.status(201).json({
      message: 'user created',
      userId: newUser.id
    });
  } catch (error) {
    next(error);
  }
};

/**
 * 
 * @type{import('express').RequestHandler}
 */
const logIn = async (req, res, next) => {
  try {
    const user = await UserModel.findOne({
      where: {
        name: req.body.name
      }
    });

    if (user) {
      const hasValidPassword = await bcrypt.compare(req.body.password, user.password);

      if (hasValidPassword) {
        const payload = { id: user.id, name: user.name };
        const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '3h' });
        res
          .cookie('access_token', token, { httpOnly: true })
          .status(200).json({
            message: 'logging successfull',
            user
          });
      } else {
        next(createError(401, 'Could not log in'));
      }

    } else {
      next(createError(404, 'Could not log in'));
    }
  } catch (error) {
    next(error);
  }
};

/**
 * 
 * @type{import('express').RequestHandler}
 */
const logOut = async (req, res, next) => {
  try {
    res.clearCookie('access_token').status(200).json({
      message: 'user logout'
    });
  } catch (error) {
    next(error);
  }
};

const controllerAuth = { signUp, logIn, logOut };

module.exports = { controllerAuth };
