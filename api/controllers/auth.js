var passport = require('passport');
var BasicStrategy = require('passport-http').BasicStrategy;
var BearerStrategy = require('passport-http-bearer').Strategy;
var User = require('../models/user');
var Client = require('../models/client');
var Token = require('../models/token');

passport.use(new BasicStrategy(
  function basicHandler(username, password, done) {
    User.findOne({ username: username }, function(err, user) {
      console.log('basic err:', err);
      console.log('user:', user);
      if (err) return done(err);

      if (!user) return done(null, false);

      user.verifyPassword(password, function(err, isMatch) {
        if (err) return done(err);

        if (!isMatch) return done(null, false);

        return done(null, user);
      });
    });
  }
));

passport.use('client-basic', new BasicStrategy(
  function clientBasicHandler(username, password, done) {
    Client.findOne({ id: username }, function(err, client) {
      console.log('client err:', err);
      console.log('client:', client);
      if (err) return done(err);

      if (!client || client.secret !== password) return done(null, false);

      return done(null, client);
    });
  }
));

passport.use(new BearerStrategy(
  function bearerHandler(token, done) {
    Token.findOne({ value: token }, function(err, token) {
      console.log('token err:', err);
      console.log('token:', token);
      if (err) return done(err);

      if (!token) return done(null, false);

      User.findOne({ _id: token.userId }, function(err, user) {
        if (err) return done(err);

        if (!user) return done(null, false);

        done(null, user, { scope: '*' });
      })
    })
  }
));

module.exports = {
  isAuthenticated: passport.authenticate(['basic', 'bearer'], { session: true }),
  isClientAuthenticated: passport.authenticate('client-basic', {session: true}),
  isBearerAuthenticated: passport.authenticate('bearer', { session: true })
};
