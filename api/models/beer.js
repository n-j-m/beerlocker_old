var mongoose = require('mongoose');

var BeerSchema = mongoose.Schema({
  name: String,
  type: String,
  quality: Number,
  userId: String
});

module.exports = mongoose.model('Beer', BeerSchema);
