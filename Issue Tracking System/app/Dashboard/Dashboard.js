'use strict';

angular.module('issueTrackingSystem.dashboard', ['ngRoute', 'ui.bootstrap'])

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

    .controller('DashboardCtrl', ['$scope','$window', 'authentication', function ($scope, $window,authentication) {
        
        $scope.currentPage = 1;
        function request() {

            authentication.requester('GET', '/issues/me?orderBy=DueDate desc, IssueKey&pageSize=5&pageNumber=' + $scope.currentPage, null).then(function (data) {
                $scope.issues = data.data['Issues'];
                $scope.totalItems = 10 * data.data['TotalPages'];
                $scope.isAdmin = atob($window.localStorage.getItem('isAdmin')) === 'true';
            });
        }

        request();
        
        $scope.pageChanged = function () {
            request()
        };
        

    }]);