!(function() {
    function APICallExampleDirective() {
        return {
            restrict: 'E',
            templateUrl: '/views/apicallexample.view.html',
            controllerAs: 'httpexample',
            controller: APICallExampleController
        }
    }

    function APICallExampleController($http, $q, $timeout, $mdToast, TitleService, APIService) {
        TitleService.title = 'API Example with $resource, $http, and $q'

        var self = this;
        self.loadingCars = true;
        self.ngresourcecars = [];
        var carsRequest = APIService.get({id: 'cars'}, function () {
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

        $q.all([carsRequest.promise, httpCarsPromise]).then(function (data) {
            $timeout(function () {
                $mdToast.showSimple('Cars Loaded!');
                self.loadingCars = false;
            }, 500);
        });
    }

    angular.module('rootComponents').directive('apiCallExample', APICallExampleDirective);
})();