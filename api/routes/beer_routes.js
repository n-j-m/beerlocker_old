var BeerController = require('../controllers/beer');
var AuthController = require('../controllers/auth');

var router = require('express').Router();

router.use(AuthController.isAuthenticated);

var beersRoute = router.route('/beers');

beersRoute
  .get(BeerController.getBeers)
  .post(BeerController.postBeers);

var beerRoute = router.route('/beers/:beer_id');

beerRoute
  .get(BeerController.getBeer)
  .put(BeerController.putBeer)
  .delete(BeerController.deleteBeer);

module.exports = router;
