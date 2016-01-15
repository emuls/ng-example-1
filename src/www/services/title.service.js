!(function(){
    function TitleService(){
        return {
            title: ''
        }
    }
    angular.module('services').service('TitleService',TitleService);
})();