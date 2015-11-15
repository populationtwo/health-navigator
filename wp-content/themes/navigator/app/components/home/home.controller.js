(function () {
    'use strict';

    angular
        .module('navigatorAppViews')
        .controller('homeController', homeController);

    function homeController(WPService) {
        /* jshint validthis: true */
        var vm = this;

        WPService.getAdvancedCustomFields();
        vm.data = WPService;

    }

}());
