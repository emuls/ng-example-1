angular.module('exampleApp', ['ngMaterial','ngRoute','services']);

angular.module('exampleApp').controller('AppController', function($scope, $mdSidenav,$mdMedia, TitleService){
    $scope.$mdMedia = $mdMedia;
    $scope.TitleService = TitleService;
    $scope.toggleNav = function (){
        $mdSidenav('leftnav').toggle();
    }
});

angular.module('exampleApp').directive('navigation', function(){
    return {
        restrict: 'E',
        replace: true,
        templateUrl: '/components/navigation/navigation.view.html',
        controllerAs:'nav',
        controller: function(){
            this.links = [
                {
                    id: 0,
                    text: 'Basic Examples',
                    route: '/example'
                },
                {
                    id: 1,
                    text: 'Builtin Directive Examples',
                    route: '/builtin'
                },
                {
                    id: 2,
                    text: 'Form Examples',
                    route: '/formexample'
                }
            ]
        }
    }
});

angular.module('exampleApp').config(function($mdThemingProvider) {
    $mdThemingProvider.theme('altTheme').primaryPalette('red')
    $mdThemingProvider.setDefaultTheme('altTheme');
});

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

