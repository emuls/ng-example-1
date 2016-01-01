angular.module('exampleApp').controller('ExampleController', function($scope, $timeout, $parse, EmailParser){
    $scope.clock = {};
    $scope.name = 'world';
    $scope.expression = {value:'', options:[
        {name:'$Parse Name', value:'name', id:1},
        {name:'$Parse clock.now', value:'clock.now', id:2}
    ]};
    $scope.expression.selected = $scope.expression.options[0];
    $scope.parsedExpression = '';
    $scope.email = {};
    $scope.email.to = 'test@example.com';
    $scope.email.body = 'My email to: {{to}}';
    $scope.email.previewText = '';

    $scope.$watch('expression.selected', function(newVal, oldVal, scope){
        if(newVal!==oldVal){
            evaluateExpression(newVal.value, scope);
        }
    });
    $scope.$watchGroup(['email.body','email.to'], function(newValues, oldValues, scope){
        $scope.email.previewText = EmailParser.parse(newValues[0], {to: newValues[1]});
    });

    var evaluateExpression = function(expr){
        var parseFunction = $parse(expr);
        $scope.parsedExpression = parseFunction($scope);
    }

    var updateClock = function(){
        $scope.clock.now = new Date();
        $timeout(function(){
            updateClock();
        }, 1000);
    }

    updateClock();
    evaluateExpression($scope.expression.selected.value, $scope);
});

angular.module('exampleApp').controller('ExampleFormController', function($scope){
   $scope.exampleform = 'Example Form';
});

angular.module('exampleApp').controller('BuiltInDirectiveController', function($scope){
    $scope.show = {thisThat:true};
})