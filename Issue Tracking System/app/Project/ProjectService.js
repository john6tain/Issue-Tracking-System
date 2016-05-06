angular.module('issueTrackingSystem.projects.service', [])
    .factory('projectsService', ['authentication',
        function (authentication) {
            function addProject(project) {
                authentication.requester('POST', 'projects', project).then(function (data) {
                    toastr.success('The Project added');
                }, function (error) {
                    toastr.error('The project was not added');
                });
            }
            
            return {
                addProject: addProject
            };
        }]);
