!(function() {
    'use strict';
    function MakeGreenDirective() {
        return {
            restrict: 'A',
            replace: false,
            priority: 99,
            terminal: true,
            compile: compile
        }
    }

    function compile(element, attrs, fTransclude) {
        element.css({"color": "green"})
    }

    angular.module('exampleApp').directive('makeGreen', MakeGreenDirective);
})();


!(function() {
    'use strict';
    function MakeRedDirective() {
        return {
            restrict: 'A',
            replace: false,
            priority: 99,
            terminal: true,
            compile: compile
        }
    }

    function compile(element, attrs, fTransclude) {
        element.css({"color": "red"})
    }

    angular.module('exampleApp').directive('makeRed', MakeRedDirective);
})();

!(function(){
    function TranscludeBlueDirective(){
        return {
            restrict: 'EA',
            priority: 101,
            replace:false,
            scope: {}, //must be isolated, {}, or set to true
            transclude:true,
            template:'<div style="color:blue" ng-transclude></div>'
        }
    }
    angular.module('exampleApp').directive('transcludeBlue', TranscludeBlueDirective);
})();