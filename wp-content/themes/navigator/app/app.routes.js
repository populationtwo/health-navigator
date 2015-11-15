(function () {

    'use strict';

    angular.module('navigatorApp')

        .config(appConfig);



    function appConfig($stateProvider, $urlRouterProvider) {

        // For any unmatched url, redirect to /
        $urlRouterProvider.otherwise('/');

        // Now set up the states
        $stateProvider

            .state('home', {
                url: '/',
                templateUrl: appLocalized.components + 'home/homeView.html'
            })

            .state('navigator', {
                url: '/navigator',
                templateUrl: appLocalized.components + 'main/mainView.html',
                controller: 'mainController',
                controllerAs: 'main'
            })
            .state('navigator.main', { // Grant Overview List Page
                url: '/grantee?grId&grAwId&tpId&termId',
                templateUrl: appLocalized.components + 'list/grantOverViewListView.html',
            })

            .state('navigator.grantee', { // Grantee Detail Page
                url: '/grantee/:granteeId',
                templateUrl: appLocalized.components + 'grantee/granteeDetailView.html'
            })

            .state('navigator.grant', { // Grant Detail Page
                url: '/grant/:grantId',
                templateUrl: appLocalized.components + 'grant/grantDetailView.html'
            })

            .state('navigator.granteeAward', { // Grant Award & Grantee from grantee page
                url: '/grantee/:granteeId/:grantId',
                templateUrl: appLocalized.components + 'grantee-award/granteeAwardView.html'
            })

            .state('navigator.grantAward', { // Grant Award & Grantee from grant page
                url: '/grant/:granteeId/:grantId',
                templateUrl: appLocalized.components + 'grantee-award/granteeAwardView.html'
            })

            .state('about', {
                url: '/about',
                templateUrl: appLocalized.components + 'about/aboutView.html'
            })
            .state('faq', {
                url: '/faq',
                templateUrl: appLocalized.components + 'faq/faqView.html'
            });

    }


}());
