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

    .controller('ProjectsCtrl', ['$scope', '$location', 'authentication', function ($scope, $location, authentication) {
        $scope.addProject = '';
        var id = $location.path().toString();
        id = id.substr(id.lastIndexOf('/') + 1);
        $scope.currentPage = 1;
        var username = "admin@softuni.bg";//TODO: need to be real
        function request() {
            authentication.requester('GET', 'Projects/?pageSize=5&pageNumber='+$scope.currentPage+'&filter=Lead.Username="' + (username) + '"', null).then(function (data) {
                $scope.totalItems = 10 * data.data['TotalPages'];
                $scope.projects = data.data['Projects'];
            });
        }

        request();
        $scope.setPage = function (pageNum) {
            $scope.currentPage = pageNum;
        };

        $scope.pageChanged = function () {
            request();
        };

        /* if(id==='projects'){

         }
         else {
         authentication.requester('GET', '/'/*+(id).toString()*/
        /*, null).then(function (data) {
         //$scope.allProjects =
         console.log(data.data.length);
         });
         }*/


    }]);
