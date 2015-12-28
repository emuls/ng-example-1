angular.module('helloApp', []).controller('HelloController', function($scope, $timeout){
    $scope.clock = {};
    $scope.name = 'World';
    var updateClock = function(){
        $scope.clock.now = new Date();
        $timeout(function(){
            updateClock();
        }, 1000);
    }
    updateClock();
});