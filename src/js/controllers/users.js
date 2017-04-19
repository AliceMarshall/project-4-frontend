angular
  .module('borrowApp')
  .controller('UsersIndexCtrl', UsersIndexCtrl)
  .controller('UsersFriendsCtrl', UsersFriendsCtrl)
  .controller('UsersShowCtrl', UsersShowCtrl);
  // .controller('UsersEditCtrl', UsersEditCtrl);

UsersIndexCtrl.$inject = ['User'];
function UsersIndexCtrl(User) {
  const vm = this;

  vm.all = User.query();

  function requestFriend(user) {
    User
      .requestFriend({ friend_id: user.id })
      .$promise
      .then((friend) => console.log(friend));
  }

  vm.requestFriend = requestFriend;
}

UsersFriendsCtrl.$inject = ['User', '$auth'];
function UsersFriendsCtrl(User, $auth) {
  const vm = this;

  vm.user = [];
  vm.pending = [];

  function friendshipRequests() {
    User
      .get({ id: $auth.getPayload().id })
      .$promise
      .then((response) => {
        vm.user = response;
        (response.friendships).forEach((arr) => {
          if (arr.status === 'requested' || arr.status === 'pending') {
            vm.pending.push(User.get({ id: arr.friend_id }));
          }
        });
      });
  }
  friendshipRequests();

  function acceptFriend(user) {
    User
      .acceptFriend({ friend_id: user.id })
      .$promise
      .then((friend) => {
        // const index = vm.user.attendee_ids.indexOf(vm.currentUser.id);
        // if (index > -1) {
        //   vm.event.attendee_ids.splice(index, 1);
        //   vm.event.attendees.splice(index, 1);
        // } else {
        //   vm.event.attendee_ids.push(vm.currentUser.id);
        //   vm.event.attendees.push(vm.currentUser);
        // }
        console.log(friend);
      });
  }
  vm.acceptFriend = acceptFriend;

  function declineFriend(user) {
    User
      .declineFriend({ friend_id: user.id })
      .$promise
      .then((friend) => console.log(friend));
  }
  vm.declineFriend = declineFriend;

  function removeFriend(user) {
    User
      .removeFriend({ friend_id: user.id })
      .$promise
      .then((friend) => console.log(friend));
  }
  vm.removeFriend = removeFriend;
}

UsersShowCtrl.$inject = ['User', '$auth', '$state'];
function UsersShowCtrl(User, $auth, $state) {
  const vm = this;

  vm.user = User.get({ id: $auth.getPayload().id });
  console.log(vm.user);
  // function itemDelete() {
  //   vm.user
  //     .$remove()
  //     .then(() => $state.go('itemsIndex'));
  // }

  // vm.delete = itemDelete;
}
//
// UsersEditCtrl.$inject = ['User', 'User', '$stateParams', '$state'];
// function UsersEditCtrl(User, User, $stateParams, $state) {
//   const vm = this;
//
//   vm.item = User.get($stateParams);
//   vm.users = User.query();
//
//   function itemUpdate() {
//     vm.item
//       .$update()
//       .then(() => $state.go('itemsShow', $stateParams));
//   }
//
//   vm.update = itemUpdate;
// }
