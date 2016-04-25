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
        $routeProvider.when('/profile/password',{
            templateUrl: 'app/Home/Profile/ChangePassword.html',
            controller: 'ProfileCtrl',
            resolve:routeCheks.onlyLogged
        });
    }])
    .controller('ProfileCtrl', ['$scope','$window','$location','$http','BASE_URL', function ($scope,$window,$location,$http,BASE_URL) {
        $scope.ChangePass = function () {
            $location.path('/profile/password');
        };
        $http.defaults.headers.common.Authorization = 'Bearer '+ $window.localStorage.getItem('access_token');
        $http.get(BASE_URL+'Users/me').then(function (data) {
            $scope.Username = data.data['Username'];
            $scope.isAdmin = data.data['isAdmin'];
        });

    }]);
