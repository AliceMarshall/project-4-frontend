angular
  .module('borrowApp')
  .controller('UsersIndexCtrl', UsersIndexCtrl)
  .controller('UsersFriendsCtrl', UsersFriendsCtrl)
  .controller('UsersShowCtrl', UsersShowCtrl)
  .controller('UsersEditCtrl', UsersEditCtrl)
  .controller('SentRequestsCtrl', SentRequestsCtrl)
  .controller('ReceivedRequestsCtrl', ReceivedRequestsCtrl);

  // .controller('UsersEditCtrl', UsersEditCtrl);

UsersIndexCtrl.$inject = ['User', 'filterFilter', '$auth', '$scope'];
function UsersIndexCtrl(User, filterFilter, $auth, $scope) {
  const vm = this;

  vm.all = User.query();
  vm.currentUser = User.get({ id: $auth.getPayload().id });

  function requestFriend(user) {
    User
      .requestFriend({ friend_id: user.id })
      .$promise
      .then((friend) => {
        vm.currentUser = User.get({ id: $auth.getPayload().id });
      });
  }
  vm.requestFriend = requestFriend;

  function isFriend(user) {
    if (vm.currentUser.$resolved) {
      return vm.currentUser.friends.find((friend) => {
        return friend.id === user.id;
      });
    }
  }
  vm.isFriend = isFriend;

  function requested(user) {
    if (vm.currentUser.$resolved) {
      return vm.currentUser.friendships.find((friendship) => {
        return friendship.friend_id === user.id && (friendship.status === 'pending' || friendship.status === 'requested');
      });
    }
  }
  vm.requested = requested;

  function filterUsers() {
    const params = { full_name: vm.q };
    vm.filtered = filterFilter(vm.all, params);
  }

  $scope.$watchGroup([
    () => vm.q,
    () => vm.all.$resolved,
  ], filterUsers);

  filterUsers();

}

UsersFriendsCtrl.$inject = ['User', '$auth'];
function UsersFriendsCtrl(User, $auth) {
  const vm = this;

  vm.currentUser = [];

  function friendshipRequests() {
    User
      .get({ id: $auth.getPayload().id })
      .$promise
      .then((response) => {
        vm.pending = [];
        vm.currentUser = response;
        response.friendships.forEach((arr) => {
          if (arr.status === 'requested') {
            vm.pending.push(User.get({ id: arr.friend_id }));
          }
        });
      });
  }
  friendshipRequests();

  function acceptFriend(user) {
    User
      .acceptFriend({ friend_id: user.id })
      .$promise
      .then((friend) => {
        friendshipRequests();
      });
  }
  vm.acceptFriend = acceptFriend;

  function declineFriend(user) {
    User
      .declineFriend({ friend_id: user.id })
      .$promise
      .then((friend) => friendshipRequests());
  }
  vm.declineFriend = declineFriend;

  function removeFriend(user) {
    User
      .removeFriend({ friend_id: user.id })
      .$promise
      .then((friend) => friendshipRequests());
  }
  vm.removeFriend = removeFriend;

  function ifPending(pending) {
    if (pending.$resolved && vm.currentUser.$resolved) {
      vm.currentUser.friendships.find((friendship) => {
        console.log(friendship);
        return console.log(friendship.status === 'requested');
      });
    }
  }
  vm.ifPending = ifPending;
}

UsersShowCtrl.$inject = ['User', '$auth', '$state'];
function UsersShowCtrl(User, $auth, $state) {
  const vm = this;

  vm.user = User.get({ id: $auth.getPayload().id });
  console.log(vm.user);

  // function userDelete() {
  //   $auth.logout();
  //   vm.user
  //     .$remove()
  //     .then(() => $state.go('home'));
  // }
  //
  // vm.delete = userDelete;
}

SentRequestsCtrl.$inject = ['User', 'Request', 'Item', '$auth', '$state'];
function SentRequestsCtrl(User, Request, Item, $auth, $state) {
  const vm = this;

  vm.currentUser = [];
  vm.users = User.query();

  function getUser() {
    User
      .get({ id: $auth.getPayload().id })
      .$promise
      .then((response) => {
        vm.currentUser = response;
        getRequests();
      });
  }
  getUser();

  // function itemsRequests() {
  //   Request
  //     .get({ id: $auth.getPayload().id })
  //     .$promise
  //     .then((response) => {
  //       vm.pending = [];
  //       vm.currentUser = response;
  //       response.friendships.forEach((arr) => {
  //         if (arr.status === 'requested') {
  //           vm.pending.push(User.get({ id: arr.friend_id }));
  //         }
  //       });
  //     });
  // }

  function getRequests() {
    Request
      .query()
      .$promise
      .then((result) => {
        vm.requests = [];
        result.forEach((arr) => {
          if (arr.borrower_id === vm.currentUser.id) {
            vm.requests.push(arr);
          }
          findOwner(arr);
        });
      });
  }

  function findOwner(arr) {
    User
      .query()
      .$promise
      .then((response) => {
        vm.users = response;
        vm.users.find((user) => {
          if (user.id === arr.owner_id) {
            vm.owner = user;
          }
        });
      });
  }

  function cancelRequest(request) {
    vm.request = request;
    vm.request
      .$remove()
      .then((result) => getRequests());
  }
  vm.cancelRequest = cancelRequest;

  // vm.requests = Request.query({ borrower_id: $auth.getPayload().id });
}

ReceivedRequestsCtrl.$inject = ['User', 'Request', 'Item', '$auth'];
function ReceivedRequestsCtrl(User, Request, Item, $auth) {
  const vm = this;

  vm.currentUser = [];
  // vm.user = User.query();
  vm.items = Item.query();

  function getUser() {
    User
      .get({ id: $auth.getPayload().id })
      .$promise
      .then((response) => {
        vm.currentUser = response;
        getRequests();
      });
  }
  getUser();

  function getRequests() {
    Request
      .query()
      .$promise
      .then((result) => {
        vm.requests = [];
        result.forEach((arr) => {
          if (arr.owner_id === vm.currentUser.id && arr.status !== 'remove') {
            vm.requests.push(arr);
          }
          findBorrower(arr);
        });
      });
  }

  function findBorrower(arr) {
    User
      .query()
      .$promise
      .then((users) => {
        vm.users = users;
        vm.users.find((user) => {
          if (user.id === arr.borrower_id) {
            vm.borrower = user;
          }
        });
      });
  }

  function itemRequestAccept(request, item) {
    vm.request = request;
    vm.request.status = 'accepted';
    vm.request
      .$update()
      .then(() => console.log(vm.request));
    Item
      .get({ id: item.id })
      .$promise
      .then((response) => {
        vm.item = response;
        vm.item.available = false;
        vm.item
          .$update()
          .then(() => console.log(vm.item));
      });
  }
  vm.itemRequestAccept = itemRequestAccept;

  function itemRequestReject(request) {
    vm.request = request;
    vm.request.status = 'rejected';
    vm.request
      .$update()
      .then(() => console.log(vm.request));
  }
  vm.itemRequestReject = itemRequestReject;

}


UsersEditCtrl.$inject = ['User', '$state', '$auth'];
function UsersEditCtrl(User, $state, $auth) {
  const vm = this;

  vm.user = User.get({ id: $auth.getPayload().id });

  function userUpdate() {
    vm.user
      .$update()
      .then(() => $state.go('usersShow'));
  }

  vm.update = userUpdate;
}
