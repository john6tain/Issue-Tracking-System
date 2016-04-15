'use strict';
angular.module('issueTrackingSystem.success',[])
    .directive('success',function () {
        return {
            restrict:'AE',
            replace: 'true',
            templateUrl:'app/Messages/success.html'
        };
    });