angular.module('exampleServices', []).service('EmailParser',function($interpolate){
    return {
        parse: function(text, context){
            var interpolateFunction = $interpolate(text);
            return interpolateFunction(context);
        }
    }
});