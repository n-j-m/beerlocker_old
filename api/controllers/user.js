var User = require('../models/user');
var uuid = require('node-uuid');

module.exports = {
  postUsers: function(req, res) {
    var user = new User({
      username: req.body.username,
      password: req.body.password,
      token: uuid.v4()
    });

    user.save(function(err, savedUser) {
      if (err) return res.send(err);
      res.json(savedUser);
    });
  },

  getUsers: function(req, res) {
    var q = User.find().select('-token').exec(function(err, users) {
      if (err) return res.send(err);
      res.json(users);
    });
  },

  getUser: function(req, res) {
    User.findById(req.params.user_id, '-token', function(err, user) {
      if (err) return res.send(err);
      res.json(user);
    });
  }
};
