angular.module('exampleApp', ['ngRoute','services']);

angular.module('exampleApp').config(function($routeProvider) {
    $routeProvider
        .when('/example', {
            template: '<basic-examples></basic-examples>',
        }).when('/formexample', {
            template: '<form-example></form-example>'
        }).when('/builtin',{
            template: '<builtin-example></builtin-example>'
        }).otherwise({
            redirectTo: '/example'
        })
});