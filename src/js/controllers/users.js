angular
  .module('borrowApp')
  .controller('UsersIndexCtrl', UsersIndexCtrl);
  // .controller('UsersShowCtrl', UsersShowCtrl)
  // .controller('UsersEditCtrl', UsersEditCtrl);

UsersIndexCtrl.$inject = ['User'];
function UsersIndexCtrl(User) {
  const vm = this;

  vm.all = User.query();
}
//
// UsersShowCtrl.$inject = ['User', '$stateParams', '$state'];
// function UsersShowCtrl(User, $stateParams, $state) {
//   const vm = this;
//
//   vm.item = User.get($stateParams);
//
//   function itemDelete() {
//     vm.item
//       .$remove()
//       .then(() => $state.go('itemsIndex'));
//   }
//
//   vm.delete = itemDelete;
// }
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
