var Marty = require('marty');
var Router = require('../router');

var NavigationActionCreators = Marty.createActionCreators({
  displayName: 'Navigation',
  navigateHome: function () {
    navigateTo('home');
  },
  navigateToUsers: function (id) {
    navigateTo('users', { id: id });
  }
});

function navigateTo(route, params) {
  require('../router').transitionTo(route, params || {});
}

module.exports = NavigationActionCreators;