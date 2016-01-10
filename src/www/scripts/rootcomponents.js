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

angular.module('exampleApp').directive('apiCallExample', function(){
    return {
        restrict : 'E',
        replace: true,
        templateUrl: '/components/root/apicallexample.view.html',
        controllerAs:'httpexample',
        controller: function($http, $q, $timeout, $mdToast, TitleService, APIService){
            TitleService.title = 'API Example with $resource, $http, and $q'

            var self = this;
            self.loadingCars = true;
            self.ngresourcecars = [];
            var carsRequest = APIService.get({ id: 'cars' }, function() {
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

            $q.all([carsRequest.promise, httpCarsPromise]).then(function(data){
                $timeout(function(){
                    $mdToast.showSimple('Cars Loaded!');
                    self.loadingCars = false;
                }, 500);
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
        controller: function(TitleService){
            TitleService.title = 'Form Example';
        }
    }

});