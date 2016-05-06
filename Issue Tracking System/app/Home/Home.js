'use strict';

angular.module('issueTrackingSystem.home', ['ngRoute'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/', {
            templateUrl: 'app/Home/Home.html',
            controller: 'HomeCtrl'
        });
    }])

    .controller('HomeCtrl', ['$scope', '$rootScope', '$location', '$window', 'authentication',
        function ($scope, $rootScope, $location, $window, authentication) {

            $scope.Register = function (user) {
                authentication.registerUser(user);

            };
            $scope.Login = function (user) {
                authentication.loginUser(user);
            };
        }]);
