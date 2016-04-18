'use strict';
angular.module('issueTrackingSystem.success',[])
    .directive('success',function () {
        return {
            restrict:'A',
            templateUrl:'app/Messages/success.html'
        };
    });