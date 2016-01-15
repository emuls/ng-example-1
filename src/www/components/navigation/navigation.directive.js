!(function(){
    'use strict';
    function navigationDirective(){
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
                        text: 'Form Example',
                        route: '/formexample'
                    },
                    {
                        id: 2,
                        text: 'API Example',
                        route: '/apiexample'
                    },
                    {
                        id: 3,
                        text: 'Github API Example',
                        route: '/githubexample'
                    }
                ]
            }
        }
    }

    angular.module('exampleApp').directive('navigation', navigationDirective);
})();