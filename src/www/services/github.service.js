!(function(){
    function GithubService($http){
        var githubURL = 'https://api.github.com';
        var username = 'emuls';
        var listeners = [];

        function makeRequest(username, path){
            var requestUrl = githubURL + '/users/' + username;
            if(path){
                requestUrl = requestUrl + '/' + path;
            }
            requestUrl = requestUrl + '?callback=JSON_CALLBACK';
            return $http({
                method: 'JSONP',
                url: requestUrl
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

            userProfile : function() {
                return makeRequest(username)
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