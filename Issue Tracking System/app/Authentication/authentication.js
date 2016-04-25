angular.module('issueTrackingSystem.authentication', [])
    .factory('authentication',[
        '$http',
        '$window',
        '$location',
        '$rootScope',
            'BASE_URL',

            function ($http,$window,$location,$rootScope,BASE_URL) {

                function registerUser(user) {
                    var request = {
                        method:'POST',
                        url: BASE_URL + 'api/Account/Register',
                        data: user
                    };

                    return $http(request)
                        .then(function (response) {

                            if(response.statusText === "OK"){
                                loginUser(user);
                                
                                $location.path('/dashboard');
                            }
                        }, function (error) {
                            toastr.error(error.data['Message']);
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
                                toastr.success('You have successfully logged in', 'Log in');
                                $("a[href$='#/']").attr('href','#/dashboard');
                                $rootScope.isLogged = true;
                            }
                        }, function (error) {
                            toastr.error(error.data['error_description'],'Log in');
                        });
                }

                function logOutUser() {
                $window.localStorage.clear();
                    $("a[href$='#/dashboard']").attr('href','#/');
                }
                function requester(type,url) {
                    if(type === 'GET'){
                        $http.defaults.headers.common.Authorization = 'Bearer ' + $window.localStorage.getItem('access_token');
                        return $http.get(BASE_URL + url);
                    }
                }
                return {
                    registerUser: registerUser,
                    loginUser: loginUser,
                    logOutUser: logOutUser,
                    requester :requester
                }
            }]);
