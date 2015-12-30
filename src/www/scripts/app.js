angular.module('exampleApp', ['ngRoute','services']);

angular.module('exampleApp').config(function($routeProvider) {
    $routeProvider
        .when('/example', {
            templateUrl: 'example.view.html',
            controller: 'ExampleController',
            resolve: {

            }
        })
        .when('/formexample', {
            templateUrl: 'exampleform.view.html',
            controller: 'ExampleFormController'
        }).otherwise({
            redirectTo: '/example'
        })
});