'use strict';

angular.module('issueTrackingSystem.home', ['ngRoute'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/', {
            templateUrl: 'app/Home/home.html',
            controller: 'HomeCtrl'
        });
    }])

    .controller('HomeCtrl', ['$scope', '$rootScope', '$location', '$window', 'authentication',
        function ($scope, $rootScope, $location, $window, authentication) {

            $scope.Register = function (user) {
                authentication.registerUser(user).then(function (message) {
                    console.log(message);
                });
            };
            $scope.Login = function (user) {
                authentication.loginUser(user).then(function (loggedIn) {
                    if ($window.localStorage.getItem('access_token')) {
                        $rootScope.isLogged = true;
                        toastr.success('You have successfully logged in', 'Log in');
                        $location.path('/dashboard');

                    }
                });
            };
        }]);
