!(function() {
    function CarBlurbDirective() {
        return {
            restrict: 'E',
            replace: false,
            scope: {
                car: '='
            },
            templateUrl: '/components/directives/carblurb/carblurb.view.html'
        }
    }
    angular.module('exampleApp').directive('carBlurb', CarBlurbDirective);
})();