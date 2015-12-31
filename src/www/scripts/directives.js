angular.module('exampleApp').directive('simpleDate', function(){

    return {
        restrict: 'E',
        replace: true,
        scope: {
            date: '=date'
        },
        template: '<p class="simpleDate">' +
            '<span class="month">{{date.getMonth()+1}}</span>/' +
            '<span class="day">{{date.getDate()}}</span>/' +
            '<span class="year">{{date.getFullYear()}}</span>' +
            '<span class="dateTimeSeparator">&nbsp;:::&nbsp;</span>' +
            '<span class="hours">{{date.getHours()}}</span>:' +
            '<span class="minutes">{{date.getMinutes()}}</span>:' +
            '<span class="seconds">{{date.getSeconds()}}</span>' +
        '</p>'
    }

});