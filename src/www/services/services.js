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
        var username = 'emuls';
        var listeners = [];

        function makeRequest(username, path){
            return $http({
               method: 'JSONP',
                url: githubURL + '/users/' + username + '/' + path + '?callback=JSON_CALLBACK'
            });
        }

        function inArray(array, obj){
            var found = false;
            for(var i = 0; i < listeners.length; i++){
                if(listeners[i]===obj){
                    found = true;
                }
            }
            return found;
        }

        return {
            getUser : function(){
                return username;
            },
            setUser : function(newUsername) {
                username = newUsername;
                for(var i = 0; i < listeners.length; i++){
                    listeners[i].usernameUpdated();
                }
            },
            events : function(){
                return makeRequest(username, 'events');
            },
            registerListener : function(listener){
                if(!inArray(listeners, listener)){
                    listeners.push(listener);
                    console.log('Added listener, ' + listeners.length + ' now registered')
                }
            },
            deregisterListener : function(listener){
              for(var i = 0; i < listeners.length; i++){
                  if(listeners[i]===listener){
                      listeners.splice(i, 1);
                      console.log('Removed listener, ' + listeners.length + ' still registered')
                      break;
                  }
              }
            }
        }
    }
    angular.module('services').service('GithubService', GithubService);
})();
