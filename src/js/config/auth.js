angular
  .module('borrowApp')
  .config(Auth);

Auth.$inject = ['$authProvider', 'API_URL'];

function Auth($authProvider, API_URL){
  $authProvider.signupUrl = `${API_URL}/register`;
  $authProvider.loginUrl = `${API_URL}/login`;

  $authProvider.github({
   clientId: 'eaa2154c67ea0d08b833',
   url: `${API_URL}/oauth/github`
 });
}
