'use strict';

define('common/directives/menuLink', [], function () {

    return ['menuLink', function () {
        return {
            scope: {
                section: '='
            },
            templateUrl: 'scripts/common/views/dt/menu-link.tmpl.html',
            link: function($scope, $element) {
                var controller = $element.parent().controller();

                $scope.isSelected = function() {
                    return controller.isSelected($scope.section);
                };

                $scope.focusSection = function() {
                    // set flag to be used later when
                    // $locationChangeSuccess calls openPage()
                    controller.autoFocusContent = true;
                };
            }
        };
    }]
});
