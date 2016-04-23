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
            resolve:routeCheks.onlyLogged
        });
    }])

    .controller('ProjectsCtrl', ['$scope', function ($scope) {
        
    }]);
