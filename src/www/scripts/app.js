angular.module('helloApp', []).controller('HelloController', function($scope, $timeout, $parse){
    $scope.clock = {};
    $scope.name = 'World';
    $scope.expression = '$scope.name';
    $scope.parsedExpression = '';
    var updateClock = function(){
        $scope.clock.now = new Date();
        $timeout(function(){
            updateClock();
        }, 1000);
    }

    $scope.$watch('expression', function(newVal, oldVal, scope){
       if(newVal!==oldVal){
           var parseFunction = $parse(newVal);
           $scope.parsedExpression = parseFunction(scope);
       }
    });

    updateClock();
});