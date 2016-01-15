!(function(){
    function GithubUserProfileDirective(){
        return{
            restrict: 'E',
            controllerAs:'user',
            controller:GithubUserProfileController,
            templateUrl:'/components/directives/github/githubuserprofile.view.html'
        };
    }

    function GithubUserProfileController($scope, GithubService) {
        var self = this;
        self.loading = false;

        self.usernameUpdated = function(){
            self.loading = true;
            GithubService.userProfile().then(function success(response, status, headers){
                self.loading = false;
                self.data = response.data.data;
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

    angular.module('exampleApp').directive('githubUser',GithubUserProfileDirective);

})();