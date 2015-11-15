(function () {
    'use strict';

    angular
        .module('navigatorAppViews')
        .controller('granteeAwardCtrl', granteeAwardCtrl);

    function granteeAwardCtrl($stateParams, $filter, WPService, $state) {
        /* jshint validthis: true */

        var vm = this;
        vm.granteeId = parseInt($stateParams.granteeId);
        vm.grantId = parseInt($stateParams.grantId);

        WPService.getAllGrants().then(function () {

            /*jshint camelcase: false */

            // Get data from factory
            vm.wpData = WPService;

            var dataGrants = WPService.grData.grants,
                dataGrantee = WPService.grData.organizations,
                dataGrantsAwards = WPService.grData.grants_awards,
                dataContacts = WPService.grData.contacts,
                dataGrantTopics = WPService.grData.grant_topics;

            // Get Grant Name by Grant ID
            vm.getGrantName = function (grtId) {
                for (var i = 0, dl = dataGrants.length; i < dl; i++) {
                    if (dataGrants[i].id === grtId) {
                        return dataGrants[i].name;
                    }
                }
            };

            // Get Grantor ID by Grant ID
            vm.getGrantorId = function (grtId) {
                for (var i = 0, dl = dataGrants.length; i < dl; i++) {
                    if (dataGrants[i].id === grtId) {
                        return dataGrants[i].grantor_id;
                    }
                }
            };


            // Get Grantee Organization Name by ID
            vm.getOrganizationName = function (grteId) {
                for (var i = 0, dl = dataGrantee.length; i < dl; i++) {
                    if (dataGrantee[i].id === grteId) {
                        return dataGrantee[i].name;
                    }
                }
            };

            // Get Object in grants_awards array that has certain grant_id and organization_id.
            vm.grantAwardItems = $filter('filter')(dataGrantsAwards, {
                organization_id: vm.granteeId,
                grant_id: vm.grantId
            }, true);
            // Get the index from array
            vm.grantAwardIndex = dataGrantsAwards.indexOf(vm.grantAwardItems[0]);

            // Get Object from 'organizations' array
            vm.getOrganizationObj = function (grteId) {
                for (var i = 0, dl = dataGrantee.length; i < dl; i++) {
                    if (dataGrantee[i].id === grteId) {
                        return dataGrantee[i];
                    }
                }
            };

            // Get Object from 'contacts' array
            vm.getContacts = function (grteId) {
                var contacts = [];
                for (var i = 0, dl = dataContacts.length; i < dl; i++) {
                    if (dataContacts[i].organization_id === grteId) {
                        contacts.push(dataContacts[i]);
                    }
                }
                return contacts;
            };

            // Get Object from 'grants' array
            vm.getGrants = function (grtId) {
                for (var i = 0, dl = dataGrants.length; i < dl; i++) {
                    if (dataGrants[i].id === grtId) {
                        return dataGrants[i];
                    }
                }
            };


            WPService.getTopics().then(function () {

                vm.wpData = WPService;
                var dataTopics = vm.wpData.topics;

                // Get topic name from grant ID
                vm.getTopicName = function (grtId) {

                    var outputArr = [];
                    for (var i = 0, dl = dataGrantTopics.length; i < dl; i++) {
                        if (dataGrantTopics[i].grant_id === grtId) {
                            for (var k = 0, kl = dataTopics.length; k < kl; k++) {
                                if (dataGrantTopics[i].term_taxonomy_id === dataTopics[k].ID) {
                                    outputArr.push(dataTopics[k].name);
                                }
                            }
                        }
                    }
                    outputArr.sort();
                    return outputArr.slice(0, outputArr.length - 1).join(', ').concat(
                        ' and ' + outputArr[outputArr.length - 1]);
                };
            });


        });

        // Open the first accordion.
        vm.openAccordion = true;

        vm.back = function () {
            if ($state.current.name === 'navigator.grantAward') {
                return 'navigator.grant({grantId: granteeAward.grantId})';
            } else {
                return 'navigator.grantee({granteeId: granteeAward.granteeId})';
            }

        };

    }

}());
