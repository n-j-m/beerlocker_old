var config = require('./config');

module.exports = {
  getConfig: function(key) {
    if (!config[key]) throw new Error(key + ' not found');
    
    return config[key];
  }
};
