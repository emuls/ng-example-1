!(function() {
    function ZeroBasedInputDirective() {
        return {
            restrict: 'A',
            require: 'ngModel',
            link: function(scope, element, attrs, ngModelController) {
                ngModelController.$parsers.push(function(data) {
                    //convert data from view format to model format
                    return (Number(data)+1); //converted
                });

                ngModelController.$formatters.push(function(data) {
                    //convert data from model format to view format
                    return (data-1);
                });
            }
        }
    }

    angular.module('exampleApp').directive('zeroBasedInput', ZeroBasedInputDirective);
})();