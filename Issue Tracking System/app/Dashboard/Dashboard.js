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
        };

        $routeProvider.when('/dashboard', {
            templateUrl: 'app/Dashboard/Dashboard.html',
            controller: 'DashboardCtrl',
            resolve: routeCheks.onlyLogged
        });
    }])

    .controller('DashboardCtrl', ['$scope','$window','$http','BASE_URL', function ($scope,$window,$http,BASE_URL) {
        $scope.BigFoot = function () {
            $http.defaults.headers.common.Authorization = 'Bearer '+ $window.localStorage.getItem('access_token');
            $http.get(BASE_URL+'Users/me').then(function (feed) {
                console.log(feed);
            });
        }
    }]);
