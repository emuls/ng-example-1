angular.module('exampleApp').directive('basicExamples', function(){
    return {
        restrict : 'E',
        replace: true,
        templateUrl:'/components/root/basicexamples.view.html',
        controllerAs:'basic',
        controller: function($scope, $timeout, $parse, EmailParser){
            var self = this;
            self.title = 'Basic Examples';
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

            $scope.$watch(function(){return self.expression.selected}, function(newVal, oldVal, scope){
                if(newVal!==oldVal){
                    evaluateExpression(newVal.value, scope);
                }
            });
            $scope.$watchGroup([function(){return self.email.to},function(){return self.email.body}], function(newValues, oldValues, scope){
                self.email.previewText = EmailParser.parse(newValues[0], {to: newValues[1]});
            });
        }
    }
});

angular.module('exampleApp').directive('formExample', function(){
   return {
       restrict : 'E',
       replace: true,
       templateUrl:'/components/root/formexample.view.html',
       controllerAs:'formexample',
       controller: function(){
           this.title = 'Form Example';
       }
   }

});

angular.module('exampleApp').directive('builtinExample', function(){
    return {
        restrict : 'E',
        replace: true,
        templateUrl:'/components/root/builtinexample.view.html',
        controllerAs:'builtin',
        controller:function(){
            this.title = "Built-in Directive Examples"
            this.thisThat = true;
        }
    }
});

angular.module('exampleApp').directive('rainbowDate', function(){
    return {
        restrict: 'E',
        replace: true,
        scope: {
            date: '=date'
        },
        template: '<p class="rainbowDate">' +
            '<span class="month">{{date.getMonth()+1 | numberFixedLen:2}}</span>/' +
            '<span class="day">{{date.getDate()}}</span>/' +
            '<span class="year">{{date.getFullYear()}}</span>' +
            '<span class="dateTimeSeparator">&nbsp;:::&nbsp;</span>' +
            '<span class="hours">{{date.getHours() | numberFixedLen:2}}</span>:' +
            '<span class="minutes">{{date.getMinutes() | numberFixedLen:2}}</span>:' +
            '<span class="seconds">{{date.getSeconds() | numberFixedLen:2}}</span>' +
        '</p>'
    }

});