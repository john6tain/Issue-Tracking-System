'use strict';

angular.module('issueTrackingSystem.dashboard', ['ngRoute'])

    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/dashboard', {
            templateUrl: 'app/Dashboard/Dashboard.html',
            controller: 'DashboardCtrl'
        });
    }])

    .controller('DashboardCtrl', ['$scope',function($scope) {
        $scope.test = function () {
            alert('da');
        }
    }]);
