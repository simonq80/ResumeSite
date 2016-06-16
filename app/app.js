var projectApp = angular.module('projectApp', ['ngRoute']);

// Define the `PhoneListController` controller on the `phonecatApp` module
projectApp.controller('ProjectController', ['$scope', '$http', function PhoneListController($scope, $http) {

	$http.get('data/pages.json').then(function(response) {
        $scope.pages = response.data;
      });

	$http.get('data/projects.json').then(function(response) {
        $scope.projects = response.data;
      });
	$http.get('data/homeParas.json').then(function(response) {
        $scope.homeParas = response.data;
      });
}]);

projectApp.config(['$locationProvider', '$routeProvider',
    function config($locationProvider, $routeProvider) {
      $locationProvider.hashPrefix('!');

      $routeProvider.
        when('/projects', {
          template: '<my-data></my-data>'
        }).
        when('/cv', {
          template: '<my-cv></my-cv>'
        }).
        when('/home', {
          template: '<my-home></my-home>'
        }).
        otherwise('/home');
    }
]);

projectApp.directive('myData', function() {
	return{
		templateUrl: 'project.template.html'
	};
});

projectApp.directive('myCv', function() {
	return{
		templateUrl: 'cv.template.html'
	};
});

projectApp.directive('myHome', function() {
	return{
		templateUrl: 'home.template.html'
	};
});
