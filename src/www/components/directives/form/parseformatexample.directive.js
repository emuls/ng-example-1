!(function() {
    function ParseFormatExampleDirective() {
        return {
            restrict: 'E',
            templateUrl: '/components/directives/form/parseformatexample.directive.html',
            controllerAs: 'formexample',
            controller: ParseFormatExampleController
        }
    }

    function ParseFormatExampleController() {
    }

    angular.module('exampleApp').directive('parseFormatExample', ParseFormatExampleDirective);
})();