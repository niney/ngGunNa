'use strict';

define('components/demo/directives/demoFile', [], function () {

    return ['demoFile', ['$q', '$interpolate', function($q, $interpolate) {
        return {
            restrict: 'E',
            require: '^docsDemo',
            compile: compile
        };

        function compile(element, attr) {
            var contentsAttr = attr.contents;
            var html = element.html();
            var name = attr.name;
            element.contents().remove();

            return function postLink(scope, element, attr, docsDemoCtrl) {
                docsDemoCtrl.addFile(
                    $interpolate(name)(scope),
                    $q.when(scope.$eval(contentsAttr) || html)
                );
                element.remove();
            };
        }
    }]]
});