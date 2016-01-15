!(function() {
    function ContestExampleDirective() {
        return {
            restrict: 'E',
            replace: true,
            templateUrl: '/components/directives/clickcontest/clickcontest.view.html',
            controllerAs: 'contest',
            controller:ContestExampleController
        }
    }

    function ContestExampleController($timeout) {
        var self = this;
        this.rolling = false;
        this.dice = 4;
        this.reroll = function () {
            this.rolling = true;
            $timeout(function () {
                self.rolling = false;
                self.dice = self.RNG(1, 6);
            }, 1000)
        };

        this.RNG = function (min, max) {
            return Math.random() * (max - min) + min;
        };
    }
    angular.module('exampleApp').directive('contestExample', ContestExampleDirective);
})();