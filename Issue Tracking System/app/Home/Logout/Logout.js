'use strict';

angular.module('issueTrackingSystem.logout', ['ngRoute'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/logout', {
            controller: 'LogoutCtrl'
        });
    }])

    .controller('LogoutCtrl', ['$scope', 'authentication','$location',
        function ($scope, authentication,$location) {
            $scope.Logout = function () {
                authentication.logOutUser();//not working properly
            }
        }]);
