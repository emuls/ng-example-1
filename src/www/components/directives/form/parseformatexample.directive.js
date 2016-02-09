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
        this.modAmount = 1;
    }

    angular.module('exampleApp')
        .directive('parseFormatExample', ParseFormatExampleDirective)
        .filter('range', function() {
            return function(input, start, end) {
                start = parseInt(start);
                end = parseInt(end);
                var direction = (start <= end) ? 1 : -1;
                while (start != end) {
                    input.push(start);
                    start += direction;
                }
                return input;
            };
        });;

})();