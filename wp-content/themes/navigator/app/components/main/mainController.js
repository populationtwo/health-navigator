angular.module('navigatorApp').controller('mainController', function ($scope, $http, $q, navigatorResources) {
    $http.get('wp-json/posts/').success(function (res) {
        $scope.posts = res;
    });

    $http.get(' http://themes.population-2.com/dev/peekaboo-wp/wp-json/posts').success(function (res2) {
        $scope.posts2 = res2;
    });

    console.log('Main file loaded.');

    navigatorResources()
        .then(function(resources) {
            $scope.resourcePosts = resources.data;
        });



})