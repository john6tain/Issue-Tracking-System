'use strict';

angular.module('issueTrackingSystem.projects', ['ngRoute','issueTrackingSystem.addProject'])

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
        $scope.addProject ='';
        var id = $location.path().toString();
        id = id.substr(id.lastIndexOf('/')+1);
        if(id==='projects'){
            if($scope.isAdmin===true){
                $scope.addProject ='Add-new-project.html';
            }
            else {

            }
        }
        else {
            authentication.requester('GET', 'Projects/'+(id).toString(), null).then(function (data) {
                $scope.allProjects = data.data;
            });
        }


    }]);
