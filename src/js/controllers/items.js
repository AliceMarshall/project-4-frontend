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
            items.forEach((item) => {
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
  vm.request = {};

  function getItem() {
    Item
      .get($stateParams)
      .$promise
      .then((item) => vm.item = item);
  }
  getItem();

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
        const requestHide = document.getElementById('requestHide');
        requestHide.style.display = 'none';
        const requestShow = document.getElementById('requestShow');
        requestShow.style.display = 'block';
      });
  }
  vm.makeRequest = makeRequest;

  function requested() {
    Request
      .query()
      .$promise
      .then((requests) => {
        console.log('requests',requests);
        vm.requests = requests;
        vm.requests.forEach((request) => {
          Item
            .get($stateParams)
            .$promise
            .then((item) => {
              vm.item = item;
              if (request.borrower_id === vm.currentUser.id && request.item.id === vm.item.id) {
                vm.requestedTrue = true;
                console.log(vm.requestedTrue);
              }
          });
        });
      });
  }
  requested();

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
