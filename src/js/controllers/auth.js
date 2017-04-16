angular
  .module('borrowApp')
  .controller('RegisterCtrl', RegisterCtrl)
  .controller('LoginCtrl', LoginCtrl);

RegisterCtrl.$inject = ['$auth', '$state'];
function RegisterCtrl($auth, $state) {
  const vm = this;

  function register() {
    $auth.signup(vm.user)
      .then(() => $state.go('login'));
  }

  vm.register = register;
}

LoginCtrl.$inject = ['$auth', '$state'];
function LoginCtrl($auth, $state) {
  const vm = this;

  function login() {
    $auth.login(vm.credentials)
      .then(() => $state.go('usersIndex'));
  }

  vm.login = login;

  // function authenticate(provider) {
  //   $auth.authenticate(provider)
  //     .then(user => console.log(user));
  // }
  //
  // vm.authenticate = authenticate;
}
