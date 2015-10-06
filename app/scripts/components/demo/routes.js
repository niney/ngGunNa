'use strict';

define([
		'route-config' //루트를 등록하는 routeConfig를 사용하기 위해 임포트
	],

	function (routeConfig, demoConfig) {
		return function($stateProvider, demoConfig) {
			/*$stateProvider
				.state("view11",
				routeConfig.config(
					'components/demo/demo',
					'/view11',
					'scripts/components/demo/views/view11.html',
					'components/demo/controllers/demoCtrl',
					{
						directives: ['components/demo/directives/version'],
						services: [],
						filters: ['components/demo/filters/reverse']
					}
				))
			;*/
			angular.forEach(demoConfig, function(componentDemos) {
				var demoComponent;
				/*angular.forEach(COMPONENTS, function(component) {
					if (componentDemos.name === component.name) {
						demoComponent = component;
					}
				});*/
				demoComponent = demoComponent || angular.extend({}, componentDemos);
				$stateProvider.state('master1.' + componentDemos.label, {
					url: componentDemos.url,
					views: {
						'': {
							templateUrl: 'scripts/components/demo/views/demo.tmpl.html',
							controller: 'demoCtrl',
							resolve: {
								demo: routeConfig.resolveConfig(
									'components/demo/demo',
									'components/demo/controllers/demoCtrl',
									{
										directives: ['components/demo/directives/docsDemo',
											'components/demo/directives/demoFile',
											'components/demo/directives/demoInclude',
											'components/demo/directives/hljs'
										]
									}
								),
								component: function () { return demoComponent; },
								demos: function () { return componentDemos.demos; }
							}
						}
					}
				});
			});
/*			$stateProvider.state('demo/material.components.autocomplete', {
				url: '/demo/material.components.autocomplete',
				templateUrl: 'partials/demo.tmpl.html',
				controller: 'DemoCtrl'
			});*/
		};
	});