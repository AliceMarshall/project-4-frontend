angular
  .module('borrowApp')
  .controller('ItemsIndexCtrl', ItemsIndexCtrl)
  .controller('ItemsNewCtrl', ItemsNewCtrl)
  .controller('ItemsShowCtrl', ItemsShowCtrl)
  .controller('ItemsEditCtrl', ItemsEditCtrl);

ItemsIndexCtrl.$inject = ['Item'];
function ItemsIndexCtrl(Item) {
  const vm = this;

  vm.all = Item.query();
}

ItemsNewCtrl.$inject = ['Item', 'User', '$state'];
function ItemsNewCtrl(Item, User, $state) {
  const vm = this;

  vm.user = User.query();

  function submit() {
    Item.save(vm.item)
      .$promise
      .then(() => $state.go('itemsIndex'));
  }

  vm.submit = submit;
}

ItemsShowCtrl.$inject = ['Item', '$stateParams', '$state'];
function ItemsShowCtrl(Item, $stateParams, $state) {
  const vm = this;

  vm.item = Item.get($stateParams);

  function itemDelete() {
    vm.item
      .$remove()
      .then(() => $state.go('itemsIndex'));
  }

  vm.delete = itemDelete;
}

ItemsEditCtrl.$inject = ['Item', 'User', '$stateParams', '$state'];
function ItemsEditCtrl(Item, User, $stateParams, $state) {
  const vm = this;

  vm.item = Item.get($stateParams);
  vm.users = User.query();

  function itemUpdate() {
    vm.item
      .$update()
      .then(() => $state.go('itemsShow', $stateParams));
  }

  vm.update = itemUpdate;
}
