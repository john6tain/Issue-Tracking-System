'use strict';

angular.module('issueTrackingSystem.register', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/register', {
    templateUrl: 'app/Register/Register.html',
    controller: 'RegisterCtrl'
  });
}])

.controller('RegisterCtrl', ['$scope',function($scope) {
  $scope.Register = function (user) {
    alert(user.name + 'hi');
  }
}]);