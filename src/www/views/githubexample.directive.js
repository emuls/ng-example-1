!(function() {
    function GithubExampleDirective() {
        return {
            restrict: 'E',
            templateUrl: '/views/githubexample.view.html',
            controllerAs: 'githubExample',
            controller: GithubExampleController
        }
    }
    function GithubExampleController($scope, TitleService, GithubService) {
        TitleService.title = 'Github API Example';
        var self = this;
        self.username=GithubService.getUser();

        self.setUser = function(){
            GithubService.setUser(self.username);
        }

        GithubService.setUser(self.username);
    }
    angular.module('rootComponents').directive('githubExample', GithubExampleDirective);
})();