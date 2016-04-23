'use strict';

// Declare app level module which depends on views, and components
angular.module('issueTrackingSystem', [
        'ngRoute',
        'issueTrackingSystem.home',
        'issueTrackingSystem.logout',
        'issueTrackingSystem.authentication',
        'issueTrackingSystem.dashboard',
        'issueTrackingSystem.navigationBar',
        'issueTrackingSystem.projects',
        'issueTrackingSystem.profile'
    ])
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.otherwise({redirectTo: '/'});

    }])
    .run(['$rootScope','$location',function ($rootScope,$location) {
        $rootScope.$on('$routeChangeError', function (ev,current,previous,rejection) {
            toastr.error('please login first',rejection);
            $location.path('/');
        });
    }])
    .constant('BASE_URL', 'http://softuni-issue-tracker.azurewebsites.net/')
    .constant('toastr', toastr);