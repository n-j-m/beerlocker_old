var express = require('express');
var config = require('./config');

var versionedRouter = express.Router();

var beerRouter = require('./routes/beer_routes');

var userRouter = require('./routes/user_routes');

var loginRouter = require('./routes/auth_routes');

versionedRouter.use(config.getConfig('apiVersion'), loginRouter, userRouter, beerRouter);

module.exports = versionedRouter;
