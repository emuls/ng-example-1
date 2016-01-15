angular.module('exampleApp', ['ngMaterial','ngRoute','services','rootComponents']);
angular.module('exFilters', []);
angular.module('rootComponents', ['services', 'exFilters']);
angular.module('services', ['ngResource']);