var express = require('express');
var config = require('./config');

var versionedRouter = express.Router();

var beerRouter = require('./routes/beer_routes');

var userRouter = require('./routes/user_routes');

var clientRouter = require('./routes/client_routes');

var oAuthRouter = require('./routes/oauth_routes');

versionedRouter.use(config.getConfig('apiVersion'), clientRouter, oAuthRouter, userRouter, beerRouter);

module.exports = versionedRouter;
