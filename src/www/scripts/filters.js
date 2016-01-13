angular.module('exFilters', []);

!(function() {
    function CapitalizeFilter() {
        var filter = function (input) {
            return input[0].toUpperCase() + input.slice(1);
        };
        return filter;
    }

    angular.module('exFilters').filter('capitalize', CapitalizeFilter);
})();

!(function() {
    function FixedNumberLengthFilter(){
        var filter = function (input, length) {
            var result = parseInt(input, 10);
            len = parseInt(length, 10);
            if (isNaN(result) || isNaN(length)) {
                return input;
            }
            result = ''+result;
            while (result.length < length) {
                result = '0'+result;
            }
            return result;
        };
        return filter;
    }
    angular.module('exFilters').filter('numberFixedLen',FixedNumberLengthFilter);
})();