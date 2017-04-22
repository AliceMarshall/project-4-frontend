angular
  .module('borrowApp')
  .config(Router);

Router.$inject = ['$urlRouterProvider', '$locationProvider', '$stateProvider'];
function Router($urlRouterProvider, $locationProvider, $stateProvider) {
  $locationProvider.html5Mode(true);

  $stateProvider
    .state('home', {
      url: '/home',
      templateUrl: 'js/views/home.html'
    })
    .state('itemsIndex', {
      url: '/items',
      templateUrl: 'js/views/items/index.html',
      controller: 'ItemsIndexCtrl as itemsIndex'
    })
    .state('itemsNew', {
      url: '/items/new',
      templateUrl: 'js/views/items/new.html',
      controller: 'ItemsNewCtrl as itemsNew'
    })
    .state('itemsShow', {
      url: '/items/:id',
      templateUrl: 'js/views/items/show.html',
      controller: 'ItemsShowCtrl as itemsShow'
    })
    .state('itemsEdit', {
      url: '/items/:id/edit',
      templateUrl: 'js/views/items/edit.html',
      controller: 'ItemsEditCtrl as itemsEdit'
    })
    .state('categoriesIndex', {
      url: '/categories',
      templateUrl: 'js/views/categories/index.html',
      controller: 'CategoriesIndexCtrl as categoriesIndex'
    })
    .state('usersIndex', {
      url: '/users',
      templateUrl: 'js/views/users/index.html',
      controller: 'UsersIndexCtrl as usersIndex'
    })
    .state('usersShow', {
      url: '/profile',
      templateUrl: 'js/views/users/profile.html',
      controller: 'UsersShowCtrl as usersShow'
    })
    .state('usersEdit', {
      url: '/profile/edit',
      templateUrl: 'js/views/users/edit.html',
      controller: 'UsersEditCtrl as usersEdit'
    })
    .state('usersFriends', {
      url: '/profile/friends',
      templateUrl: 'js/views/users/friends.html',
      controller: 'UsersFriendsCtrl as usersFriends'
    })
    .state('sentRequests', {
      url: '/profile/sentrequests',
      templateUrl: 'js/views/users/sentRequests.html',
      controller: 'SentRequestsCtrl as sentRequests'
    })
    .state('receivedRequests', {
      url: '/profile/receivedrequests',
      templateUrl: 'js/views/users/receivedRequests.html',
      controller: 'ReceivedRequestsCtrl as receivedRequests'
    })
    .state('register', {
      url: '/register',
      templateUrl: 'js/views/auth/register.html',
      controller: 'RegisterCtrl as register'
    })
    .state('login', {
      url: '/login',
      templateUrl: 'js/views/auth/login.html',
      controller: 'LoginCtrl as login'
    });

  $urlRouterProvider.otherwise('/home');

}
