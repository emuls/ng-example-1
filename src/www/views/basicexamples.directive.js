!(function(){
    function BasicExamplesDirective(){
        return {
            restrict : 'E',
            templateUrl:'/views/basicexamples.view.html',
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