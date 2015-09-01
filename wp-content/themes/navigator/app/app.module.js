angular.module('navigatorApp', ['ngRoute'])
    .config(function ($routeProvider, $locationProvider, $httpProvider) {
        $routeProvider
            .when('/', {
                templateUrl: appLocalized.components + 'home/homeView.html',
                controller: 'homeController'
            })
            .when('/navigator', {
                templateUrl: appLocalized.components + 'main/mainView.html',
                controller: 'mainController'
            })
            .when('/about', {
                templateUrl: appLocalized.components + 'about/aboutView.html',
                //controller: 'aboutController'
            })
            .when('/faq', {
                templateUrl: appLocalized.components + 'faq/faqView.html',
                //controller: 'faqController'
            })

        $locationProvider.html5Mode(true);
    })
    .controller('homeController', function ($scope, $http, $routeParams) {


        console.log('Home page file.');
    })
    .controller('mainController', function ($scope, $http, $routeParams) {
        //$http.get('wp-json/posts/').success(function (res) {
        //    $scope.posts = res;
        //});
        //
        //$http.get(' http://themes.population-2.com/dev/peekaboo-wp/wp-json/posts').success(function (res2) {
        //    $scope.posts2 = res2;
        //});


        console.log('Main file loaded.');
    })




