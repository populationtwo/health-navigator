(function () {
    'use strict';

    angular
        .module('navigatorAppViews')
        .controller('aboutController', aboutController);

    function aboutController(WPService) {
        /* jshint validthis: true */
        var vm = this;

        //Get Advanced Custom Fields data.
        WPService.getAdvancedCustomFields().then(function () {

            //WPService.getWpPages();
            vm.data = WPService;

            var post_id = vm.data.acf.about_page.ID;
            WPService.getWpPages(post_id).then(function (result) {
                vm.post = result;
            });
        });

    }

}());
