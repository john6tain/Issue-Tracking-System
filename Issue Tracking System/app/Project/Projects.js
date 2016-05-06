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
            templateUrl: 'app/Project/project.html',
            controller: 'ProjectsCtrl',
            resolve: routeCheks.onlyLogged
        });

    }])

    .controller('ProjectsCtrl', ['$scope', '$location', '$window', 'authentication', '$rootScope', function ($scope, $location, $window, authentication, $rootScope) {

        $scope.addNewProject = function () {
            var users;
            authentication.requester('GET', 'users').then(function (data) {
                users = data.data.filter(function (user) {
                    if (user['isAdmin'] === true) {
                        return user;
                    }

                });
                $rootScope.users = users;
                //console.log($rootScope.users);
            });
            $location.path('/projects/add');
        };

        $scope.addProject = function (newProject) {

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
            project.LeadID = $window.localStorage.getItem('UserId');
            //   console.log(project);
            /*  authentication.requester('POST', 'projects', project).then(function (data) {
             toastr.success('Project added');
             }, function (error) {
             toastr.error('Project Not added');
             });*/
        };
        var id = $location.path().toString();
        id = id.substr(id.lastIndexOf('/') + 1);
        $scope.Id = id;

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
