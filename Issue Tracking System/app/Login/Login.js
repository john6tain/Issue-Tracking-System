'use strict';

angular.module('issueTrackingSystem.login', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/login', {
    templateUrl: 'app/Login/Login.html',
    controller: 'LoginCtrl'
  });
}])

.controller('LoginCtrl', ['$scope',function($scope) {

  $scope.Login = function (user) {
    console.log(user);
  }
}]);