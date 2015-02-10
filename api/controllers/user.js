var User = require('../models/user');
var uuid = require('node-uuid');

module.exports = {
  postUsers: function(req, res) {
    var user = new User({
      username: req.body.username,
      password: req.body.password
    });

    user.save(function(err, savedUser) {
      if (err) return res.send(err);
      res.json(savedUser);
    });
  },

  getUsers: function(req, res) {
    User.find(function(err, users) {
      if (err) return res.send(err);
      res.json(users);
    });
  },

  getUser: function(req, res) {
    User.findById(req.params.user_id, function(err, user) {
      if (err) return res.send(err);
      res.json(user);
    });
  }
};
