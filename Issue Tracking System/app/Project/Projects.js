'use strict';

angular.module('issueTrackingSystem.projects', ['ngRoute'])

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
            templateUrl: 'app/Project/All-projects.html',
            controller: 'ProjectsCtrl',
            resolve: routeCheks.onlyLogged
        });
        $routeProvider.when('/projects/:id', {
            templateUrl: 'app/Project/All-projects.html',
            controller: 'ProjectsCtrl',
            resolve: routeCheks.onlyLogged
        });
    }])

    .controller('ProjectsCtrl', ['$scope', 'authentication', 'ID', function ($scope, authentication, ID) {

        $scope.Projects = function () {
            authentication.requester('GET', 'Projects/?pageSize={1}&pageNumber={1}&{filter}={"kur"}', null).then(function (data) {
                console.log(data.data);
            });

        };


    }]);
