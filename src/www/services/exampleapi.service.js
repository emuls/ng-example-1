!(function(){
    function APIService($resource){
        return $resource('/api/:id');
    }
    angular.module('services').factory('APIService', ['$resource',APIService]);
})();