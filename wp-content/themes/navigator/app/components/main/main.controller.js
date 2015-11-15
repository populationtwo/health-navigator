(function () {
    'use strict';
    angular
        .module('navigatorAppViews')
        .controller('mainController', mainController);


    function mainController($state, NgTableParams, $filter, $sce, $scope, WPService, $rootScope, $timeout, $http) {

        /* jshint validthis: true */
        var vm = this;

        vm.$state = $state;

        WPService.getTopics();
        WPService.getStories();
        vm.wpData = WPService;

        // set ui select default value
        vm.filterVal = {};
        vm.filterVal.terms = [];
        vm.filterVal.topics = [];

        // Reset
        vm.reset = function () {
            vm.filterVal = {};
            vm.filterVal.terms = [];
            vm.filterVal.topics = [];
            vm.selectedGrantId = [];
            vm.selectedGrantAwardId = [];
            vm.selectedGrantsAwardsByTopic = vm.selectedGrantId;
            vm.selectedGrantsAwardsByState = vm.selectedGrantAwardId;
            vm.selectedGrantAwardIdByCity = [];
            vm.selectedGrantAwardIdByCounty = [];
            //vm.grantsAwardsFilter = '';
            vm.labelActive = [];
            vm.termsIdArr = [];
            vm.noResult = false;
            vm.topicIdArr = [];
            vm.tableParams.reload();
            vm.tempParentCityArr = [];
            for (var key in vm.mapObject.data) {
                vm.mapObject.data[key].fillKey = 'defaultFill';
            }
        };

        // Reset Query State Parameters
        vm.resetQuery = function (grId, grAwId, tpId, termId) {
            //console.log('click row');
            $state.go('navigator.main', {
                grId: '',
                grAwId: '',
                tpId: '',
                termId: ''
            });
        };

        WPService.getAllGrants().then(function () {

            /*jshint camelcase: false */

            // Get data from factory
            var dataGrants = WPService.grData.grants,
                dataGrantee = WPService.grData.organizations,
                dataGrantsAwards = WPService.grData.grants_awards,
                dataGrantTopics = WPService.grData.grant_topics,
                dataTerms = WPService.grData.grant_awards_terms,
                dataContacts = WPService.grData.contacts,
                dataResourceTopics = WPService.grData.resource_topics,
                dataResources = WPService.grData.resources;


            // Get Grant Name by Grant Id
            vm.getGrantName = function (grtId) {
                for (var i = 0, il = dataGrants.length; i < il; i++) {
                    if (dataGrants[i].id === grtId) {
                        return dataGrants[i].name;
                    }
                }
            };

            // Get Grantee Organization Name by Grantee ID
            vm.getOrganizationName = function (grteId) {
                for (var i = 0, il = dataGrantee.length; i < il; i++) {
                    if (dataGrantee[i].id === grteId) {
                        return dataGrantee[i].name;
                    }
                }
            };

            vm.selectedGrantId = [];
            vm.selectedGrantAwardId = [];
            vm.selectedGrantAwardIdByCity = [];
            vm.selectedGrantAwardIdByCounty = [];

            vm.noResult = false;
            vm.topicIdArr = [];
            // Topic filter

            // Add selected Grant ID to selectedGrantId array
            vm.addGrantId = function (topicId) {
                var found = $filter('filter')(dataGrantTopics, {term_taxonomy_id: topicId}, true);
                if (found.length) { // if match filter
                    for (var i = 0, il = found.length; i < il; i++) {
                        vm.selectedGrantId.push(found[i].grant_id);
                    }
                } else {
                    vm.noResult = true;
                }

                vm.tableParams.page(1);
                vm.tableParams.reload();

                //Stories filter
                vm.topicId = topicId;
                vm.topicIdArr.push(topicId);

                $scope.$apply();
            };

            // Remove selected Grant ID from selectedGrantId array
            vm.removeGrantId = function (topicId) {
                var found = $filter('filter')(dataGrantTopics, {term_taxonomy_id: topicId}, true);
                if (found.length) { // if match filter
                    for (var i = 0, il = found.length; i < il; i++) {
                        var index = vm.selectedGrantId.indexOf(found[i].grant_id);
                        if (index > -1) {
                            vm.selectedGrantId.splice(index, 1);
                        }
                    }
                }
                else {
                    vm.noResult = false;
                }

                //Stories filter
                var topicIndex = vm.topicIdArr.indexOf(topicId);
                if (topicIndex > -1) {
                    vm.topicIdArr.splice(topicIndex, 1);
                }
                vm.tableParams.page(1);
                vm.tableParams.reload();
            };


            // State filter

            vm.termsIdArr = [];

            // Add selected Grant ID to selectedId array
            vm.addGrantTermsId = function (termsId) {
                var found = $filter('filter')(dataTerms, {term_taxonomy_id: termsId}, true);
                if (found.length) { // if match filter
                    for (var i = 0; i < found.length; i++) {
                        vm.selectedGrantAwardId.push(found[i].grantaward_id);
                    }
                } else {
                    vm.noResult = true;
                }

                // Set ACTIVE color on US map
                for (var key in vm.mapObject.data) {
                    if (vm.mapObject.data[key].term_id === termsId) {
                        vm.mapObject.data[key].fillKey = 'ACTIVE';

                        // Set active class on map label
                        vm.labelActive[key] = true;

                    }
                }

                //Terms filter
                vm.termsId = termsId;
                vm.termsIdArr.push(termsId);

                //Update map label

                //vm.buildCityList(); // Build City list
                vm.tableParams.page(1);
                vm.tableParams.reload();
            };
            vm.removeGrantTermsId = function (termsId) {
                var found = $filter('filter')(dataTerms, {term_taxonomy_id: termsId}, true);
                if (found.length) { // if match filter
                    for (var i = 0, il = found.length; i < il; i++) {
                        var index = vm.selectedGrantAwardId.indexOf(found[i].grantaward_id);
                        if (index > -1) {
                            vm.selectedGrantAwardId.splice(index, 1);
                        }

                    }
                } else {
                    vm.noResult = false;
                }
                // Set defaultfill color on US map
                for (var key in vm.mapObject.data) {
                    if (vm.mapObject.data[key].term_id === termsId) {
                        vm.mapObject.data[key].fillKey = 'defaultFill';

                        // Set inactive class on map label
                        vm.labelActive[key] = false;
                    }
                }

                //States filter
                var termsIndex = vm.termsIdArr.indexOf(termsId);
                if (termsIndex > -1) {
                    vm.termsIdArr.splice(termsIndex, 1);
                }
                vm.tableParams.page(1);
                vm.tableParams.reload();
            };


            vm.selectedGrantsAwardsByTopic = $rootScope.grId || vm.selectedGrantId; // Pass state state parameter or selectedGrantId
            vm.selectedGrantsAwardsByState = $rootScope.grAwId || vm.selectedGrantAwardId; // Pass state state parameter or selectedGrantAwardId


            vm.grantsAwardsFilter = function (item) {
                //If state and topic selected
                if ((vm.selectedGrantsAwardsByTopic.length) && (vm.selectedGrantsAwardsByState.length)) {


                    if (vm.selectedGrantAwardIdByCity.length || vm.selectedGrantAwardIdByCounty.length) {
                        return ( (vm.selectedGrantsAwardsByTopic.indexOf(item.grant_id) !== -1) && ( (vm.selectedGrantAwardIdByCity.indexOf(item.id) !== -1) || (vm.selectedGrantAwardIdByCounty.indexOf(item.id) !== -1) ));
                    } else {
                        return ((vm.selectedGrantsAwardsByTopic.indexOf(item.grant_id) !== -1) && (vm.selectedGrantsAwardsByState.indexOf(item.id) !== -1));
                    }

                    // If topic or state  selected
                } else if ((vm.selectedGrantsAwardsByTopic.length) || (vm.selectedGrantsAwardsByState.length)) {

                    // if state / city /county selected
                    if (vm.selectedGrantsAwardsByState.length) {

                        //if city or county selected
                        if (vm.selectedGrantAwardIdByCity.length || vm.selectedGrantAwardIdByCounty.length) {

                            //console.log('click')

                            //return (vm.selectedGrantAwardIdByCity.indexOf(item.id) !== -1);
                            //return (vm.selectedGrantAwardIdByCounty.indexOf(item.id) !== -1);
                            if (vm.selectedGrantAwardIdByCity.length && vm.selectedGrantAwardIdByCounty.length) {
                                //console.log('county and city')
                                //if state only selected
                                return ((vm.selectedGrantAwardIdByCity.indexOf(item.id) !== -1) || (vm.selectedGrantAwardIdByCounty.indexOf(item.id) !== -1));
                            } else {
                                if (vm.selectedGrantAwardIdByCity.length) {
                                    return (vm.selectedGrantAwardIdByCity.indexOf(item.id) !== -1);
                                }
                                if (vm.selectedGrantAwardIdByCounty.length) {
                                    return (vm.selectedGrantAwardIdByCounty.indexOf(item.id) !== -1);
                                }
                            }
                        } else {
                            //if state only selected
                            return (vm.selectedGrantsAwardsByState.indexOf(item.id) !== -1);
                        }
                    } else {
                        // if topic
                        return (vm.selectedGrantsAwardsByTopic.indexOf(item.grant_id) !== -1);
                    }
                    // If no result
                } else if (vm.noResult) {
                    return false;
                } else {
                    return true; // default value if none selected

                }
            };

            // Table Parameter
            vm.tableParams = new NgTableParams({
                page: 1,            // show first page
                count: 15,          // count per page
                sorting: {
                    grant_name: 'asc'     // initial sorting
                },
                filter: vm.grantsAwardsFilter
            }, {
                total: dataGrantsAwards.length, // length of data
                counts: [15, 50, 100, 9999],
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

            // Custom filter. Filter cities / county on based on selected state
            vm.filterByState = function (data) {
                return (vm.termsIdArr.indexOf(data.stateID) !== -1);
            };


            //Resources Tab
            vm.findContacts = function (author_id) {
                for (var i = 0, il = dataContacts.length; i < il; i++) {
                    if (dataContacts[i].id === author_id) {
                        return dataContacts[i].first_name + ' ' + dataContacts[i].last_name;
                    }
                }
            };
            vm.findOrganizationById = function (org_id) {
                if (dataGrantee.length) {
                    for (var i = 0, il = dataGrantee.length; i < il; i++) {
                        if (dataGrantee[i].id === org_id) {
                            return dataGrantee[i].name;
                        }
                    }
                }
            };

            vm.resourcesFilter = function () {
                return function (item) {
                    var topicId = $rootScope.tpId || vm.topicIdArr;

                    if ((topicId !== null) && (topicId.length > 0 )) {
                        if (topicId.length) {
                            for (var q = 0, ql = topicId.length; q < ql; q++) {
                                for (var p = 0; p < dataResourceTopics.length; p++) {
                                    if (topicId[q] === dataResourceTopics[p].term_taxonomy_id) {
                                        if (item.id === dataResourceTopics[p].resource_id) {
                                            return true;
                                        }
                                    }
                                }
                            }
                        }

                    } else if (vm.noResult && (topicId.length > 0 )) {
                        return false;
                    } else {
                        return true;// Initial state. Display all the items
                    }

                };

            };

            // Generate URL only when data changed
            $scope.$watchGroup(angular.bind(vm, [function () {
                return vm.topicIdArr.length;
            }, function () {
                return vm.termsIdArr.length;
            }, function () {
                return vm.selectedGrantId.length;
            }, function () {
                return vm.selectedGrantAwardId.length;
            }, function () {
                return vm.selectedGrantAwardIdByCity.length;
            }, function () {
                return vm.selectedGrantAwardIdByCounty.length;
            }]), function (newVal, oldVal) {
                vm.urlPlaceholder = appLocalized.homeUrl + '/#/navigator/grantee?' + vm.shareUrl();
                vm.urlPlaceholderEncode = encodeURIComponent(vm.urlPlaceholder);
                $http.post('https://www.googleapis.com/urlshortener/v1/url?key=AIzaSyCxPheqSE9R6ULGRI-u-D5aMLRjuz36Kn8', {longUrl: vm.urlPlaceholder}).success(function (data) {
                    vm.shortUrl = data.id;
                }).error(function (data, status) {
                    console.log(status);
                });
            });

            //Create shareable URL
            vm.shareUrl = function () {
                var url = '';
                if (vm.topicIdArr.length || vm.termsIdArr.length || vm.selectedGrantId.length) {
                    for (var i = 0, il = vm.topicIdArr.length; i < il; i++) {
                        url += 'tpId=' + vm.topicIdArr[i] + '&';
                    }
                    //}
                    //if (vm.termsIdArr.length) {
                    for (var i = 0, il = vm.termsIdArr.length; i < il; i++) {
                        url += 'termId=' + vm.termsIdArr[i] + '&';
                    }
                    //}
                    //if (vm.selectedGrantId.length) {
                    for (var i = 0, il = vm.selectedGrantId.length; i < il; i++) {
                        url += 'grId=' + vm.selectedGrantId[i] + '&';
                    }
                }

                // If city / county selected, ignore state
                if (vm.selectedGrantAwardIdByCity.length || vm.selectedGrantAwardIdByCounty.length) {

                    for (var j = 0, jl = vm.selectedGrantAwardIdByCity.length; j < jl; j++) {
                        url += 'grAwId=' + vm.selectedGrantAwardIdByCity[j] + '&';
                    }
                    for (var k = 0, kl = vm.selectedGrantAwardIdByCounty.length; k < kl; k++) {
                        url += 'grAwId=' + vm.selectedGrantAwardIdByCounty[k] + '&';
                    }

                    // If state selected
                } else {
                    console.log('state')

                    for (var i = 0, il = vm.selectedGrantAwardId.length; i < il; i++) {
                        url += 'grAwId=' + vm.selectedGrantAwardId[i] + '&';
                    }
                }

                return url;
            }

            // Display message when user copied the URL
            vm.successCopy = function () {
                if (vm.topicIdArr.length || vm.termsIdArr.length || vm.selectedGrantId.length || vm.selectedGrantAwardId.length) {
                    $scope.$apply(function () {
                        vm.successCopyText = true;
                        $timeout(function () {
                            vm.successCopyText = false;
                        }, 3000);
                    });

                }
                //console.log('success');
            };

            vm.fail = function (err) {
                //console.error('Error!', err);
            };

        });

        // Go to Grantee Detail Page
        vm.toGranteeDetailPage = function (granteeId) {
            $state.go('navigator.grantee', {
                granteeId: granteeId
            });
        };

        // Go to Grant Detail Page
        vm.toGrantDetailPage = function (grantId) {
            $state.go('navigator.grant', {
                grantId: grantId
            });
        };

        // Tab partials templates
        vm.templates =
        {
            'grants': {
                name: 'grants.html',
                url: $sce.trustAsResourceUrl('wp-content/themes/navigator/app/components/list/tabs/grantTableView.html')
            },
            'stories': {
                name: 'stories.html',
                url: $sce.trustAsResourceUrl('wp-content/themes/navigator/app/components/list/tabs/storiesView.html')
            },
            'resources': {
                name: 'resources.html',
                url: $sce.trustAsResourceUrl('wp-content/themes/navigator/app/components/list/tabs/resourcesView.html')
            },
            'pagination': {
                name: 'table-pagination.html',
                url: $sce.trustAsResourceUrl('wp-content/themes/navigator/app/shared/table-pagination.html')
            }
        };


        vm.mapObject = {
            scope: 'usa',
            options: {
                width: 1110
            },
            geographyConfig: {
                highlightBorderColor: '#999',
                highlightBorderWidth: 2,
                borderColor: '#999',
                highlightFillColor: '#f29c24'
            },
            fills: {
                'ACTIVE': '#DE8D18',
                'defaultFill': '#E0E0E0'
            },
            data: {
                'AL': {
                    'fillKey': 'defaultFill',
                    'selected': 'ACTIVE',
                    'term_id': 93
                },
                'AK': {
                    'fillKey': 'defaultFill',
                    'selected': 'ACTIVE',
                    'term_id': 266
                },
                'AS': {
                    'fillKey': 'defaultFill',
                    'selected': 'ACTIVE',
                    'term_id': 702,
                    'highlightOnHover': false
                },
                'AZ': {
                    'fillKey': 'defaultFill',
                    'selected': 'ACTIVE',
                    'term_id': 45
                },
                'AR': {
                    'fillKey': 'defaultFill',
                    'selected': 'ACTIVE',
                    'term_id': 207
                },
                'CA': {
                    'fillKey': 'defaultFill',
                    'selected': 'ACTIVE',
                    'term_id': 48
                },
                'CO': {
                    'fillKey': 'defaultFill',
                    'selected': 'ACTIVE',
                    'term_id': 155
                },
                'CT': {
                    'fillKey': 'defaultFill',
                    'selected': 'ACTIVE',
                    'term_id': 37
                },
                'DE': {
                    'fillKey': 'defaultFill',
                    'selected': 'ACTIVE',
                    'term_id': 98
                },
                'DC': {
                    'fillKey': 'defaultFill',
                    'selected': 'ACTIVE',
                    'term_id': 703
                },
                'FM': {
                    'fillKey': 'defaultFill',
                    'selected': 'ACTIVE',
                    'term_id': 704
                },
                'FL': {
                    'fillKey': 'defaultFill',
                    'selected': 'ACTIVE',
                    'term_id': 44
                },
                'GA': {
                    'fillKey': 'defaultFill',
                    'selected': 'ACTIVE',
                    'term_id': 43
                },
                'GU': {
                    'fillKey': 'defaultFill',
                    'selected': 'ACTIVE',
                    'term_id': 705
                },
                'HI': {
                    'fillKey': 'defaultFill',
                    'selected': 'ACTIVE',
                    'term_id': 31
                },
                'ID': {
                    'fillKey': 'defaultFill',
                    'selected': 'ACTIVE',
                    'term_id': 211
                },
                'IL': {
                    'fillKey': 'defaultFill',
                    'selected': 'ACTIVE',
                    'term_id': 61
                },
                'IN': {
                    'fillKey': 'defaultFill',
                    'selected': 'ACTIVE',
                    'term_id': 105
                },
                'IA': {
                    'fillKey': 'defaultFill',
                    'selected': 'ACTIVE',
                    'term_id': 154
                },
                'KS': {
                    'fillKey': 'defaultFill',
                    'selected': 'ACTIVE',
                    'term_id': 267
                },
                'KY': {
                    'fillKey': 'defaultFill',
                    'selected': 'ACTIVE',
                    'term_id': 106
                },
                'LA': {
                    'fillKey': 'defaultFill',
                    'selected': 'ACTIVE',
                    'term_id': 156
                },
                'ME': {
                    'fillKey': 'defaultFill',
                    'selected': 'ACTIVE',
                    'term_id': 214
                },
                'MH': {
                    'fillKey': 'defaultFill',
                    'selected': 'ACTIVE',
                    'term_id': 707
                },
                'MD': {
                    'fillKey': 'defaultFill',
                    'selected': 'ACTIVE',
                    'term_id': 39
                },
                'MA': {
                    'fillKey': 'defaultFill',
                    'selected': 'ACTIVE',
                    'term_id': 42
                },
                'MI': {
                    'fillKey': 'defaultFill',
                    'selected': 'ACTIVE',
                    'term_id': 115
                },
                'MN': {
                    'fillKey': 'defaultFill',
                    'selected': 'ACTIVE',
                    'term_id': 187
                },
                'MS': {
                    'fillKey': 'defaultFill',
                    'selected': 'ACTIVE',
                    'term_id': 117
                },
                'MO': {
                    'fillKey': 'defaultFill',
                    'selected': 'ACTIVE',
                    'term_id': 46
                },
                'MT': {
                    'fillKey': 'defaultFill',
                    'selected': 'ACTIVE',
                    'term_id': 119
                },
                'NE': {
                    'fillKey': 'defaultFill',
                    'selected': 'ACTIVE',
                    'term_id': 121
                },
                'NV': {
                    'fillKey': 'defaultFill',
                    'selected': 'ACTIVE',
                    'term_id': 268
                },
                'NH': {
                    'fillKey': 'defaultFill',
                    'selected': 'ACTIVE',
                    'term_id': 213
                },
                'NJ': {
                    'fillKey': 'defaultFill',
                    'selected': 'ACTIVE',
                    'term_id': 30
                },
                'NM': {
                    'fillKey': 'defaultFill',
                    'selected': 'ACTIVE',
                    'term_id': 212
                },
                'NY': {
                    'fillKey': 'defaultFill',
                    'selected': 'ACTIVE',
                    'term_id': 38
                },
                'NC': {
                    'fillKey': 'defaultFill',
                    'selected': 'ACTIVE',
                    'term_id': 47
                },
                'ND': {
                    'fillKey': 'defaultFill',
                    'selected': 'ACTIVE',
                    'term_id': 269
                },
                'MP': {
                    'fillKey': 'defaultFill',
                    'selected': 'ACTIVE',
                    'term_id': 708
                },
                'OH': {
                    'fillKey': 'defaultFill',
                    'selected': 'ACTIVE',
                    'term_id': 125
                },
                'OK': {
                    'fillKey': 'defaultFill',
                    'selected': 'ACTIVE',
                    'term_id': 127
                },
                'OR': {
                    'fillKey': 'defaultFill',
                    'selected': 'ACTIVE',
                    'term_id': 113
                },
                'PW': {
                    'fillKey': 'defaultFill',
                    'selected': 'ACTIVE',
                    'term_id': 709
                },
                'PA': {
                    'fillKey': 'defaultFill',
                    'selected': 'ACTIVE',
                    'term_id': 129
                },
                'PR': {
                    'fillKey': 'defaultFill',
                    'selected': 'ACTIVE',
                    'term_id': 710
                },
                'RI': {
                    'fillKey': 'defaultFill',
                    'selected': 'ACTIVE',
                    'term_id': 270
                },
                'SC': {
                    'fillKey': 'defaultFill',
                    'selected': 'ACTIVE',
                    'term_id': 131
                },
                'SD': {
                    'fillKey': 'defaultFill',
                    'selected': 'ACTIVE',
                    'term_id': 271
                },
                'TN': {
                    'fillKey': 'defaultFill',
                    'selected': 'ACTIVE',
                    'term_id': 134
                },
                'TX': {
                    'fillKey': 'defaultFill',
                    'selected': 'ACTIVE',
                    'term_id': 136
                },
                'UT': {
                    'fillKey': 'defaultFill',
                    'selected': 'ACTIVE',
                    'term_id': 140
                },
                'VT': {
                    'fillKey': 'defaultFill',
                    'selected': 'ACTIVE',
                    'term_id': 112
                },
                'VI': {
                    'fillKey': 'defaultFill',
                    'selected': 'ACTIVE',
                    'term_id': 712
                },
                'VA': {
                    'fillKey': 'defaultFill',
                    'selected': 'ACTIVE',
                    'term_id': 40
                },
                'WA': {
                    'fillKey': 'defaultFill',
                    'selected': 'ACTIVE',
                    'term_id': 49
                },
                'WV': {
                    'fillKey': 'defaultFill',
                    'selected': 'ACTIVE',
                    'term_id': 143
                },
                'WI': {
                    'fillKey': 'defaultFill',
                    'selected': 'ACTIVE',
                    'term_id': 144
                },
                'WY': {
                    'fillKey': 'defaultFill',
                    'selected': 'ACTIVE',
                    'term_id': 272
                }
            }
        };


        WPService.getTerms().then(function () { //http://healthyamericans.org/health-issues/wp-json/taxonomies/states/terms
                /*jshint camelcase: false */


                // Get terms data data from factory
                var termsdata = WPService.statesTerms;

                // Build a new array
                vm.stateArr = [];
                vm.cityArr = [];
                vm.countyArr = [];
                for (var i = 0; i < termsdata.length; i++) {
                    if (termsdata[i].parent === null) { // Build State Array
                        vm.stateArr.push({
                            ID: termsdata[i].ID,
                            name: termsdata[i].name,
                            slug: termsdata[i].slug
                        });
                    }

                    else { // Not state {{}}
                        if ((termsdata[i].description === 'county')) { // Build County Array
                            vm.countyArr.push({
                                ID: termsdata[i].ID,
                                name: termsdata[i].name,
                                slug: termsdata[i].slug,
                                stateID: termsdata[i].parent.ID,
                                stateName: termsdata[i].parent.name
                            });
                        } else {
                            vm.cityArr.push({
                                ID: termsdata[i].ID,
                                name: termsdata[i].name,
                                slug: termsdata[i].slug,
                                stateID: termsdata[i].parent.ID,
                                stateName: termsdata[i].parent.name
                            });
                        }
                    }

                }

                vm.stateName = '';
                vm.stateCode = '';


                // Map event handler
                vm.updateActiveGeography = function (geography) {
                    if (!vm.$state.includes('navigator.main')) { // disable on click if it's not Grants Awards view.
                        return false;
                    }
                    vm.stateCode = geography.id;
                    vm.stateName = geography.properties.name;

                    // If map not selected
                    if (vm.mapObject.data[geography.id].fillKey !== 'ACTIVE') {
                        vm.mapObject.data[geography.id].fillKey = 'ACTIVE';

                        // Set the UI Select filter
                        for (var i = 0, il = vm.stateArr.length; i < il; i++) {
                            if (vm.stateArr[i].ID === vm.mapObject.data[geography.id].term_id) {
                                vm.filterVal.terms.push(vm.stateArr[i]);
                            }
                        }

                        //Update map label
                        vm.labelActive[vm.stateCode] = true;

                        // Update the grants table
                        vm.addGrantTermsId(vm.mapObject.data[geography.id].term_id);
                    } else {
                        vm.mapObject.data[geography.id].fillKey = 'defaultFill';

                        for (var j = 0, jl = vm.stateArr.length; j < jl; j++) {

                            if (vm.stateArr[j].ID === vm.mapObject.data[geography.id].term_id) {

                                var index = vm.filterVal.terms.indexOf(vm.stateArr[j]);
                                if (index > -1) {
                                    vm.filterVal.terms.splice(index, 1);
                                }

                            }
                        }

                        //Update map label
                        vm.labelActive[vm.stateCode] = false;

                        vm.removeGrantTermsId(vm.mapObject.data[geography.id].term_id);

                    }
                    $scope.$apply();
                };


                vm.labelActive = [];

                //Event handler for map labels
                vm.updateMapFromLabel = function (stateCode) {

                    if (vm.mapObject.data[stateCode].fillKey !== 'ACTIVE') {

                        // Set the UI Select filter
                        for (var i = 0, il = vm.stateArr.length; i < il; i++) {
                            if (vm.stateArr[i].ID === vm.mapObject.data[stateCode].term_id) {
                                vm.filterVal.terms.push(vm.stateArr[i]);
                            }
                        }

                        // Update the grants table
                        vm.addGrantTermsId(vm.mapObject.data[stateCode].term_id);

                        // Set active class
                        vm.labelActive[stateCode] = true;

                    } else {
                        // Remove from the UI Select filter
                        for (var j = 0, jl = vm.stateArr.length; j < jl; j++) {
                            if (vm.stateArr[j].ID === vm.mapObject.data[stateCode].term_id) {
                                var index = vm.filterVal.terms.indexOf(vm.stateArr[j]);
                                if (index > -1) {
                                    vm.filterVal.terms.splice(index, 1);
                                }
                            }
                        }

                        // Update the grants table
                        vm.removeGrantTermsId(vm.mapObject.data[stateCode].term_id);

                        // Remove active class
                        vm.labelActive[stateCode] = false;

                    }

                };

                vm.cityIdArr = [];
                vm.countyIdArr = [];

                WPService.getAllGrants().then(function () {

                    // Get terms data data from factory
                    //var termsdata = WPService.statesTerms;
                    var dataTerms = WPService.grData.grant_awards_terms;
                    vm.tempParentCityArr = [];

                    vm.addCity = function (cityID) {

                        var found = $filter('filter')(dataTerms, {term_taxonomy_id: cityID}, true);
                        if (found.length) { // if match filter
                            for (var i = 0; i < found.length; i++) {
                                vm.selectedGrantAwardIdByCity.push(found[i].grantaward_id);
                            }
                        } else {
                            //vm.noResult = true;
                            vm.selectedGrantAwardIdByCity.push(0); //return 0 if no match
                        }

                        //Terms city filter
                        vm.cityId = cityID;
                        vm.cityIdArr.push(cityID);

                        vm.tableParams.page(1);
                        vm.tableParams.reload();

                    };
                    vm.addCounty = function (countyID) {
                        var found = $filter('filter')(dataTerms, {term_taxonomy_id: countyID}, true);
                        if (found.length) { // if match filter
                            for (var i = 0; i < found.length; i++) {
                                vm.selectedGrantAwardIdByCounty.push(found[i].grantaward_id);
                            }
                        } else {
                            //vm.noResult = true;
                            vm.selectedGrantAwardIdByCounty.push(0); //return 0 if no match
                        }

                        //Terms county filter
                        vm.countyId = countyID;
                        vm.countyIdArr.push(countyID);

                        vm.tableParams.page(1);
                        vm.tableParams.reload();
                    };

                    vm.removeCity = function (cityID) {

                        // Remove grant award on selectedGrantAwardIdByCity array
                        var found = $filter('filter')(dataTerms, {term_taxonomy_id: cityID}, true);
                        if (found.length) { // if match filter
                            for (var i = 0, il = found.length; i < il; i++) {
                                var indexCity = vm.selectedGrantAwardIdByCity.indexOf(found[i].grantaward_id);
                                if (indexCity > -1) {
                                    vm.selectedGrantAwardIdByCity.splice(indexCity, 1);
                                }
                            }
                        } else {
                            vm.selectedGrantAwardIdByCity.splice(vm.selectedGrantAwardIdByCity.indexOf(0), 1);
                        }

                        var index = vm.cityIdArr.indexOf(cityID);
                        if (index > -1) {
                            vm.cityIdArr.splice(index, 1);
                        }

                        vm.tableParams.page(1);
                        vm.tableParams.reload();

                    };
                    vm.removeCounty = function (countyID) {

                        // Remove grant award on selectedGrantAwardIdByCity array
                        var found = $filter('filter')(dataTerms, {term_taxonomy_id: countyID}, true);
                        if (found.length) { // if match filter
                            for (var i = 0, il = found.length; i < il; i++) {
                                var indexCounty = vm.selectedGrantAwardIdByCounty.indexOf(found[i].grantaward_id);
                                if (indexCounty > -1) {
                                    vm.selectedGrantAwardIdByCounty.splice(indexCounty, 1);
                                }
                            }
                        } else {
                            vm.selectedGrantAwardIdByCounty.splice(vm.selectedGrantAwardIdByCounty.indexOf(0), 1);
                        }

                        var index = vm.countyIdArr.indexOf(countyID);
                        if (index > -1) {
                            vm.countyIdArr.splice(index, 1);
                        }

                        vm.tableParams.page(1);
                        vm.tableParams.reload();

                    };
                });
                vm.topicsMatch = function () {
                    //TODO: Refactor this
                    return function (item) {
                        var topicId = $rootScope.tpId || vm.topicIdArr,
                            termsId = $rootScope.termId || vm.termsIdArr;

                        // If topic and state selected
                        if ((topicId != null && topicId.length > 0) && (termsId != null && termsId.length > 0)) {

                            if (vm.cityIdArr.length || vm.countyIdArr.length) { // If city or county selected

                                for (var j = 0, jl = item.terms.story_category.length; j < jl; j++) {
                                    for (var i = 0, il = topicId.length; i < il; i++) {
                                        for (var k = 0, kl = item.terms.states.length; k < kl; k++) {

                                            for (var l = 0, ll = vm.cityIdArr.length; l < ll; l++) {
                                                if ((item.terms.states[k].ID === vm.cityIdArr[l]) &&
                                                    (item.terms.story_category[j].ID === topicId[i])) {
                                                    return true;
                                                }
                                            }
                                            for (var m = 0, ml = vm.countyIdArr.length; m < ml; m++) {
                                                if ((item.terms.states[k].ID === vm.countyIdArr[l]) &&
                                                    (item.terms.story_category[j].ID === topicId[i])) {
                                                    return true;
                                                }
                                            }
                                        }
                                    }
                                }

                            } else { // If state only selected

                                for (var j = 0, jl = item.terms.story_category.length; j < jl; j++) {
                                    for (var i = 0, il = topicId.length; i < il; i++) {
                                        for (var k = 0, kl = item.terms.states.length; k < kl; k++) {
                                            for (var l = 0, ll = termsId.length; l < ll; l++) {
                                                if ((item.terms.states[k].ID === termsId[l]) &&
                                                    (item.terms.story_category[j].ID === topicId[i])) {
                                                    return true;
                                                }
                                            }
                                        }
                                    }
                                }

                            }

                            // If topic or state selected
                        } else if ((topicId !== undefined && topicId.length > 0) || (termsId !== undefined && termsId.length > 0)) {
                            if (topicId.length) { // If topic selected
                                for (var p = 0, pl = item.terms.story_category.length; p < pl; p++) {
                                    for (var q = 0; q < topicId.length; q++) {
                                        if (item.terms.story_category[p].ID === topicId[q]) {
                                            return true;
                                        }
                                    }
                                }
                            } else { // If state / city / count selected
                                for (var m = 0; m < item.terms.states.length; m++) {
                                    for (var n = 0; n < termsId.length; n++) {
                                        if (vm.cityIdArr.length || vm.countyIdArr.length) { // If city or county selected

                                            // If city selected, check for multiple cities
                                            for (var q = 0, ql = vm.cityIdArr.length; q < ql; q++) {
                                                if (item.terms.states[m].ID === vm.cityIdArr[q]) {
                                                    return true;
                                                }
                                            }
                                            // If county selected, check for multiple counties
                                            for (var r = 0, rl = vm.countyIdArr.length; r < rl; r++) {
                                                if (item.terms.states[m].ID === vm.countyIdArr[r]) {
                                                    return true;
                                                }
                                            }

                                        } else if (termsId[n]) { // If state only selected
                                            if (item.terms.states[m].ID === termsId[n]) {
                                                return true;
                                            }
                                        }
                                    }
                                }
                            }

                        } else if (vm.noResult) {
                            return false;
                        } else {
                            return true; // default value if none selected
                        }

                    };

                };


            }
        );

        vm.resetCity = function () {
            vm.filterVal.city = [];
        };
        vm.resetCounty = function () {
            vm.filterVal.county = [];
        };


        vm.storyCurrentPage = 1;
        vm.resourcesCurrentPage = 1;
        vm.pageSize = 6;

        vm.pageChangeHandler = function (num) {
            //console.log('posts page changed to ' + num);
        };

        //Tooltip text
        vm.tooltipContent = $sce.trustAsHtml('To export all items in your current grant data view, make sure that the <em>items per page</em> is set to <strong>all</strong>');


    }
}());


