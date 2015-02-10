var express = require('express');
var config = require('./config');

var versionedRouter = express.Router();

var beerRouter = require('./routes/beer_routes');

var userRouter = require('./routes/user_routes');

versionedRouter.use(config.getConfig('apiVersion'), userRouter, beerRouter);

module.exports = versionedRouter;
