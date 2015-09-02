'use strict';

var app = angular

    .module( 'navigatorApp', [
        'ui.router',
        'ui.bootstrap'
    ] )

    .config(function ($stateProvider, $urlRouterProvider) {

        // For any unmatched url, redirect to /
        $urlRouterProvider.otherwise( '/' );

        // Now set up the states
        $stateProvider

            .state('home', {
                url: '/',
                templateUrl: appLocalized.components + 'home/homeView.html',
                //controller : 'homeController'
            })

            .state('navigator', {
                url: '/navigator',
                templateUrl: appLocalized.components + 'main/mainView.html',
                controller: 'mainController'
            })
                .state('navigator.main', { // Grant Overview Page
                    url: "/grantee",
                    templateUrl: appLocalized.components + "grantee/granteeView.html",
                    controller: function($scope){
                        $scope.items = ["A", "List", "Of", "Items"];
                    }
                })
                .state('navigator.grantee', { // Grant Detail Page
                    url: "/grantee/detail",
                    templateUrl: appLocalized.components + "grantee/granteeDetailView.html",
                    controller: function($scope){
                        $scope.items = ["A", "List", "Of", "Items"];
                    }
                })
                .state('navigator.granteeAward', { // Grant Award & Grantee
                    url: "/grantee/award",
                    templateUrl: appLocalized.components + "grantee/granteeAwardView.html",
                    controller: function($scope){
                        $scope.things = ["A", "List", "Of", "Items"];
                    }
                })

            .state('about', {
                url: '/about',
                templateUrl: appLocalized.components + 'about/aboutView.html',
            })
            .state('faq', {
                url: '/faq',
                templateUrl: appLocalized.components + 'faq/faqView.html',
            })
            .state('route1', {
                url: "/route1",
                templateUrl: appLocalized.components + "route1.html"
            })


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



    .controller('TabsOverviewCtrl', function ($scope, $window) {
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
    });




