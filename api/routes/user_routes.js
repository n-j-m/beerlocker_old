var UserController = require('../controllers/user');

var AuthController = require('../controllers/auth');

var router = require('express').Router();

var usersRouter = router.route('/users');

usersRouter
  .get(AuthController.isAuthenticated, UserController.getUsers)
  .post(UserController.postUsers);

var userRouter = router.route('/users/:user_id');
userRouter.get(AuthController.isAuthenticated, UserController.getUser);

module.exports = router;
