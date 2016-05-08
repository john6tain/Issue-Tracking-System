'use strict';
angular.module('issueTrackingSystem.projects.service', [])
    .factory('projectsService', ['authentication', '$location',
        function (authentication, $location) {
            function addProject(project) {
                authentication.requester('POST', 'projects', project).then(function (data) {
                    toastr.success('The Project was added');
                    $location.path('/projects');
                }, function (error) {
                    toastr.error('The project was not added');
                });
            }

            function editProject(project, id) {
                authentication.requester('PUT', 'projects/' + id.toString(), project).then(function (data) {
                    toastr.success('The Project was edited');
                    $location.path('/projects');
                }, function (error) {
                    toastr.error('The project was not edited');
                });
            }

            return {
                addProject: addProject,
                editProject: editProject
            };
        }]);
