'use strict';
angular.module('issueTrackingSystem.navigationBar', [])
    .directive('navBar', function () {
        return {
            restrict: 'A',
            templateUrl: 'app/directives/navigationBar.html'
        };
    });