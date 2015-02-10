var Client = require('../models/client');

var ClientController = {

  postClients: function postClients(req, res) {
    var client = new Client();

    client.name = req.body.name;
    client.id = req.body.id;
    client.secret = req.body.secret;
    client.userId = req.user._id;

    // save the client
    client.save(function(err, savedClient) {
      if (err) return res.send(err);

      res.json(savedClient);
    });
  },

  getClients: function getClients(req, res) {
    // use client model to find all clients
    Client.find({ userId: req.user._id }, function(err, client) {
      if (err) return res.send(err);

      res.json(clients);
    });
  }

};

module.exports = ClientController;