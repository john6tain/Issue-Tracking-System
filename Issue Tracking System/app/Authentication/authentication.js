angular.module('issueTrackingSystem.authentication', [])
    .factory('authentication',[
        '$http',
        '$window',
            'BASE_URL',
            function ($http,$window,BASE_URL) {

                function registerUser(user) {
                    var request = {
                        method:'POST',
                        url: BASE_URL + 'api/Account/Register',
                        data: user
                    };

                    return $http(request)
                        .then(function (response) {
                            console.log(response);
                        }, function (error) {
                            console.log(error);
                        });
                }

                function loginUser(user) {
                    user.grant_type = 'password';
                    var request = {
                        method:'POST',
                        url: BASE_URL + 'api/Token',
                        data: 'grant_type=' + user.grant_type
                        + '&username=' + user.email
                        + '&password=' + user.password,
                        headers: {'Content-type': 'application/x-www-form-urlencoded'}
                    };

                    return $http(request)
                        .then(function (response) {

                            if(response.statusText === "OK"){
                                $window.localStorage.setItem('access_token',response.data.access_token);
                            }
                            else
                            {

                            }
                        }, function (error) {
                            console.log(error);
                        });
                }

                function logOutUser() {
                $window.localStorage.clear();
                }

                return {
                    registerUser: registerUser,
                    loginUser: loginUser,
                    logOutUser: logOutUser
                }
            }]);
