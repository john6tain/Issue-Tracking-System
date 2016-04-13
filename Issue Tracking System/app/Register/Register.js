'use strict';

angular.module('issueTrackingSystem.register', ['ngRoute','issueTrackingSystem.authentication'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/register', {
            templateUrl: 'app/Register/Register.html',
            controller: 'RegisterCtrl'
        });
    }])

    .controller('RegisterCtrl', ['$scope', 'authentication', function ($scope, authentication) {
        $scope.Register = function (user) {
            authentication.registerUser(user).then(function (registered) {
                console.log(registered);
            });
        }
    }]);