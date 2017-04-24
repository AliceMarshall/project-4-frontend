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
      .then(() => $state.go('usersShow'));
  }

  vm.login = login;

  function authenticate(provider) {
   $auth.authenticate(provider)
    //  .then((user) => {
    //   console.log(user);
    //   $state.go('usersShow');
    //  });
     .then((user) => {
        if (!user.data.user.full_name || !user.data.user.username || !user.data.user.email || !user.data.user.image_src) {
         $state.go('usersEdit', {id: user.data.user.id });
        } else {
         $state.go('usersShow');
        }
    });
 }

 vm.authenticate = authenticate;
}
