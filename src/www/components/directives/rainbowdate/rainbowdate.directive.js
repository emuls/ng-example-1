!(function(){
    function RainbowDateDirective(){
        return {
            restrict: 'E',
            replace: true,
            scope: {
                date: '=date'
            },
            templateUrl:'/components/directives/rainbowdate/rainbowdate.view.html'
        }
    }
    angular.module('exampleApp').directive('rainbowDate', RainbowDateDirective);
})();