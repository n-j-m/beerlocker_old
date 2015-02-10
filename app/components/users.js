var React = require('react');
var Marty = require('marty');
var UsersStore = require('stores/usersStore');

var UsersState = Marty.createStateMixin({
  listenTo: [UsersStore],
  getState: function () {
    return {
      users: UsersStore.getById(this.props.id)
    };
  }
});

var Users = React.createClass({
  mixins: [UsersState],
  render: function () {
    return this.state.users.when({
      pending: function () {
        return <div className='loading'>Loading</div>;
      },
      error: function (error) {
        return <div className='error'>{error.message}</div>;
      },
      done: function (users) {
        return <div className='users'>{users}</div>;
      }
    });
  }
});

module.exports = Users;