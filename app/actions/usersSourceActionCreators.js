var Marty = require('marty');
var UsersConstants = require('constants/usersConstants');

var UsersSourceActionCreators = Marty.createActionCreators({
  displayName: 'UsersSourceActionCreators',
  addUsers: UsersConstants.ADD_USERS(function (users) {
    this.dispatch(users);
  })
});

module.exports = UsersSourceActionCreators;