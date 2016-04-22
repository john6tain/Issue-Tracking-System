'use strict';

angular.module('issueTrackingSystem.logout', ['ngRoute'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/logout', {
            template:'<div></div>',
            controller: 'LogoutCtrl'
        });
    }])

    .controller('LogoutCtrl', ['$scope', 'authentication','$location','$rootScope',
        function ($scope, authentication,$location,$rootScope) {
          //  $scope.Logout = function () {
                toastr.success('You have successfully logged out', 'Log Out');
                authentication.logOutUser();
            $rootScope.isLogged  = false;
            $location.path('/');

         //   }
        }]);