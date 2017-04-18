angular
  .module('borrowApp')
  .controller('UsersIndexCtrl', UsersIndexCtrl)
  // .controller('UsersFriendsCtrl', UsersFriendsCtrl)

  .controller('UsersShowCtrl', UsersShowCtrl);
  // .controller('UsersEditCtrl', UsersEditCtrl);

UsersIndexCtrl.$inject = ['User'];
function UsersIndexCtrl(User) {
  const vm = this;

  vm.all = User.query();

  function requestFriend(user) {
    console.log(user);
    User
      .requestFriend({ friend_id: user.id })
      .$promise
      .then((friend) => console.log(friend));
  }

  vm.requestFriend = requestFriend;

}

// UsersFriendsCtrl.$inject = ['User'];
// function UsersFriendsCtrl(User) {
//   const vm = this;
//
//   vm.all = User.query();
// }
//
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
