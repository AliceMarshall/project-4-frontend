angular
  .module('borrowApp')
  .controller('ItemsIndexCtrl', ItemsIndexCtrl)
  // .controller('ItemsNewCtrl', ItemsNewCtrl)
  .controller('ItemsShowCtrl', ItemsShowCtrl);
  // .controller('ItemsEditCtrl', ItemsEditCtrl);

ItemsIndexCtrl.$inject = ['Item'];
function ItemsIndexCtrl(Item) {
  const vm = this;

  vm.all = Item.query();

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
