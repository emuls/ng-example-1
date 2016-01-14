angular.module('services', ['ngResource']);

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

!(function(){
    function APIService($resource){
        return $resource('/api/:id');
    }
    angular.module('services').factory('APIService', ['$resource',APIService]);
})();


!(function(){
    function TitleService(){
        return {
            title: ''
        }
    }
    angular.module('services').service('TitleService',TitleService);
})();

!(function(){
    function GithubService($http){
        var githubURL = 'https://api.github.com';

        function makeRequest(username, path){
            return $http({
               method: 'JSONP',
                url: githubURL + '/users/' + username + '/' + path + '?callback=JSON_CALLBACK'
            });
        }

        return {
            events : function(username){
                return makeRequest(username, 'events');
            }
        }
    }
    angular.module('services').service('GithubService', GithubService);
})();

