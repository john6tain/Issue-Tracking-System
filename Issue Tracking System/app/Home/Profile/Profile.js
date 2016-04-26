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
    .controller('ProfileCtrl', ['$scope','$location','authentication', function ($scope,$location,authentication) {
        $scope.ChangePass = function () {
            $location.path('/profile/password');
        };
        $scope.Change = function (user) {
            authentication.requester('POST','api/Account/ChangePassword',user).then(function (data) {
                if (data.statusText === "OK") {
                    toastr.success('Your password was successfully changed');
                }
                else
                {
                    toastr.error("Something went wrong",'Change Password');
                }

            }).then(function (error) {
                console.log(error);
                if (data.statusText === "OK") {
                    toastr.success('Your password was successfully changed');
                }
                else
                {
                    toastr.error("Something went wrong",'Change Password');
                }
            });
        };
       authentication.requester('GET','Users/me').then(function (data) {
            $scope.Username = data.data['Username'];
            $scope.isAdmin = data.data['isAdmin'];
        });

    }]);
