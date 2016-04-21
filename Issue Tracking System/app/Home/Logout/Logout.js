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
                toastr.error('no','noway');
                authentication.logOutUser();
                
            }
        }]);
