(function () {
    'use strict';

    angular
        .module('navigatorAppViews')
        .controller('resourcesPaginationCtrl', resourcesPaginationCtrl);

    function resourcesPaginationCtrl($scope) {
        $scope.pageChangeHandler = function (num) {
            //console.log('going to page ' + num);
        };
    }
}());