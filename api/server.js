var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var passport = require('passport');
var path = require('path');
var session = require('express-session');

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/beerlocker');

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: true }));

// Serve client app
app.use(express.static(path.join(__dirname, '..', 'dist')));

app.use(passport.initialize());

var router = require('./router');

// Serve api
app.use('/api', router);

app.get('/', require('./routes/index_route'));

module.exports = app;