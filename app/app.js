var phonecatApp = angular.module('projectApp', []);

// Define the `PhoneListController` controller on the `phonecatApp` module
phonecatApp.controller('ProjectController', ['$scope', '$http', function PhoneListController($scope, $http) {

	$http.get('projects.json').then(function(response) {
        $scope.projects = response.data;
      });
}]);
