angular.module('issueTrackingSystem.profile', [])
    .config(['$routeProvider', function ($routeProvider) {
        var routeCheks = {
            onlyLogged: ['$q', '$window', '$location', function ($q, $window) {
                if ($window.localStorage.getItem('access_token')) {
                    return $q.when(true);
                }
                return $q.reject('You are not logged in');
            }]
        };
        $routeProvider.when('/profile', {
            templateUrl: 'app/Home/Profile/Profile.html',
            controller: 'ProfileCtrl',
            resolve:routeCheks.onlyLogged
        });
    }])
    .controller('ProfileCtrl', ['$scope', function ($scope) {
        $scope.Username = 'John';
        $scope.isAdmin = false;
    }]);

