angular
  .module('borrowApp')
  .controller('ItemsIndexCtrl', ItemsIndexCtrl);
  // .controller('ItemsNewCtrl', ItemsNewCtrl)
  // .controller('ItemsShowCtrl', ItemsShowCtrl)
  // .controller('ItemsEditCtrl', ItemsEditCtrl);

ItemsIndexCtrl.$inject = ['Item'];
function ItemsIndexCtrl(Item) {
  const vm = this;

  vm.all = Item.query();

}
