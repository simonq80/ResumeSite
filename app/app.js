var projectApp = angular.module('projectApp', ['ngRoute']);

// Define the `PhoneListController` controller on the `phonecatApp` module
projectApp.controller('TitleController', ['$scope', '$http', function PhoneListController($scope, $http) {

	$http.get('data/pages.json').then(function(response) {
        $scope.pages = response.data;
      });
}]);

projectApp.controller('HomeController', ['$scope', '$http', function PhoneListController($scope, $http) {

  $http.get('data/homeParas.json').then(function(response) {
        $scope.homeParas = response.data;
      });
}]);

projectApp.controller('ProjectsController', ['$scope', '$http', function PhoneListController($scope, $http) {
  $scope.filterLanguage = "";

  $http.get('data/projects.json').then(function(response) {
        $scope.projects = response.data;
      });
}]);

projectApp.controller('TestController', ['$scope', '$location', function TestController($scope, $location) {
  $scope.username ="";
  $scope.password ="";
  $scope.submit = function(){
    $location.hash(this.username+":"+this.password);
  }
  $scope.qwer= $location.hash().split(":");

}]);

projectApp.controller('BooksController', ['$scope', '$http', function BooksController($scope, $http){
  
  $scope.count = 0;

    
    $http.get('/api/todos').success(function(data) {
            $scope.todos = data;
            console.log(data);
        })
        .error(function(data) {
            console.log('Error: ' + data);
    });
    

     $scope.createTodo = function() {
      if($scope.todoForm.$valid){
        $http.post('/api/todos', $scope.formData)
            .success(function(data) {
                $scope.formData = {}; // clear the form so our user is ready to enter another
                $scope.todos = data;
                console.log(data);
            })
            .error(function(data) {
                console.log('Error: ' + data);
            });
      } 

    };

    $scope.deleteTodo = function(id) {
        $http.delete('/api/todos/' + id)
            .success(function(data) {
                $scope.todos = data;
                console.log(data);
            })
            .error(function(data) {
                console.log('Error: ' + data);
            });
    };

    $scope.getTodos;

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
        when('/test', {
          template: '<test-dir></test-dir>'
        }).
        when('/database', {
          template: '<books-test></books-test>'
        }).
        otherwise('/home');
    }
]);

projectApp.directive('myData', function() {
	return{
    controller: 'ProjectsController',
		templateUrl: 'project.template.html'
	};
});

projectApp.directive('booksTest', function() {
  return{
    controller: 'BooksController',
    templateUrl: 'database.template.html'
  };
});

projectApp.directive('myCv', function() {
	return{
		templateUrl: 'cv.template.html'
	};
});

projectApp.directive('myHome', function() {
	return{
    controller: 'HomeController',
		templateUrl: 'home.template.html'
	};
});

projectApp.directive('testDir', function() {
  return{
    controller: 'TestController',
    templateUrl: 'test.template.html'
  };
});

projectApp.filter('unique', function() {
   return function(collection, keyname) {
      var output = [], 
          keys = [];

      angular.forEach(collection, function(item) {
          var key = item[keyname];
          if(keys.indexOf(key) === -1) {
              keys.push(key);
              output.push(item);
          }
      });

      return output;
   };
});


