'use strict';

angular.module('issueTrackingSystem.projects', ['ngRoute'])

    .config(['$routeProvider', function ($routeProvider) {
        var routeCheks = {
            onlyLogged: ['$q', '$window', '$location', function ($q, $window) {
                if ($window.localStorage.getItem('access_token')) {
                    return $q.when(true);
                }
                return $q.reject('You are not logged in');
            }]/*,
            onlyAdmin: ['$q', '$window', '$location', function ($q, $window) {
                if ($window.localStorage.getItem('isAdmin') === atob('true')) {
                    return $q.when(true);
                }
                return $q.reject('You are not Admin');
            }]*/
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

    .controller('ProjectsCtrl', ['$scope', '$location', '$window', 'authentication', function ($scope, $location, $window, authentication) {
        $scope.addNewProject = function () {
            $location.path('/projects/add');
        };
        $scope.addProject = function (newProject) {
            console.log(newProject);
          /*authentication.requester('POST','projects',newProject).then(function (data) {

          });*/
        };
        var id = $location.path().toString();
        id = id.substr(id.lastIndexOf('/') + 1);

        if (!isNaN(id)) {
            $scope.currentPage = id;
        }
        else {
            $scope.currentPage = 1;
        }
        var username = atob($window.localStorage.getItem('Username'));
        $scope.isAdmin = atob($window.localStorage.getItem('isAdmin'))=='true';
        function request() {
            authentication.requester('GET', 'Projects/?pageSize=5&pageNumber=' + $scope.currentPage + '&filter=Lead.Username="' + (username) + '"', null).then(function (data) {
                $scope.totalItems = 10 * data.data['TotalPages'];
                $scope.projects = data.data['Projects'];
            });
        }

        request();
        $scope.pageChanged = function () {
            request();
        };

    }]);
