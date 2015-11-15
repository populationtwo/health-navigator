(function () {
    'use strict';

    angular.module('navigatorLibrary', [])
        .factory('WPService', WPService); // WP Data

    function WPService($http, $rootScope, $q) {
        var WPService = {
            acf: [],
            wpPages: [],
            topics: [],
            statesTerms: [],
            stories: [],
            grData: []
        };

        var HI_PATH; // Health Issues path
        if (appLocalized.environment === 'production') {
            HI_PATH = 'http://healthyamericans.org/health-issues/';
        } else if (appLocalized.environment === 'staging') {
            HI_PATH = 'http://demo.healthyamericans.org/health-issues/';
        } else {
            HI_PATH = 'http://localhost/tfah/health-issues/';
        }

        WPService.getAdvancedCustomFields = function () { // Get ACF data

            var d = $q.defer();
            $http({
                method: 'GET',
                url: appLocalized.homeUrl + '/wp-json/options',
                cache: true
            }).success(function (res) {
                d.resolve(
                    WPService.acf = res,
                    $rootScope.acfDataLoaded = true
                );
            }).error(function (data, status) {
                console.log(status + ' error attempting to access wp-json/options');
                d.reject();
            });
            return d.promise;

        };

        WPService.getWpPages = function (id) { // Get WordPress pages data

            var d = $q.defer();
            $http({
                method: 'GET',
                url: appLocalized.homeUrl + '/wp-json/posts/'+ id,
                cache: true
            }).success(function (res) {
                d.resolve(
                    WPService.wpPages = res
                );
            }).error(function (data, status) {
                console.log(status + ' error attempting to access wp-json/posts?filter[order]=ASC&type=page');
                d.reject();
            });
            return d.promise;

        };

        WPService.getAllGrants = function () { // Get all grants data

            var d = $q.defer();
            $http({
                method: 'GET',
                url: appLocalized.templateDirectory + '/assets/js/json/staging-ha-plugin-2.json',
                //url: HI_PATH + '/wp-admin/admin-ajax.php?action=ha_api_read',
                cache: false
            }).success(function (res) {
                d.resolve(WPService.grData = res);
                $rootScope.allGrantsDataLoaded = true;
            }).error(function (data, status) {
                console.log(status + ' error attempting to access all grants data');
                d.reject();
            });
            return d.promise;

        };


        WPService.getTopics = function () { //Get Topics / Prevention Stories Story Category

            var d = $q.defer();
            $http({
                method: 'GET',
                url: HI_PATH + '/wp-json/taxonomies/story_category/terms',
                cache: true
            }).success(function (res) {
                d.resolve(
                    WPService.topics = res,
                    $rootScope.storyTermsDataLoaded = true
                );

            }).error(function (status) {
                console.log(status + ' error attempting to access wp-json/taxonomies/story_category/terms');
                d.reject();
            });
            return d.promise;

        };

        WPService.getTerms = function () { //Get States Terms

            var d = $q.defer();
            $http({
                method: 'GET',
                url: HI_PATH + '/wp-json/taxonomies/states/terms',
                cache: true
            }).success(function (res) {
                d.resolve(
                    WPService.statesTerms = res,
                    $rootScope.statesTermsDataLoaded = true
                );
            }).error(function (status) {
                console.log(status + ' error attempting to access wp-json/taxonomies/states/terms');
                d.reject();
            });
            return d.promise;

        };

        WPService.getStories = function () { //Get Stories data

            var d = $q.defer();
            $http({
                method: 'GET',
                url: HI_PATH + '/wp-json/posts?type=prevention_story' +
                '&filter[posts_per_page]=-1',
                cache: true
            }).success(function (res) {
                d.resolve(
                    WPService.stories = res,
                    $rootScope.storyDataLoaded = true
                );
            }).error(function (status) {
                console.log(status + ' error attempting to access /wp-json/posts?type=prevention_story');
                d.reject();
            });
            return d.promise;

        };

        return WPService;

    }

}());