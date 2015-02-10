var OAuth2Controller = require('../controllers/oauth2');
var AuthController = require('../controllers/auth');

var router = require('express').Router();

router.route('/oauth2/authorize')
  .get(AuthController.isAuthenticated, OAuth2Controller.authorization)
  .post(AuthController.isAuthenticated, OAuth2Controller.decision);

router.route('/oauth2/token')
  .post(AuthController.isClientAuthenticated, OAuth2Controller.token);

module.exports = router;