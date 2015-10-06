'use strict';

define('common/directives/datePicker', [], function () {

    return ['datePicker', ['$rootScope', function ($rootScope) {

        return {
            require: '?ngModel',
            restrict: 'AE',
            scope: {
                pick12HourFormat: '@',
                language: '@',
                useCurrent: '@',
                location: '@'
            },
            link: function (scope, elem, attrs) {
                elem.datepicker({
                    language: "kr",
                    format: "yyyy/mm/dd"
                });

            }
        };
    }]]
});