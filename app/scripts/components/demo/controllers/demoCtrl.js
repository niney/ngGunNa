'use strict';

define('components/demo/controllers/demoCtrl', [], function () {

	//컨트롤러 선언
	return [
		'$rootScope',
		'$scope',
		'component',
		'demos',
		'$http',
		'$templateCache',
		'$q',
		function($rootScope, $scope, component, demos, $http, $templateCache, $q) {
			$rootScope.currentComponent = component;
			$rootScope.currentDoc = null;

			$scope.demos = [];

			angular.forEach(demos, function(demo) {
				// Get displayed contents (un-minified)
				var files = [demo.index]
					.concat(demo.js || [])
					.concat(demo.css || [])
					.concat(demo.html || []);
				files.forEach(function(file) {
					file.httpPromise = $http.get(file.outputPath, {cache: $templateCache})
						.then(function(response) {
							file.contents = response.data
								.replace('<head/>', '');
							return file.contents;
						});
				});
				demo.$files = files;
				$scope.demos.push(demo);
			});

			$scope.demos = $scope.demos.sort(function(a,b) {
				return a.name > b.name ? 1 : -1;
			});

		}];
});
