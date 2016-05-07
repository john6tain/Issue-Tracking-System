'use strict';

angular.module('issueTrackingSystem.projects', ['ngRoute', 'issueTrackingSystem.projects.service', 'issueTrackingSystem.getUsers'])

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
        $routeProvider.when('/projects/:id/edit', {
            templateUrl: 'app/Project/editProject.html',
            controller: 'ProjectsCtrl',
            resolve: routeCheks.onlyLogged
        });
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
            templateUrl: 'app/Project/project.html',
            controller: 'ProjectsCtrl',
            resolve: routeCheks.onlyLogged
        });

    }])

    .controller('ProjectsCtrl', ['$scope', '$location', '$window', 'authentication', '$rootScope', 'projectsService', 'getUsers', function ($scope, $location, $window, authentication, $rootScope, projectsService, getUsers) {
        $scope.addNewProject = function () {

            getUsers.getUsers(true);
            $location.path('/projects/add');
        };

        $scope.addOrEditProject = function (newProject, addOrEdit) {

            var project = {};

            function arrToArrayOfObjects(arr) {
                var i, j = 0,
                    obj = null,
                    output = [];

                for (i = 0; i < arr.length; i++) {
                    obj = {};

                    for (j = 0; j < arr.length; j++) {
                        obj['Id'] = i + 1;
                        obj['Name'] = arr[i];
                    }

                    output.push(obj);
                }
                return output;
            }

            project.Name = newProject.Name;
            project.Description = newProject.Description;
            project.ProjectKey = newProject.ProjectKey;
            project.Labels = arrToArrayOfObjects(newProject.Labels.split(','));
            project.Priorities = arrToArrayOfObjects(newProject.Priorities.split(','));
            project.LeadID = $rootScope.users.filter(
                function (user) {
                    if (user.Username == newProject.Leader) {
                        return user;
                    }
                })[0].Id;
            if (addOrEdit) {
                projectsService.addProject(project);

            }
            else {
                projectsService.editProject(project, id);
            }

        };

        var id = $location.path().toString();
        if (id.match(/\d+/) != null) {
            id = id.match(/\d+/)[0];

            authentication.requester('GET', 'Projects/' + id.toString(), null).then(function (data) {
                $rootScope.project = data.data;
                //$scope.isLead = data.data.Lead.Id === $window.localStorage.getItem('UserId');
            });
        }
        $scope.editProject = function () {
            getUsers.getUsers(true);
            $location.path('projects/' + id.toString() + '/edit');

        };
        $scope.currentPage = 1;
        var username = atob($window.localStorage.getItem('Username'));
        $scope.isAdmin = atob($window.localStorage.getItem('isAdmin')) == 'true';
        function request() {
            authentication.requester('GET', 'Projects/?pageSize=10&pageNumber=' + $scope.currentPage + '&filter=Lead.Username="' + username + '"', null).then(function (data) {
                $scope.totalItems = 10 * data.data['TotalPages'];
                $scope.projects = data.data['Projects'];
            });
        }

        request();
        $scope.pageChanged = function () {
            request();
        };

    }]);
