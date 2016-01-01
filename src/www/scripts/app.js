angular.module('exampleApp', ['ngRoute','services']);

angular.module('exampleApp').config(function($routeProvider) {
    $routeProvider
        .when('/example', {
            templateUrl: '/components/example.view.html',
            controller: 'ExampleController',
        }).when('/formexample', {
            templateUrl: '/components/exampleform.view.html',
            controller: 'ExampleFormController'
        }).when('/builtin',{
            templateUrl: '/components/builtindirectives.view.html',
            controller: 'BuiltInDirectiveController'
        }).otherwise({
            redirectTo: '/example'
        })
});