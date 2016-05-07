'use strict';

// Declare app level module which depends on views, and components
angular.module('issueTrackingSystem', [
        'ngRoute',
        'angular-loading-bar',
        'issueTrackingSystem.home',
        'issueTrackingSystem.logout',
        'issueTrackingSystem.authentication',
        'issueTrackingSystem.dashboard',
        'issueTrackingSystem.navigationBar',
        'issueTrackingSystem.projects',
        'issueTrackingSystem.profile'

    ])
    .config(['$routeProvider','cfpLoadingBarProvider', function ($routeProvider,cfpLoadingBarProvider) {
        cfpLoadingBarProvider.includeSpinner =true;
        $routeProvider.otherwise({redirectTo: '/'});

    }])
    .run(['$rootScope', '$location', '$window', function ($rootScope, $location, $window) {
        if ($window.localStorage.getItem('access_token')) {
            $rootScope.isLogged = true;
            $("a[href$='#/']").attr('href', '#/dashboard');
        }
        else {
            $rootScope.isLogged = false;
            $("a[href$='#/']").attr('href', '#/');
        }
        $rootScope.$on('$routeChangeError', function (ev, current, previous, rejection) {
            toastr.error('please login first', rejection);
            $location.path('/');
        });
    }])
    .constant('BASE_URL', 'http://softuni-issue-tracker.azurewebsites.net/')
    .constant('toastr', toastr);