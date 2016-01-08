angular.module('services', ['ngResource']);

angular.module('services').service('EmailParser',function($interpolate){
    return {
        parse: function(text, context){
            var interpolateFunction = $interpolate(text);
            return interpolateFunction(context);
        }
    }
});

angular.module('services').factory('APIService', ['$resource', function($resource){
    return $resource('/api/:id');
}]);

angular.module('services').service('TitleService', function(){
    return {
        title: ''
    }
});