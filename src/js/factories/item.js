angular
  .module('borrowApp')
  .factory('Item', Item);

Item.$inject = ['$resource', 'API_URI'];
function Item($resource, API_URI) {
  return new $resource(`${API_URI}/items/:id`, { id: '@id' }, {
    update: { method: 'PUT' }
  });
}
