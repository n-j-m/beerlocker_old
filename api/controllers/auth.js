var passport = require('passport');
var BasicStrategy = require('passport-http').BasicStrategy;
var BearerStrategy = require('passport-http-bearer').Strategy;
var User = require('../models/user');

passport.use(new BasicStrategy(
  function(username, password, done) {
    User.findOne({ username: username }, 'token', function(err, user) {
      if (err) return done(err);

      if (!user) return done(null, false);

      user.verifyPassword(password, function(err, isMatch) {
        if (err) return done(err);

        if (!isMatch) return done(null, false);

        return done(null, user.token);
      });
    });
  }
));

passport.use(new BearerStrategy(function(token, done) {
  User.findOne({ token: token }, function(err, user) {
    done(err, user);
  });
}));

module.exports = {
  login: passport.authenticate('basic', { session: false }),
  isAuthenticated: passport.authenticate('bearer', { session: false })
};
