
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

angular.module('exampleApp').directive('inheritedScope', function(){

});

angular.module('exampleApp').directive('isolateScope', function(){

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

angular.module('exampleApp').directive('transcludeRed', function(){
    return {
        restrict: 'E',
        priority: 101,
        scope: true, //must be isolated, {}, or set to true
        transclude:true,
        template:'<div style="color:red !important" ng-transclude></div>'
    }
});

