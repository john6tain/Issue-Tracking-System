'use strict';
angular.module('issueTrackingSystem.getUsers', [])
    .factory('getUsers', ['authentication','$rootScope',
        function (authentication,$rootScope) {
            function getUsers(isAdmin) {
                $rootScope.users =[];
                 authentication.requester('GET', 'users').then(function (data) {
                    if (isAdmin) {
                        $rootScope.users   = data.data.filter(function (user) {
                            if (user['isAdmin'] === true) {
                                return user;
                            }

                        });
                    }
                    else {
                        $rootScope.users= data.data;/*.filter(function (user) {
                            if (user['isAdmin'] === false) {
                                return user;
                            }

                        });*/
                    }
                });

            }

            return {
                getUsers: getUsers
            };
        }]);

