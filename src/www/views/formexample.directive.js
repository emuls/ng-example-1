!(function() {
    function FormExampleDirective() {
        return {
            restrict: 'E',
            templateUrl: '/views/formexample.view.html',
            controllerAs: 'formexample',
            controller: FormExampleController
        }
    }

    function FormExampleController(TitleService) {
        TitleService.title = 'Form Example';
    }

    angular.module('rootComponents').directive('formExample', FormExampleDirective);
})();