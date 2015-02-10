var ClientController = require('../controllers/client');
var AuthController = require('../controllers/auth');

var router = require('express').Router();

router.route('/clients')
  .post(AuthController.isAuthenticated, ClientController.postClients)
  .get(AuthController.isAuthenticated, ClientController.getClients);

module.exports = router;