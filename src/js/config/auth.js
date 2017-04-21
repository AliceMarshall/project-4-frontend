angular
  .module('borrowApp')
  .config(Auth);

Auth.$inject = ['$authProvider', 'API_URL'];

function Auth($authProvider, API_URL){
  $authProvider.signupUrl = `${API_URL}/register`;
  $authProvider.loginUrl = `${API_URL}/login`;

  $authProvider.github({
   clientId: 'f791bcd068275a7520c5',
   url: `${API_URL}/oauth/github`
 });
}
