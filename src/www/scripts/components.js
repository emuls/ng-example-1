
angular.module('exampleApp').directive('exampleCard', function(){
   return {
       restrict: 'E',
       replace: true,
       scope:{
           title:'@'
       },
       templateUrl:'/components/directives/examplecard.view.html',
       transclude:true
   }
});

angular.module('exampleApp').directive('rainbowDate', function(){
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
});

angular.module('exampleApp').directive('makeGreen', function(){
    return {
        restrict: 'A',
        replace: false,
        priority: 99,
        terminal: true,
        link: function($scope, element, attrs){
            element.css({"color":"green"})
        }
    }
});

angular.module('exampleApp').directive('makeRed', function(){
    return {
        restrict: 'A',
        replace: false,
        priority: 100,
        terminal: true,
        link: function($scope, element, attrs){
            element.css({"color":"red"})
        }
    }
});

angular.module('exampleApp').directive('transcludeBlue', function(){
    return {
        restrict: 'EA',
        priority: 101,
        replace:false,
        scope: {}, //must be isolated, {}, or set to true
        transclude:true,
        template:'<div style="color:blue" ng-transclude></div>'
    }
});

angular.module('exampleApp').directive('contestExample', function(){
    return {
        restrict: 'E',
        replace: true,
        templateUrl:'/components/directives/clickcontestexample.view.html',
        controllerAs:'contest',
        controller:function($timeout){
            var self = this;
            this.rolling=false;
            this.dice=4;
            this.reroll = function(){
                this.rolling = true;
                $timeout(function(){
                    self.rolling = false;
                    self.dice = this.getRandomArbitrary(1,6);
                }, 1500)
            };

            this.getRandomArbitrary = function(min, max) {
                return Math.random() * (max - min) + min;
            };
        }
    }
});

angular.module('exampleApp').directive('trueScope', function(){
    return{
        restrict: 'E',
        scope:true,
        template:'<div>' +
        '<p>This directive has a scope:true property and inherits it\'s scope prototypically as a result</p>' +
        '<h4>{{controllerProperty}}</h4>' +
        '</div>'
    };
});

angular.module('exampleApp').directive('noScope', function(){
    return{
        restrict: 'E',
        template:'<div>' +
        '<p>This directive does not have a scope property and inherits prototypically as a result</p>' +
        '<h4>{{controllerProperty}}</h4>' +
        '</div>'
    };
});

angular.module('exampleApp').directive('isolateScope', function(){
    return{
        restrict: 'E',
        scope:{},
        template:'<div>' +
            '<p>This directive sets it\'s scope property and thus does not inherit, the example controller property should not appear below</p>' +
            '<h4>{{controllerProperty}}</h4>' +
        '</div>'
    };
});

angular.module('exampleApp').controller('ScopeExampleController', function($scope){
    $scope.controllerProperty = 'Controller Property';
});

