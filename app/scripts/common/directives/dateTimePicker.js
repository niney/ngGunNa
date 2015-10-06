'use strict';

define('common/directives/dateTimePicker', [], function () {

    return ['dateTimePicker', ['$rootScope', function ($rootScope) {

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
                elem.datetimepicker();

                //Local event change
                elem.on('blur', function () {

                    console.info('this', this);
                    console.info('scope', scope);
                    console.info('attrs', attrs);


                    /*// returns moments.js format object
                     scope.dateTime = new Date(elem.data("DateTimePicker").getDate().format());
                     // Global change propagation
                     $rootScope.$broadcast("emit:dateTimePicker", {
                     location: scope.location,
                     action: 'changed',
                     dateTime: scope.dateTime,
                     example: scope.useCurrent
                     });
                     scope.$apply();*/
                })
            }
        };
    }]]
});