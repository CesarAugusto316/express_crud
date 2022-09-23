const jwt = require('jsonwebtoken');
const { createError } = require('./createError.js');


/**
 * @typedef User
 *  @property {number} id
 *  @property {string} name
 */

/**
 * @type {import('express').RequestHandler}
 */
const validateToken = (req, res, next) => {
  const accessToken = req.cookies['access_token'];

  if (!accessToken) {
    return next(createError(401, 'You are not authenticated'));
  }

  jwt.verify(
    accessToken, process.env.JWT_SECRET,
    /**
     * @param {User} userPayload decoded token
     */
    (err, userPayload) => {
      if (err) {
        return next(createError(403, 'Token is not valid'));
      }

      req.userPayload = userPayload; // adding the decoded payload token to the request obj.
      next();
    });
};


module.exports = { validateToken };
