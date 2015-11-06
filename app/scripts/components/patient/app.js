'use strict';

define(
	[
		'angular',
		'route-config',
		'components/patient/routes'
	],
 	function(angular, routeConfig, routes) {
		var moduleName = 'components/patient/patient';
		var masterPage = 'master1';
		var app = angular.module('ngAngularDemo.gnDemo', [],
			['$provide', '$compileProvider', '$controllerProvider', '$filterProvider',
				function ($provide, $compileProvider, $controllerProvider, $filterProvider) {

			routeConfig.setModuleName(moduleName);
			routeConfig.setProvide($provide); //for services
			routeConfig.setCompileProvider($compileProvider);  //for directives
			routeConfig.setControllerProvider($controllerProvider); //for controllers
			routeConfig.setFilterProvider($filterProvider); //for filters
		}])
		.config(['$stateProvider', 'user_roles', '$translatePartialLoaderProvider',
					function($stateProvider, user_roles, $translatePartialLoaderProvider) {
			routes($stateProvider, user_roles, moduleName, masterPage);
			$translatePartialLoaderProvider.addPart('patient');
		}])
		;
		return app;
	}
);