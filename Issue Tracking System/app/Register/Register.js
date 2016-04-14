'use strict';

angular.module('issueTrackingSystem.register', ['ngRoute'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/register', {
            templateUrl: 'app/Register/Register.html',
            controller: 'RegisterCtrl'
        });
    }])

    .controller('RegisterCtrl', ['$scope' , function ($scope) {
        $scope.success = true;
        $scope.Register = function (user) {
           console.log(user);
            $scope.success = false;
        }
    }]);