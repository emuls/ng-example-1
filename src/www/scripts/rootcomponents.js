angular.module('exampleApp').directive('basicExamples', function(){
    return {
        restrict : 'E',
        replace: true,
        templateUrl:'/components/root/basicexamples.view.html',
        controllerAs:'basic',
        controller: function($scope, $timeout, $parse, EmailParser, TitleService){
            var self = this;
            TitleService.title = 'Basic Examples';
            self.name = 'world';
            self.clock = {};
            self.expression = {value:'', options:[
                {name:'$Parse Name', value:'basic.name', id:1},
                {name:'$Parse clock.now', value:'basic.clock.now', id:2}
            ]};
            self.expression.selected = self.expression.options[0];
            self.parsedExpression = '';
            this.email = {
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
    }
});

angular.module('exampleApp').directive('httpExample', function(){
    return {
        restrict : 'E',
        replace: true,
        templateUrl: '/components/root/httpexample.view.html',
        controllerAs:'httpexample',
        controller: function($http, TitleService, APIService){
            var self = this;
            self.cars = [];
            var carsRequest = APIService.get({ id: 'cars' }, function() {
                self.cars = carsRequest.cars;
            });
            TitleService.title = '$http Example'

        }
    }
});

angular.module('exampleApp').directive('formExample', function(){
    return {
        restrict : 'E',
        replace: true,
        templateUrl:'/components/root/formexample.view.html',
        controllerAs:'formexample',
        controller: function(TitleService){
            TitleService.title = 'Form Example';
        }
    }

});