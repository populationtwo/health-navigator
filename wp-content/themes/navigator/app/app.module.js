angular.module('navigatorApp', ['ngRoute'])
    .config(function ($routeProvider, $locationProvider, $httpProvider) {
        $locationProvider.html5Mode(true);

        $httpProvider.defaults.useXDomain = true;

        delete $httpProvider.defaults.headers.common['X-Requested-With'];

        $routeProvider
            .when('/healthy-community-navigator/', {
                templateUrl: appLocalized.components + 'main/mainView.html',
                controller: 'mainController'
            })
    })
    .controller('mainController', function ($scope, $http, $routeParams) {
        $http.get('wp-json/posts/').success(function (res) {
            $scope.posts = res;
        });

        $http.get(' http://themes.population-2.com/dev/peekaboo-wp/wp-json/posts').success(function (res2) {
            $scope.posts2 = res2;
        });


        console.log('Main file loaded.');
    })




