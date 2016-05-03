angular.module('issueTrackingSystem.addProject',[])
    .directive('addProject',function () {
        return{
            restrict: 'A',
            templateUrl: 'app/Project/addNewProject.html'
        };
    });
