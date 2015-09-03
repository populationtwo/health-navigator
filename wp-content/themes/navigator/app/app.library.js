(function () {
    'use strict';

    angular.module('navigatorApp')
        .constant('RESOURCES_JSON_FILE', './wp-content/themes/navigator/assets/js/json/resources.json')
        .factory('navigatorResources', function ($http, $q, RESOURCES_JSON_FILE) {
            return function () {
                return $http({
                    cache: true,
                    method: 'GET',
                    url: RESOURCES_JSON_FILE
                });
            };
        });
}());
