'use strict';
angular.module('issueTrackingSystem.issues',[])
.config(['$routeProvider', function ($routeProvider) {
    var routeCheks = {
        onlyLogged: ['$q', '$window', '$location', function ($q, $window) {
            if ($window.localStorage.getItem('access_token')) {
                return $q.when(true);
            }
            return $q.reject('You are not logged in');
        }]
    };

    $routeProvider.when('/issues/:id', {
        templateUrl: 'app/Issue/issue.html',
        controller: 'IssueCtrl',
        resolve: routeCheks.onlyLogged
    });
}])

    .controller('IssueCtrl', ['$scope','$location', 'authentication', function ($scope,$location,authentication) {
        var id = $location.path().toString();
        if (id.match(/\d+/) != null) {
            id = id.match(/\d+/)[0];
            authentication.requester('GET', '/issues/' + id, null).then(function (data) {
                $scope.issue = data.data;
            });
        }
    }]);
