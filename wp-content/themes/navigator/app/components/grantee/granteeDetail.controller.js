(function () {
    'use strict';

    angular
        .module('navigatorAppViews')
        .controller('granteeDetailCtrl', granteeDetailCtrl);

    function granteeDetailCtrl(WPService, $stateParams, $state, NgTableParams, $filter, $location, $http, $scope) {

        /* jshint validthis: true */
        var vm = this;

        WPService.getAllGrants().then(function () {
            /*jshint camelcase: false */

            // Get data from factory
            vm.wpData = WPService;
            var dataGrantee = WPService.grData.organizations,
                dataGrantsAwards = WPService.grData.grants_awards;

            // Get Grantee Organization Name by ID
            vm.getOrganizationName = function (grteId) {
                for (var i = 0, dl = dataGrantee.length; i < dl; i++) {
                    if (dataGrantee[i].id === grteId) {
                        return dataGrantee[i].name;
                    }
                }
            };

            // Table Parameter
            vm.tableParams = new NgTableParams({
                page: 1,            // show first page
                count: 15,          // count per page
                filter: {
                    organization_id: vm.granteeId // set the default filter type
                },
                sorting: {
                    grant_name: 'asc'     // set the default sort type
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

        //Pass route state params to $scope
        vm.granteeId = parseInt($stateParams.granteeId);

        //Go to Grantee Award page
        vm.toGranteeAwardPage = function (granteeId, grantId) {
            $state.go('navigator.granteeAward', {
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
