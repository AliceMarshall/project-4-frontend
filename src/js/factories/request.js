angular
  .module('borrowApp')
  .factory('Request', Request);

Request.$inject = ['$resource', 'API_URL'];
function Request($resource, API_URL) {
  return new $resource(`${API_URL}/requests/:id`, { id: '@id' }, {
    update: { method: 'PUT' }
  });
}
