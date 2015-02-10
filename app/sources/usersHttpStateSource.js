var Marty = require('marty');
var UsersSourceActionCreators = require('actions/usersSourceActionCreators');

var UsersHttpStateSource = Marty.createStateSource({
  type: 'http',
  displayName: 'UsersHttpStateSource',
  getById: function (id) {
    return this.get('/api/users/' + id).then(function (res) {
      return UsersSourceActionCreators.addUsers(res.body);
    });
  }
});

module.exports = UsersHttpStateSource;