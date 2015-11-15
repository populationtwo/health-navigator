(function () {

    'use strict';

    // Load the module dependency here
    angular.module('navigatorApp', [
        'ui.router',
        'ui.bootstrap',
        'navigatorAppViews',
        'ngTable', // table module
        'ngTableExport', // CSV expport
        'ui.select', // table dropdown
        'datamaps',
        'ngAnimate',
        'angular-clipboard', // share URL
        '720kb.socialshare'
    ]);

}());
