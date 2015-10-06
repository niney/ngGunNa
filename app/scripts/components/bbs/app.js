'use strict';

define(
	[
		'angular',
		'route-config',
		'components/bbs/routes'
	],
 	function(angular, routeConfig, routes) {
		var app = angular.module('ngAngularDemo.bbs', [],
			['$provide', '$compileProvider', '$controllerProvider', '$filterProvider',
				function ($provide, $compileProvider, $controllerProvider, $filterProvider) {

			routeConfig.setModuleName('bbs');
			routeConfig.setProvide($provide); //for services
			routeConfig.setCompileProvider($compileProvider);  //for directives
			routeConfig.setControllerProvider($controllerProvider); //for controllers
			routeConfig.setFilterProvider($filterProvider); //for filters
		}])
		/*.config(['$stateProvider' , function($stateProvider) {
			routes($stateProvider);
		}])*/
		;
		return app;
	}
);