angular.module('helloApp', []).controller('HelloController', function($scope, $timeout, $parse){
    $scope.clock = {};
    $scope.name = 'World';
    $scope.expression = {value:'', options:[
        {name:'$Parse Name', value:'name', id:1},
        {name:'$Parse clock.now', value:'clock.now', id:2}
    ]};
    $scope.expression.selected = $scope.expression.options[0];
    $scope.parsedExpression = '';
    $scope.$watch('expression.selected', function(newVal, oldVal, scope){
       if(newVal!==oldVal){
           evaluateExpression(newVal.value, scope);
       }
    });

    var evaluateExpression = function(expr, scope){
        var parseFunction = $parse(expr);
        $scope.parsedExpression = parseFunction(scope);
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