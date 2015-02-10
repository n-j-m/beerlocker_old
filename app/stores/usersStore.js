var _ = require('lodash');
var Marty = require('marty');
var UsersConstants = require('constants/usersConstants');
var UsersHttpStateSource = require('sources/usersHttpStateSource');

var UsersStore = Marty.createStore({
  displayName: 'UsersStore',
  handlers: {
    addUsers: UsersConstants.ADD_USERS
  },
  getInitialState: function () {
    return {};
  },
  getAll: function () {
    return _.values(this.state);
  },
  addUsers: function (users) {
    this.state[users.id] = users;
    this.hasChanged();
  },
  getById: function (id) {
    return this.fetch(id,
      function () {
        return this.state[id];
      },
      function () {
        return UsersHttpStateSource.getById(id);
      }
    );
  }
});

module.exports = UsersStore;