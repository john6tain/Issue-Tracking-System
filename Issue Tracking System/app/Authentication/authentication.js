angular.module('issueTrackingSystem.authentication', [])
    .factory('authentication'[
        '$http',
            '$q',
            'BASE_URL',
            function ($http, $q, BASE_URL) {

                function registerUser(user) {
                    var deferred = $q.defer();
                    $http.post(BASE_URL + 'api/Account/Register', user)
                        .then(function (response) {
                            deferred.resolve(response);
                        }, function (error) {

                        });
                    return deferred.promise;
                }

                function loginUser(user) {
                    var deferred = $q.defer();
                    $http.post(BASE_URL + 'api/Account/Login', user)
                        .then(function (response) {
                            deferred.resolve(response.data);
                    }, function () {

                    });
                    return deferred.promise;
                }

                function logOutUser(user) {

                }

                return {
                    registerUser: registerUser(),
                    loginUser: loginUser(),
                    logOutUser: logOutUser()
                }
            }]);
