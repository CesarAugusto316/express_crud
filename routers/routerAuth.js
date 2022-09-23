const { Router } = require('express');
const { controllerAuth } = require('../controllers/controllerAuth.js');
const { validateToken } = require('../middlewares/validateToken.js');


const routerAuth = Router();

routerAuth.route('/signup').post(controllerAuth.signUp);
routerAuth.route('/login').post(controllerAuth.logIn);
routerAuth.route('/logout').get(validateToken, controllerAuth.logOut);

module.exports = { routerAuth };
