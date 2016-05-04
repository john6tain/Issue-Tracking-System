'use strict';

angular.module('issueTrackingSystem.projects', ['ngRoute', 'issueTrackingSystem.addProject'])

    .config(['$routeProvider', function ($routeProvider) {
        var routeCheks = {
            onlyLogged: ['$q', '$window', '$location', function ($q, $window) {
                if ($window.localStorage.getItem('access_token')) {
                    return $q.when(true);
                }
                return $q.reject('You are not logged in');
            }]
        };
        $routeProvider.when('/projects/add', {
            templateUrl: 'app/Project/addNewProject.html',
            controller: 'ProjectsCtrl',
             resolve: routeCheks.onlyLogged
        });
        $routeProvider.when('/projects', {
            templateUrl: 'app/Project/allProjects.html',
            controller: 'ProjectsCtrl',
            resolve: routeCheks.onlyLogged
        });
        $routeProvider.when('/projects/:id', {
            templateUrl: 'app/Project/allProjects.html',
            controller: 'ProjectsCtrl',
            resolve: routeCheks.onlyLogged
        });

    }])

    .controller('ProjectsCtrl', ['$scope', '$location','$rootScope', 'authentication', function ($scope, $location,$rootScope,authentication) {
        $scope.addNewProject = function () {
            $location.path('/projects/add');
        };
        var id = $location.path().toString();
        id = id.substr(id.lastIndexOf('/') + 1);

        if (!isNaN(id)) {
            $scope.currentPage = id;
        }
        else{
            $scope.currentPage = 1;
        }
        var username = $rootScope.Username;
        function request() {
            authentication.requester('GET', 'Projects/?pageSize=5&pageNumber='+$scope.currentPage+'&filter=Lead.Username="' + (username) + '"', null).then(function (data) {
                $scope.totalItems = 10 * data.data['TotalPages'];
                $scope.projects = data.data['Projects'];
            });
        }
        request();
        $scope.pageChanged = function () {
            request();
        };

    }]);
