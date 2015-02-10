var AuthController = require('../controllers/auth');

var router = require('express').Router();

var loginRouter = router.route('/login');

loginRouter.post(AuthController.login, function(req, res) { res.json(req.user.token); });

module.exports = router;