'use strict';

define(
	[
		'angular',
		'route-config',
		'components/demo/routes',
		'components/demo/lib/codepen',
		'components/demo/lib/docs-demo-scripts',
		'components/demo/lib/highlight.pack'
	],
 	function(angular, routeConfig, routes, codepen) {
		var app = angular.module('ngAngularDemo.demo', [],
			['$provide', '$compileProvider', '$controllerProvider', '$filterProvider',
				function ($provide, $compileProvider, $controllerProvider, $filterProvider) {

			routeConfig.setModuleName('demo');
			routeConfig.setProvide($provide); //for services
			routeConfig.setCompileProvider($compileProvider);  //for directives
			routeConfig.setControllerProvider($controllerProvider); //for controllers
			routeConfig.setFilterProvider($filterProvider); //for filters
		}])
		.config(['$stateProvider', 'demoConfig' , function($stateProvider, demoConfig) {
			routes($stateProvider, demoConfig);
		}])
		.factory('codepenDataAdapter', codepen.CodepenDataAdapter)
		.factory('codepen', ['$document', 'codepenDataAdapter', codepen.Codepen])

		;

		return app;
	}
);