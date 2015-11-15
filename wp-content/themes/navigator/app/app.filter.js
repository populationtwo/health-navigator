(function () {
    'use strict';

    angular.module('navigatorAppViews')

    .filter('toTrusted', toTrusted);

    function toTrusted($sce) {
        return function (text) {
            return $sce.trustAsHtml(text);
        };
    };

}());
