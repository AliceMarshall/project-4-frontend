angular
  .module('borrowApp')
  .controller('MainCtrl', MainCtrl);

MainCtrl.$inject = ['$rootScope'];
function MainCtrl($rootScope){
  const vm = this;

  function stateChange(e, toState) {
    vm.pageName = toState.name;
  }

  $rootScope.$on('$stateChangeStart', stateChange);
}
