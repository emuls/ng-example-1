angular.module('services', []);

angular.module('services').service('EmailParser',function($interpolate){
    return {
        parse: function(text, context){
            var interpolateFunction = $interpolate(text);
            return interpolateFunction(context);
        }
    }
});

angular.module('services').service('TitleService', function(){
    return {
        title: ''
    }
});