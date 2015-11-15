(function () {
    'use strict';

    angular
        .module('navigatorAppViews')
        .controller('storiesViewCtrl', storiesViewCtrl)
        .controller('storiesPaginationCtrl', storiesPaginationCtrl);

    function storiesPaginationCtrl($scope) {
        $scope.pageChangeHandler = function (num) {
            //console.log('going to page ' + num);
        };
    }

    function storiesViewCtrl(WPService){
        /* jshint validthis: true */
        var vm = this;
        WPService.getTopics();
        vm.wpData = WPService;


        vm.getLocation = function (item) {
            var parentSlug = [],
                output = '',
                st = item.terms.states.length;

            // Build a parent state array
            for (var i = 0; i < st; i++) {
                if (item.terms.states[i].parent) {
                    parentSlug.push(item.terms.states[i].parent.slug);
                }
            }

            for (var i = 0; i < st; i++) {

                // Check if state name is in parent state array
                if (parentSlug.indexOf(item.terms.states[i].slug) > -1) {
                } else {
                    output += item.terms.states[i].name;
                    if (!item.terms.states[i].parent) {
                        output +='; ';
                    }
                }
                // Output state parent name
                if (item.terms.states[i].parent) {
                    output += ', ';
                    output += item.terms.states[i].parent.name;
                    output += '; ';

                }
            }
            return output;
        };
    }

}());