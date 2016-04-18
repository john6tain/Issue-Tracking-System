'use strict';

angular.module('issueTrackingSystem.login', ['ngRoute'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/login', {
            templateUrl: 'app/Home/Login/Login.html',
            controller: 'LoginCtrl'
        });
    }])

    .controller('LoginCtrl', ['$scope', 'authentication', '$location', '$rootScope', '$window', function ($scope, authentication, $location, $rootScope, $window) {
        $rootScope.isSuccess = false;
        $scope.Login = function (user) {

            authentication.loginUser(user).then(function (loggedIn) {
                if ($window.localStorage.getItem('access_token')) {
                    console.log('full');
                    $location.path('/dashboard');
                }
                else {
                    console.log('empty');
                }
            });



        };

    }]);