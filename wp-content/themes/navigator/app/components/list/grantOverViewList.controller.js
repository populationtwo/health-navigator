(function () {
    'use strict';

    angular
        .module('navigatorAppViews')
        .controller('grantOverviewListCtrl', grantOverviewListCtrl);


    /* @ngInject */
    function grantOverviewListCtrl($stateParams, $state, $rootScope) {
        /* jshint validthis: true */
        var vm = this;

        //Pass route state params to $scope
        vm.grId = $stateParams.grId;
        vm.grAwId = $stateParams.grAwId;
        vm.tpId = $stateParams.tpId;
        vm.termId = $stateParams.termId;

        //Pass route state params to parent $scope (mainCtrl)
        if ($stateParams.grId) {
            if (typeof($stateParams.grId.map) === 'function') { // if more than one query convert array of string to number
                $rootScope.grId = $stateParams.grId.map(function (x) {
                    return parseInt(x, 10);
                });
            } else {
                var grIdArr = []
                grIdArr.push(parseInt($stateParams.grId));
                $rootScope.grId = grIdArr;
            }
        }

        if ($stateParams.grAwId) {
            if (typeof($stateParams.grAwId.map) === 'function') { // if more than one query convert array of string to number
                $rootScope.grAwId = $stateParams.grAwId.map(function (x) {
                    return parseInt(x, 10);
                });
            } else {
                var grAwIdArr = []
                grAwIdArr.push(parseInt($stateParams.grAwId));
                $rootScope.grAwId = grAwIdArr;
            }
        }

        if ($stateParams.tpId) {
            if (typeof($stateParams.tpId.map) === 'function') { // if more than one query convert array of string to number
                $rootScope.tpId = $stateParams.tpId.map(function (x) {
                    return parseInt(x, 10);
                });
            } else {
                var tpIdArr = []
                tpIdArr.push(parseInt($stateParams.tpId));
                $rootScope.tpId = tpIdArr;
            }
        }

        if ($stateParams.termId) {
            if (typeof($stateParams.termId.map) === 'function') { // if more than one query convert array of string to number
                $rootScope.termId = $stateParams.termId.map(function (x) {
                    return parseInt(x, 10);
                });
            } else {
                var termIdArr = []
                termIdArr.push(parseInt($stateParams.termId));
                $rootScope.termId = termIdArr;
            }
        }
    }

}());
