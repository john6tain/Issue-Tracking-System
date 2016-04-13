'use strict';

// Declare app level module which depends on views, and components
angular.module('issueTrackingSystem', [
  'ngRoute',
  'issueTrackingSystem.login',
  'issueTrackingSystem.register'
]).
config(['$routeProvider', function($routeProvider) {
  $routeProvider.otherwise({redirectTo: '/login'});
}]).constant('BASE_URL','http://softuni-issue-tracker.azurewebsites.net/');