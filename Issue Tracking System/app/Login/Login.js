'use strict';

angular.module('issueTrackingSystem.login', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/login', {
    templateUrl: 'app/Login/Login.html',
    controller: 'LoginCtrl'
  });
}])

.controller('LoginCtrl', ['$scope','authentication','$location',function($scope,authentication,$location) {
  $scope.Login = function (user) {
    authentication.loginUser(user).then(function (loggedIn) {
      $location.path('/dashboard');
    });

  }
}]);