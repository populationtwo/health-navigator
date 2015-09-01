'use strict';

var app = angular

    .module( 'navigatorApp', [
        'ui.router'
    ] )

    .config(function ($stateProvider, $urlRouterProvider) {

        // For any unmatched url, redirect to /
        $urlRouterProvider.otherwise( '/' );

        // Now set up the states
        $stateProvider

            .state( 'home', {
                url        : '/',
                templateUrl: appLocalized.components + 'home/homeView.html',
                //controller : 'homeController'
            } )
            .state( 'navigator', {
                url        : '/navigator',
                templateUrl: appLocalized.components + 'main/mainView.html',
                controller: 'mainController'
            } )
            .state( 'about', {
                url        : '/about',
                templateUrl: appLocalized.components + 'about/aboutView.html',
            } )
            .state( 'faq', {
                url        : '/faq',
                templateUrl: appLocalized.components + 'faq/faqView.html',
            } );


        //$locationProvider.html5Mode(true);
    })
    .controller('homeController', function ($scope, $http, $routeParams) {


        console.log('Home page file.');
    })
    .controller('mainController', function ($scope, $http ) {
        $http.get('wp-json/posts/').success(function (res) {
            $scope.posts = res;
        });

        $http.get(' http://themes.population-2.com/dev/peekaboo-wp/wp-json/posts').success(function (res2) {
            $scope.posts2 = res2;
        });


        console.log('Main file loaded.');
    })




