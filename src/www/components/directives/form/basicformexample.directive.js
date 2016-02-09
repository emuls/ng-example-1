!(function() {
    function BasicFormExampleDirective() {
        return {
            restrict: 'E',
            templateUrl: '/components/directives/form/basicformexample.directive.html',
            controllerAs: 'formexample',
            controller: BasicFormExampleController
        }
    }

    function BasicFormExampleController() {
    }

    angular.module('exampleApp').directive('basicFormExample', BasicFormExampleDirective);
})();