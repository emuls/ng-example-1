!(function() {
    function ParseFormatExampleDirective() {
        return {
            restrict: 'E',
            templateUrl: '/components/directives/form/parseformatexample.directive.html',
            controllerAs: 'parseformat',
            controller: ParseFormatExampleController
        }
    }

    function ParseFormatExampleController() {
        this.num = 1;
    }

    angular.module('exampleApp').directive('parseFormatExample', ParseFormatExampleDirective);
})();