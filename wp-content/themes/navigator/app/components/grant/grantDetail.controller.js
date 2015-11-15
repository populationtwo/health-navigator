(function () {
    'use strict';

    angular
        .module('navigatorAppViews')
        .controller('grantDetailCtrl', grantDetailCtrl);

    function grantDetailCtrl($stateParams, $state, NgTableParams, $filter, WPService, $location, $scope, $http) {

        /* jshint validthis: true */
        var vm = this;

        WPService.getAllGrants().then(function () {
            vm.wpData = WPService;

            /*jshint camelcase: false */

            // Get data from factory
            var dataGrants = WPService.grData.grants,
                dataGrantee = WPService.grData.organizations,
                dataGrantsAwards = WPService.grData.grants_awards;

            // Get Grant Name by ID
            vm.getGrantName = function (grtId) {
                for (var i = 0, dl = dataGrants.length; i < dl; i++) {
                    if (dataGrants[i].id === grtId) {
                        return dataGrants[i].name;
                    }
                }
            };

            // Table Parameter
            vm.tableParams = new NgTableParams({
                page: 1,            // show first page
                count: 15,          // count per page
                filter: {
                    grant_id: vm.grantId // set the default filter type
                },
                sorting: {
                    organization_name: 'asc'     // set the default sort type
                }
            }, {
                total: dataGrantsAwards.length, // length of data
                getData: function ($defer, params) {
                    // use built-in angular filter
                    var filteredData = params.filter() ?
                        $filter('filter')(dataGrantsAwards, params.filter(), true) :
                        dataGrantsAwards;
                    var orderedData = params.sorting() ?
                        $filter('orderBy')(filteredData, params.orderBy()) :
                        dataGrantsAwards;
                    params.total(orderedData.length);
                    $defer.resolve(
                        orderedData.slice((params.page() - 1) * params.count(), params.page() * params.count())
                    );
                }
            });

        });

        //Pass route stateparams to $scope
        vm.grantId = parseInt($stateParams.grantId);

        // Go to Grantee Award Page
        vm.toGranteeAwardPage = function (granteeId, grantId) {
            $state.go('navigator.grantAward', {
                granteeId: granteeId,
                grantId: grantId
            });
        };

        vm.urlPlaceholder = $location.absUrl();

        // Generate URL only when data changed
        $scope.$watchGroup(angular.bind(vm, [function () {
            return vm.urlPlaceholder;
        }]), function (newVal, oldVal) {
            $http.post('https://www.googleapis.com/urlshortener/v1/url?key=AIzaSyCxPheqSE9R6ULGRI-u-D5aMLRjuz36Kn8', {longUrl: $location.absUrl()}).success(function (data) {
                vm.shortUrl = data.id;
            }).error(function (data, status) {
                console.log(status);
            });
        });

    }

}());