angular.module('navigatorApp', ['ngRoute'])
    .config(function ($routeProvider, $locationProvider) {
        $locationProvider.html5Mode(true);

        $routeProvider
            .when('/healthy-community-navigator/', {
                templateUrl: appLocalized.components + 'main/mainView.html',
                controller: 'mainController'
            })
    })
    .controller('mainController', function () {
        console.log('Main file loaded.');
    })
