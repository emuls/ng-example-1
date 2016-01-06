angular.module('exampleApp').filter('capitalize', function(){
    var filter = function(input){
        return input[0].toUpperCase() + input.slice(1);
    };
    return filter;
});

angular.module('exampleApp').filter('numberFixedLen', function () {
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
});