angular.module('rootComponents', ['services', 'exFilters']);

!(function(){
    function BasicExamplesDirective(){
        return {
            restrict : 'E',
            templateUrl:'/components/root/basicexamples.view.html',
            controllerAs:'basic',
            controller: BasicExamplesController
        }
    }
    function BasicExamplesController($scope, $timeout, $parse, EmailParser, TitleService){
        TitleService.title = 'Basic Examples';
        var self = this;
        self.name = 'world';
        self.clock = {};
        self.expression = {value:'', options:[
            {name:'$Parse Name', value:'basic.name', id:1},
            {name:'$Parse clock.now', value:'basic.clock.now', id:2}
        ]};
        self.expression.selected = self.expression.options[0];
        self.parsedExpression = '';
        self.email = {
            to: 'test@example.com',
            body: 'My email to: {{to}}',
            previewText : ''
        };

        var evaluateExpression = function(expr){
            var parseFunction = $parse(expr);
            self.parsedExpression = parseFunction($scope);
        }

        var updateClock = function(){
            self.clock.now = new Date();
            $timeout(function(){
                updateClock();
            }, 1000);
        }

        updateClock();
        evaluateExpression(self.expression.selected.value);

        $scope.$watch('basic.expression.selected', function(newVal, oldVal, scope){
            if(newVal!==oldVal){
                evaluateExpression(newVal.value, scope);
            }
        });
        $scope.$watchGroup(['basic.email.to','basic.email.body'], function(newValues, oldValues, scope){
            self.email.previewText = EmailParser.parse(newValues[1], {to: newValues[0]});
        });
    }
    angular.module('rootComponents').directive('basicExamples',BasicExamplesDirective);
})();


!(function() {
    function APICallExampleDirective() {
        return {
            restrict: 'E',
            templateUrl: '/components/root/apicallexample.view.html',
            controllerAs: 'httpexample',
            controller: APICallExampleController
        }
    }

    function APICallExampleController($http, $q, $timeout, $mdToast, TitleService, APIService) {
        TitleService.title = 'API Example with $resource, $http, and $q'

        var self = this;
        self.loadingCars = true;
        self.ngresourcecars = [];
        var carsRequest = APIService.get({id: 'cars'}, function () {
            self.ngresourcecars = carsRequest.cars;
        });

        var httpCarsPromise = $http({
            method: 'GET',
            url: '/api/cars'
        }).then(function successCallback(response) {
            self.httpcars = response.data.cars;
        }, function errorCallback(response) {
            $mdToast.showSimple('Error loading cars via http');
        });

        $q.all([carsRequest.promise, httpCarsPromise]).then(function (data) {
            $timeout(function () {
                $mdToast.showSimple('Cars Loaded!');
                self.loadingCars = false;
            }, 500);
        });
    }

    angular.module('rootComponents').directive('apiCallExample', APICallExampleDirective);
})();

!(function() {
    function FormExampleDirective() {
        return {
            restrict: 'E',
            templateUrl: '/components/root/formexample.view.html',
            controllerAs: 'formexample',
            controller: FormExampleController
        }
    }

    function FormExampleController(TitleService) {
        TitleService.title = 'Form Example';
    }

    angular.module('rootComponents').directive('formExample', FormExampleDirective);
})();

!(function() {
    function GithubExampleDirective() {
        return {
            restrict: 'E',
            templateUrl: '/components/root/githubexample.view.html',
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

        self.load = function(){
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

        self.usernameUpdated = function(){
            self.load();
        }

        GithubService.registerListener(this);
        GithubService.setUser(self.username);

        $scope.$on("$destroy", function() {
            GithubService.deregisterListener(self);
        });
    }
    angular.module('rootComponents').directive('githubExample', GithubExampleDirective);
})();
