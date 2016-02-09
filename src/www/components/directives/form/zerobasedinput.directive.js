!(function() {
    function ZeroBasedInputDirective() {
        return {
            restrict: 'A',
            require: 'ngModel',
            scope:{
                modAmount: '='
            },
            link: function(scope, element, attrs, ngModelController) {
                ngModelController.$parsers.push(function(data) {
                    //convert data from view format to model format
                    return (Number(data) + scope.modAmount); //converted
                });

                ngModelController.$formatters.push(function(data) {
                    //convert data from model format to view format
                    return (data - scope.modAmount);
                });
            }
        }
    }

    angular.module('exampleApp').directive('zeroBasedInput', ZeroBasedInputDirective);
})();