angular
  .module('borrowApp')
  .controller('ItemsIndexCtrl', ItemsIndexCtrl)
  .controller('ItemsNewCtrl', ItemsNewCtrl)
  .controller('ItemsShowCtrl', ItemsShowCtrl)
  .controller('ItemsEditCtrl', ItemsEditCtrl);

ItemsIndexCtrl.$inject = ['Item'];
function ItemsIndexCtrl(Item) {
  const vm = this;

  vm.all = Item.query();
}

ItemsNewCtrl.$inject = ['Item', 'User', 'Category', '$state'];
function ItemsNewCtrl(Item, User, Category, $state) {
  const vm = this;

  vm.user = User.query();
  vm.categories = Category.query();

  function submit() {
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
