!(function(){
    function GithubEventDirective(){
        return{
            restrict: 'E',
            controllerAs:'events',
            controller:GithubEventController,
            templateUrl:'/components/directives/github/githubevents.view.html'
        };
    }

    function GithubEventController($scope, GithubService) {
        var self = this;
        self.loading = false;
        self.limit = 5;

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