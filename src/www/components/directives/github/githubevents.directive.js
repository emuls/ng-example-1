!(function(){
    function GithubEventDirective(){
        return{
            restrict: 'E',
            controllerAs:'events',
            controller:GithubEventController,
            template:'<div>' +
            '<h4 ng-show="events.loading">Loading Data...</h4>' +
            '<ul ng-show="!events.loading">' +
            '<li ng-repeat="event in events.events">' +
            '<img ng-src="{{event.actor.avatar_url}}" style="width:30px;height:30px"/>' +
            '{{event.actor.login}} - {{event.repo.name}}' +
            '</li>' +
            '</ul>' +
            '</div>'
        };
    }

    function GithubEventController($scope, GithubService) {
        var self = this;
        self.loading = false;

        self.usernameUpdated = function(){
            self.loading = true;
            GithubService.events().then(function success(response, status, headers){
                self.loading = false;
                self.data = response.data;
                self.events = response.data.data;
            }, function error(){
                self.loading = false;
                alert('error loading data');
            });
        }

        GithubService.registerListener(self);
        $scope.$on("$destroy", function() {
            GithubService.deregisterListener(self);
        });
    }

    angular.module('exampleApp').directive('githubEvents',GithubEventDirective);

})();