'use strict';
angular.module('issueTrackingSystem.issues',[])
.config(['$routeProvider', function ($routeProvider) {
    var routeCheks = {
        onlyLogged: ['$q', '$window', '$location', function ($q, $window) {
            if ($window.localStorage.getItem('access_token')) {
                return $q.when(true);
            }
            return $q.reject('You are not logged in');
        }]
    };

    $routeProvider.when('/issues/:id', {
        templateUrl: 'app/Issue/issue.html',
        controller: 'IssueCtrl',
        resolve: routeCheks.onlyLogged
    });
    $routeProvider.when('/projects/:id/add-issue', {
        templateUrl: 'app/Issue/addIssue.html',
        controller: 'IssueCtrl',
        resolve: routeCheks.onlyLogged
    });
}])

    .controller('IssueCtrl', ['$scope','$location','$rootScope','authentication', function ($scope,$location,$rootScope,authentication) {
        var id = $location.path().toString();
        if (id.match(/\d+/) != null) {
            id = id.match(/\d+/)[0];
            authentication.requester('GET', '/issues/' + id, null).then(function (data) {
                $scope.issue = data.data;
            });
        }
        $scope.addIssue = function (issue) {
            var issues = {};

            function arrToArrayOfObjects(arr) {
                var i, j = 0,
                    obj = null,
                    output = [];

                for (i = 0; i < arr.length; i++) {
                    obj = {};

                    for (j = 0; j < arr.length; j++) {
                        obj['Id'] = i + 1;
                        obj['Name'] = arr[i];
                    }

                    output.push(obj);
                }
                return output;
            }

            issues.Title = issue.Title;
            issues.Description = issue.Description;
            issues.DueDate = issue.DueDate;
            issues.ProjectId = id;

            issues.AssigneeId = $rootScope.users.filter(
                function (user) {
                    if (user.Username == issue.ass) {
                        return user;
                    }
                })[0].Id;
            issues.PriorityId = 1;
            issues.Labels = arrToArrayOfObjects(issue.Labels.split(','));
            authentication.requester('POST','/issues/',issues).then(function (data) {
                console.log(data);
            },function (error) {
                console.log(error);
            })

        };
    }]);
