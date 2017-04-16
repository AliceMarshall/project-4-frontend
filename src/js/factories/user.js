angular
  .module('borrowApp')
  .factory('User', User);

User.$inject = ['$resource', 'API_URI'];
function User($resource, API_URI) {
  return new $resource(`${API_URI}/users/:id`, { id: '@id' }, {
    update: { method: 'PUT' }
  });
}
