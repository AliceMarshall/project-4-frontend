angular
  .module('borrowApp')
  .factory('User', User);

User.$inject = ['$resource', 'API_URL'];
function User($resource, API_URL) {
  return new $resource(`${API_URL}/users/:id`, { id: '@id' }, {
    update: { method: 'PUT' },
    requestFriend: { method: 'POST', url: `${API_URL}/requestfriend`}
    // acceptFriend: { method: 'POST', url: `${API_URL}/users/:id/accept_friend/:friend_id`}
  });
}
