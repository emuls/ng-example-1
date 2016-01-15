!(function(){
    'use strict';
    function AppController($scope, $mdSidenav, $mdMedia, TitleService){
        $scope.$mdMedia = $mdMedia;
        $scope.TitleService = TitleService;
        $scope.toggleNav = function (){
            $mdSidenav('leftnav').toggle();
        }
    }
    angular.module('exampleApp').controller('AppController', AppController);
})();

!(function(){
    'use strict';
    function themeConfig($mdThemingProvider){
        $mdThemingProvider.theme('altTheme').primaryPalette('red')
        $mdThemingProvider.setDefaultTheme('altTheme');
    }
    angular.module('exampleApp').config(themeConfig);
})();


!(function(){
    'use strict';
    function routeConfig($routeProvider){
        $routeProvider
            .when('/example', {
                template: '<basic-examples></basic-examples>',
            }).when('/formexample', {
            template: '<form-example></form-example>'
        }).when('/apiexample', {
            template: '<api-call-example></api-call-example>'
        }).when('/githubexample', {
            template: '<github-example></github-example>'
        }).otherwise({
            redirectTo: '/example'
        });
    }
    angular.module('exampleApp').config(routeConfig);
})();
