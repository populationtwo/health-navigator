(function () {

    'use strict';

    angular.module('navigatorApp', [
        'ui.router',
        'ui.bootstrap'
    ])

        .config(function ($stateProvider, $urlRouterProvider) {

            // For any unmatched url, redirect to /
            $urlRouterProvider.otherwise('/');

            // Now set up the states
            $stateProvider

                .state('home', {
                    url: '/',
                    templateUrl: appLocalized.components + 'home/homeView.html'
                    //controller : 'homeController'
                })

                .state('navigator', {
                    url: '/navigator',
                    templateUrl: appLocalized.components + 'main/mainView.html',
                    controller: 'mainController'
                })
                .state('navigator.main', { // Grant Overview Page
                    url: '/grantee',
                    templateUrl: appLocalized.components + 'grantee/granteeView.html',
                    controller: function ($scope) {
                        $scope.items = ['A', 'List', 'Of', 'Items'];
                    }
                })
                .state('navigator.grantee', { // Grant Detail Page
                    url: '/grantee/detail',
                    templateUrl: appLocalized.components + 'grantee/granteeDetailView.html'

                })
                .state('navigator.granteeAward', { // Grant Award & Grantee
                    url: '/grantee/award',
                    templateUrl: appLocalized.components + 'grantee/granteeAwardView.html'

                })

                .state('about', {
                    url: '/about',
                    templateUrl: appLocalized.components + 'about/aboutView.html'
                })
                .state('faq', {
                    url: '/faq',
                    templateUrl: appLocalized.components + 'faq/faqView.html'
                })
                .state('route1', {
                    url: '/route1',
                    templateUrl: appLocalized.components + 'route1.html'
                });


            //$locationProvider.html5Mode(true);
        })


        .controller('homeController', function () {
            console.log('Home page file.');
        })


        //TODO: Move this to separate file
        .controller('TabsOverviewCtrl', function () {
            //$scope.tabs = [
            //    { title:'Dynamic Title 1', content:'Dynamic content 1' },
            //    { title:'Dynamic Title 2', content:'Dynamic content 2', disabled: true }
            //];
            //
            //$scope.alertMe = function() {
            //    setTimeout(function() {
            //        $window.alert('You\'ve selected the alert tab!');
            //    });
            //};
        })


        .filter('toTrusted', ['$sce', function ($sce) {
            return function (text) {
                return $sce.trustAsHtml(text);
            };
        }]);
}());



