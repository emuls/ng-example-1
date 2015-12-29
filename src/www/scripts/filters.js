angular.module('exampleApp').filter('capitalize', function(){
    var filter = function(input){
        return input[0].toUpperCase() + input.slice(1);
    };
    return filter;
});