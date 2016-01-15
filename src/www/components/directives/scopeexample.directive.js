!(function(){
    function TrueScopeDirective(){
        return{
            restrict: 'E',
            scope:true,
            template:'<div>' +
            '<p>This directive has a scope:true property and inherits it\'s scope prototypically as a result</p>' +
            '<h4>{{controllerProperty}}</h4>' +
            '<h4>{{controllerPropertyTwo}}</h4>' +
            '</div>'
        };
    }
    angular.module('exampleApp').directive('trueScope',TrueScopeDirective);
})();

!(function(){
    function NoScopeDirective(){
        return{
            restrict: 'E',
            template:'<div>' +
            '<p>This directive does not have a scope property and inherits prototypically as a result</p>' +
            '<h4>{{controllerProperty}}</h4>' +
            '<h4>{{controllerPropertyTwo}}</h4>' +
            '</div>'
        };
    }
    angular.module('exampleApp').directive('noScope', NoScopeDirective);
})();

!(function(){
    function IsolateScopeDirective(){
        return{
            restrict: 'E',
            scope:{
                controllerPropertyTwo: '='
            },
            template:'<div>' +
            '<p>This directive sets it\'s scope property and thus does not inherit, the example controller property one should not appear below.  However, it double-binds property two using \'=\' notation</p>' +
            '<h4>{{controllerProperty}}</h4>' +
            '<h4>{{controllerPropertyTwo}}</h4>' +
            '</div>'
        };
    }
    angular.module('exampleApp').directive('isolateScope',IsolateScopeDirective);
})();

!(function(){
    function ScopeExampleController($scope){
        $scope.controllerProperty = 'Controller Property';
        this.propState = true;
        $scope.changePropTwo = function(){
            this.propState = !this.propState;
            $scope.controllerPropertyTwo = this.propState ? 'Controller Property Two!' : 'Controller Property Two?';
        }

        $scope.changePropTwo();
    }
    angular.module('exampleApp').controller('ScopeExampleController',ScopeExampleController);
})();