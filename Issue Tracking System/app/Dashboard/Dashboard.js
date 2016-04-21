'use strict';

angular.module('issueTrackingSystem.dashboard', ['ngRoute'])

    .config(['$routeProvider', function ($routeProvider) {
        var routeCheks = {
            onlyLogged: ['$q', '$window', '$location', function ($q, $window) {
                if ($window.localStorage.getItem('access_token')) {
                    return $q.when(true);
                }
                return $q.reject('You are not logged in');
            }]
        }

        $routeProvider.when('/dashboard', {
            templateUrl: 'app/Dashboard/Dashboard.html',
            controller: 'DashboardCtrl',
            resolve: routeCheks.onlyLogged
        });
    }])

    .controller('DashboardCtrl', ['$scope', function ($scope) {
        $scope.test = function () {
            alert('da');
        }
    }]);
