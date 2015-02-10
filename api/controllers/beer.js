var Beer = require('../models/beer');

module.exports = {
  postBeers: function(req, res) {
    var beer = new Beer();

    beer.name = req.body.name;
    beer.type = req.body.type;
    beer.quality = req.body.quality;
    beer.userId = req.user._id;

    beer.save(function(err, savedBeer) {
      if (err) return res.send(err);

      res.json(savedBeer);
    });
  },

  getBeers: function(req, res) {
    Beer.find({ userId: req.user._id }, function(err, beers) {
      if (err) return res.send(err);

      res.json(beers);
    });
  },

  getBeer: function(req, res) {
    Beer.find({ userId: req.user._id, _id: req.params.beer_id }, function(err, beer) {
      if (err) return res.send(err);
      res.json(beer);
    });
  },

  putBeer: function(req, res) {
    Beer.find({ userId: req.user._id, _id: req.params.beer_id }, function(err, beer) {
      if (err) return res.send(err);

      beer.quality = req.body.quality;

      beer.save(function(err, savedBeer) {
        if (err) res.send(err);
        res.json(savedBeer);
      });
    });
  },

  deleteBeer: function(req, res) {
    Beer.remove({userId: req.user._id, _id: req.params.beer_id }, function(err, deletedBeer) {
      if (err) res.send(err);

      res.json(deletedBeer);
    });
  }
};
