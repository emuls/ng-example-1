!(function() {
    function ExampleCardDirective() {
        return {
            restrict: 'E',
            scope: {
                title: '@'
            },
            templateUrl: '/components/directives/examplecard.view.html',
            transclude: true
        }
    }

    angular.module('exampleApp').directive('exampleCard', ExampleCardDirective);
})();

!(function() {
    function CarBlurbDirective() {
        return {
            restrict: 'E',
            replace: false,
            scope: {
                car: '='
            },
            templateUrl: '/components/directives/carblurb.view.html'
        }
    }
    angular.module('exampleApp').directive('carBlurb', CarBlurbDirective);
})();

!(function(){
    function RainbowDateDirective(){
        return {
            restrict: 'E',
            replace: true,
            scope: {
                date: '=date'
            },
            template: '<div class="rainbowDate">' +
            '<span class="month">{{date.getMonth()+1 | numberFixedLen:2}}</span>/' +
            '<span class="day">{{date.getDate()}}</span>/' +
            '<span class="year">{{date.getFullYear()}}</span>' +
            '<span class="dateTimeSeparator">&nbsp;:::&nbsp;</span>' +
            '<span class="hours">{{date.getHours() | numberFixedLen:2}}</span>:' +
            '<span class="minutes">{{date.getMinutes() | numberFixedLen:2}}</span>:' +
            '<span class="seconds">{{date.getSeconds() | numberFixedLen:2}}</span>' +
            '</div>'
        }
    }
    angular.module('exampleApp').directive('rainbowDate', RainbowDateDirective);
})();

!(function() {
    'use strict';
    function MakeGreenDirective() {
        return {
            restrict: 'A',
            replace: false,
            priority: 99,
            terminal: true,
            compile: compile
        }
    }

    function compile(element, attrs, fTransclude) {
        element.css({"color": "green"})
    }

    angular.module('exampleApp').directive('makeGreen', MakeGreenDirective);
})();


!(function() {
    'use strict';
    function MakeRedDirective() {
        return {
            restrict: 'A',
            replace: false,
            priority: 99,
            terminal: true,
            compile: compile
        }
    }

    function compile(element, attrs, fTransclude) {
        element.css({"color": "red"})
    }

    angular.module('exampleApp').directive('makeRed', MakeRedDirective);
})();

!(function(){
    function TranscludeBlueDirective(){
        return {
            restrict: 'EA',
            priority: 101,
            replace:false,
            scope: {}, //must be isolated, {}, or set to true
            transclude:true,
            template:'<div style="color:blue" ng-transclude></div>'
        }
    }
    angular.module('exampleApp').directive('transcludeBlue', TranscludeBlueDirective);
})();

!(function() {
    function ContestExampleDirective() {
        return {
            restrict: 'E',
            replace: true,
            templateUrl: '/components/directives/clickcontestexample.view.html',
            controllerAs: 'contest',
            controller:ContestExampleController
        }
    }

    function ContestExampleController($timeout) {
        var self = this;
        this.rolling = false;
        this.dice = 4;
        this.reroll = function () {
            this.rolling = true;
            $timeout(function () {
                self.rolling = false;
                self.dice = self.RNG(1, 6);
            }, 1000)
        };

        this.RNG = function (min, max) {
            return Math.random() * (max - min) + min;
        };
    }
    angular.module('exampleApp').directive('contestExample', ContestExampleDirective);
})();

!(function(){

    function TrueScopeDirective(){
        return{
            restrict: 'E',
            scope:true,
            template:'<div>' +
            '<p>This directive has a scope:true property and inherits it\'s scope prototypically as a result</p>' +
            '<h4>{{controllerProperty}}</h4>' +
            '<h4>{{controllerPropertyTwo}}</h4>' +
            '</div>'
        };
    }
    angular.module('exampleApp').directive('trueScope',TrueScopeDirective);
})();

!(function(){
    function NoScopeDirective(){
        return{
            restrict: 'E',
            template:'<div>' +
            '<p>This directive does not have a scope property and inherits prototypically as a result</p>' +
            '<h4>{{controllerProperty}}</h4>' +
            '<h4>{{controllerPropertyTwo}}</h4>' +
            '</div>'
        };
    }
    angular.module('exampleApp').directive('noScope', NoScopeDirective);
})();

!(function(){
    function IsolateScopeDirective(){
        return{
            restrict: 'E',
            scope:{
                controllerPropertyTwo: '='
            },
            template:'<div>' +
            '<p>This directive sets it\'s scope property and thus does not inherit, the example controller property one should not appear below.  However, it double-binds property two using \'=\' notation</p>' +
            '<h4>{{controllerProperty}}</h4>' +
            '<h4>{{controllerPropertyTwo}}</h4>' +
            '</div>'
        };
    }
    angular.module('exampleApp').directive('isolateScope',IsolateScopeDirective);
})();

!(function(){
    function ScopeExampleController($scope){
        $scope.controllerProperty = 'Controller Property';
        this.propState = true;
        $scope.changePropTwo = function(){
            this.propState = !this.propState;
            $scope.controllerPropertyTwo = this.propState ? 'Controller Property Two!' : 'Controller Property Two?';
        }

        $scope.changePropTwo();
    }
    angular.module('exampleApp').controller('ScopeExampleController',ScopeExampleController);
})();

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
