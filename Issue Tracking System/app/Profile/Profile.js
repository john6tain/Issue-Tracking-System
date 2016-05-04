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
            templateUrl: 'app/Profile/Profile.html',
            controller: 'ProfileCtrl',
            resolve: routeCheks.onlyLogged
        });
        $routeProvider.when('/profile/password', {
            templateUrl: 'app/Profile/ChangePassword.html',
            controller: 'ProfileCtrl',
            resolve: routeCheks.onlyLogged
        });
    }])
    .controller('ProfileCtrl', ['$scope', '$location', '$rootScope', 'authentication', function ($scope, $location, $rootScope, authentication) {
        $scope.ChangePass = function () {
            $location.path('/profile/password');
        };
        $scope.Change = function (user) {
            authentication.requester('POST', 'api/Account/ChangePassword', user).then(function (data) {
                if (data.statusText === "OK") {
                    toastr.success('Your password was successfully changed');
                }

            }, function (error) {
                var obj = error.data['ModelState'];
                var message = 'Something went wrong';
                console.log();
                if (obj.hasOwnProperty('')) {
                    message = obj[''][0];
                }
                else if (obj.hasOwnProperty('model.NewPassword')) {
                    message = obj['model.NewPassword'][0];
                }
                else if (obj.hasOwnProperty('model.ConfirmPassword')) {
                    message = obj['model.ConfirmPassword'][0];
                }
                toastr.error(message, 'Change Password');

            });
        };
        authentication.requester('GET', 'Users/me').then(function (data) {
            $rootScope.Username = data.data['Username'];
            $rootScope.isAdmin = data.data['isAdmin'];
        });

    }]);
