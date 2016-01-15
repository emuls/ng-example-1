!(function(){
    function InterpolateService($interpolate){
        return {
            parse: function(text, context){
                var interpolateFunction = $interpolate(text);
                return interpolateFunction(context);
            }
        }
    }
    angular.module('services').service('EmailParser', InterpolateService);
})();