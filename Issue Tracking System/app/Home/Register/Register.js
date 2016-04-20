'use strict';

angular.module('issueTrackingSystem.register', ['ngRoute'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/register', {
            templateUrl: 'app/Home/Register/Register.html',
            controller: 'RegisterCtrl'
        });
    }])

    .controller('RegisterCtrl', ['$scope', 'authentication',
        function ($scope, authentication) {
            $scope.Register = function (user) {
                authentication.registerUser(user).then(function (message) {
                    console.log(message);
                })
            }
        }]);