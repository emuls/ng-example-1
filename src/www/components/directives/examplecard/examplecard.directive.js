!(function() {
    function ExampleCardDirective() {
        return {
            restrict: 'E',
            scope: {
                title: '@'
            },
            templateUrl: '/components/directives/examplecard/examplecard.view.html',
            transclude: true
        }
    }

    angular.module('exampleApp').directive('exampleCard', ExampleCardDirective);
})();
