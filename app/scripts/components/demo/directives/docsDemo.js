'use strict';

define('components/demo/directives/docsDemo', [], function () {

    return ['docsDemo', ['$mdUtil',
        function($mdUtil) {
            return {
                restrict: 'E',
                scope: true,
                templateUrl: 'scripts/components/demo/views/docs-demo.tmpl.html',
                transclude: true,
                controller: ['$scope', '$element', '$attrs', '$interpolate', 'codepen', DocsDemoCtrl],
                controllerAs: 'demoCtrl',
                bindToController: true
            };

            function DocsDemoCtrl($scope, $element, $attrs, $interpolate, codepen) {
                var self = this;

                self.interpolateCode = angular.isDefined($attrs.interpolateCode);
                self.demoId = $interpolate($attrs.demoId || '')($scope.$parent);
                self.demoTitle = $interpolate($attrs.demoTitle || '')($scope.$parent);
                self.demoModule = $interpolate($attrs.demoModule || '')($scope.$parent);
                self.files = {
                    css: [], js: [], html: []
                };

                self.addFile = function(name, contentsPromise) {
                    var file = {
                        name: convertName(name),
                        contentsPromise: contentsPromise,
                        fileType: name.split('.').pop()
                    };
                    contentsPromise.then(function(contents) {
                        file.contents = contents;
                    });

                    if (name === 'index.html') {
                        self.files.index = file;
                    } else if (name === 'readme.html') {
                        self.demoDescription = file;
                    } else {
                        self.files[file.fileType] = self.files[file.fileType] || [];
                        self.files[file.fileType].push(file);
                    }

                    self.orderedFiles = []
                        .concat(self.files.index || [])
                        .concat(self.files.js || [])
                        .concat(self.files.css || [])
                        .concat(self.files.html || []);

                };

                self.editOnCodepen = function() {
                    codepen.editOnCodepen({
                        title: self.demoTitle,
                        files: self.files,
                        id: self.demoId,
                        module: self.demoModule
                    });
                };

                function convertName(name) {
                    switch(name) {
                        case "index.html" : return "HTML";
                        case "script.js" : return "JS";
                        case "style.css" : return "CSS";
                        default : return name;
                    }
                }

            }
        }
    ]]
});