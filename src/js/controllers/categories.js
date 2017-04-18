angular
  .module('borrowApp')
  .controller('CategoriesIndexCtrl', CategoriesIndexCtrl);
  // .controller('CategorysNewCtrl', CategorysNewCtrl)
  // .controller('CategorysShowCtrl', CategorysShowCtrl)
  // .controller('CategorysEditCtrl', CategorysEditCtrl);

CategoriesIndexCtrl.$inject = ['Category'];
function CategoriesIndexCtrl(Category) {
  const vm = this;

  vm.all = Category.query();
}

// CategorysNewCtrl.$inject = ['Category', 'User', 'Category', '$state'];
// function CategorysNewCtrl(Category, User, Category, $state) {
//   const vm = this;
//
//   vm.user = User.query();
//   vm.category = Category.query();
//
//   function submit() {
//     Category.save(vm.item)
//       .$promise
//       .then(() => $state.go('itemsIndex'));
//   }
//
//   vm.submit = submit;
// }
//
// CategorysShowCtrl.$inject = ['Category', '$stateParams', '$state'];
// function CategorysShowCtrl(Category, $stateParams, $state) {
//   const vm = this;
//
//   vm.item = Category.get($stateParams);
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
// CategorysEditCtrl.$inject = ['Category', 'User', '$stateParams', '$state'];
// function CategorysEditCtrl(Category, User, $stateParams, $state) {
//   const vm = this;
//
//   vm.item = Category.get($stateParams);
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
