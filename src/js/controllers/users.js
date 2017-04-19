angular
  .module('borrowApp')
  .controller('UsersIndexCtrl', UsersIndexCtrl)
  .controller('UsersFriendsCtrl', UsersFriendsCtrl)
  .controller('UsersShowCtrl', UsersShowCtrl);
  // .controller('UsersEditCtrl', UsersEditCtrl);

UsersIndexCtrl.$inject = ['User', '$auth'];
function UsersIndexCtrl(User, $auth) {
  const vm = this;

  vm.all = User.query();
  vm.currentUser = User.get({ id: $auth.getPayload().id });

  function requestFriend(user) {
    User
      .requestFriend({ friend_id: user.id })
      .$promise
      .then((friend) => {
        vm.currentUser = User.get({ id: $auth.getPayload().id });
      });
  }
  vm.requestFriend = requestFriend;

  function isFriend(user) {
    if (vm.currentUser.$resolved) {
      return vm.currentUser.friends.find((friend) => {
        return friend.id === user.id;
      });
    }
  }
  vm.isFriend = isFriend;

  function requested(user) {
    if (vm.currentUser.$resolved) {
      return vm.currentUser.friendships.find((friendship) => {
        return friendship.friend_id === user.id && (friendship.status === 'pending' || friendship.status === 'requested');
      });
    }
  }
  vm.requested = requested;
}

UsersFriendsCtrl.$inject = ['User', '$auth'];
function UsersFriendsCtrl(User, $auth) {
  const vm = this;

  vm.currentUser = [];

  function friendshipRequests() {
    User
      .get({ id: $auth.getPayload().id })
      .$promise
      .then((response) => {
        vm.pending = [];
        vm.currentUser = response;
        response.friendships.forEach((arr) => {
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
        friendshipRequests();
      });
  }
  vm.acceptFriend = acceptFriend;

  function declineFriend(user) {
    User
      .declineFriend({ friend_id: user.id })
      .$promise
      .then((friend) => friendshipRequests());
  }
  vm.declineFriend = declineFriend;

  function removeFriend(user) {
    User
      .removeFriend({ friend_id: user.id })
      .$promise
      .then((friend) => friendshipRequests());
  }
  vm.removeFriend = removeFriend;

  function ifPending(pending) {
    if (pending.$resolved && vm.currentUser.$resolved) {
      pending.friendships.find((friendship) => {
        console.log(friendship);
        return friendship.status === 'pending';
      });
    }
  }
  vm.ifPending = ifPending;
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
