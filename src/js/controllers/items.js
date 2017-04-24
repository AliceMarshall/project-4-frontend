angular
  .module('borrowApp')
  .controller('ItemsIndexCtrl', ItemsIndexCtrl)
  .controller('ItemsNewCtrl', ItemsNewCtrl)
  .controller('ItemsShowCtrl', ItemsShowCtrl)
  .controller('ItemsEditCtrl', ItemsEditCtrl);

ItemsIndexCtrl.$inject = ['Item', 'User', 'Category', 'filterFilter', '$scope', '$auth'];
function ItemsIndexCtrl(Item, User, Category, filterFilter, $scope, $auth) {
  const vm = this;

  vm.all = [];
  vm.currentUser = null;

  function checkItem(allItems, item) {
    const found = allItems.some((theItem) => item.id === theItem.id);
    if (!found) {
      allItems.push(item);
    }
  }

  function getUserItems() {
    User
      .get({ id: $auth.getPayload().id })
      .$promise
      .then((user) => {
        vm.currentUser = user;
        Item
          .query()
          .$promise
          .then((items) => {
            console.log('everything', items);
            items.forEach((item) => {
              console.log(item);
              if (item.available && item.friend_level === 'friends') {
                item.user.friends.forEach((user) => {
                  if (user.id === vm.currentUser.id) {
                    checkItem(vm.all, item);
                  }
                });
              } else if (item.available && item.friend_level === 'everyone') {
                checkItem(vm.all, item);
              }
              filterItem();
            });
          });
        });
  }
  getUserItems();

  vm.category = '';
  vm.categories = Category.query();

  function filterItem() {
    const params = { name: vm.q, user: { full_name: vm.k }, category: { id: vm.category } };
    vm.filtered = filterFilter(vm.all, params);
  }

  $scope.$watchGroup([
    () => vm.q,
    () => vm.k,
    () => vm.all.$resolved,
    () => vm.category
  ], filterItem);

  filterItem();
}

ItemsNewCtrl.$inject = ['Item', 'User', 'Category', '$state'];
function ItemsNewCtrl(Item, User, Category, $state) {
  const vm = this;

  vm.user = User.query();
  vm.categories = Category.query();

  function submit() {
    vm.item.available = true;
    Item.save(vm.item)
      .$promise
      .then(() => $state.go('itemsIndex'));
  }

  vm.submit = submit;
}

ItemsShowCtrl.$inject = ['Item', 'User', 'Comment', 'Request', '$stateParams', '$state', '$auth'];
function ItemsShowCtrl(Item, User, Comment, Request, $stateParams, $state, $auth) {
  const vm = this;

  if ($auth.getPayload()) vm.currentUser = User.get({ id: $auth.getPayload().id });
  vm.item = Item.get($stateParams);
  vm.request = {};

  function itemDelete() {
    vm.item.comments = [];
    vm.item
      .$remove()
      .then(() => $state.go('itemsIndex'));
  }
  vm.delete = itemDelete;

  function addComment() {
    vm.comment.item_id = vm.item.id;
    Comment
      .save({ comment: vm.comment })
      .$promise
      .then((comment) => {
        vm.item.comments.push(comment);
        vm.comment = {};
      });
  }
  vm.addComment = addComment;

  function deleteComment(comment) {
    Comment
      .delete({ id: comment.id })
      .$promise
      .then(() => {
        const index = vm.item.comments.indexOf(comment);
        vm.item.comments.splice(index, 1);
      });
  }
  vm.deleteComment = deleteComment;

  function makeRequest() {
    vm.request.status = 'pending';
    vm.request.item_id = vm.item.id;
    vm.request.owner_id = vm.item.user.id;
    vm.request.borrower_id = vm.currentUser.id;
    Request.save(vm.request)
      .$promise
      .then(() => {
        console.log(vm.request);
      });
  }
  vm.makeRequest = makeRequest;

  function requested(request) {
    Request
      .query()
      .$promise
      .then((requests) => {
        vm.requests = requests;
        // vm.request.
      });
    // if (vm.currentUser.$resolved) {
    //   return vm.currentUser.friendships.find((friendship) => {
    //     return friendship.friend_id === user.id && (friendship.status === 'pending' || friendship.status === 'requested');
    //   });
    // }
  }
  vm.requested = requested;

  function editAvailable() {
    if (vm.item.available) {
      vm.item.available = false;
    } else {
      vm.item.available = true;
    }
    vm.item
      .$update()
      .then(() => console.log(vm.item));
  }
  vm.editAvailable = editAvailable;
}

ItemsEditCtrl.$inject = ['Item', 'User', 'Category', '$stateParams', '$state'];
function ItemsEditCtrl(Item, User, Category, $stateParams, $state) {
  const vm = this;

  vm.item = Item.get($stateParams);
  vm.users = User.query();
  vm.categories = Category.query();

  function itemUpdate() {
    vm.item
      .$update()
      .then(() => $state.go('itemsShow', $stateParams));
  }
  vm.update = itemUpdate;
}
