'use strict';

define([
		'app', //생성한 앵귤러 모듈에 루트를 등록하기 위해 임포트
		'route-config' //루트를 등록하는 routeConfig를 사용하기 위해 임포트
	],

	function (app, routeConfig) {
		return app.config(['$stateProvider', '$urlRouterProvider', 'user_roles',
			function ($stateProvider, $urlRouterProvider, user_roles) {
			$stateProvider
				.state("master1", {
					abstract: true,
					templateUrl: 'scripts/common/views/t/master1.html',
					controller: 'mainCtrl',
					resolve: {
						master1: routeConfig.resolveConfig(
							'common/common',
							{
								controllers: [
									'common/controllers/mainCtrl'
								],
								services: [
									'common/services/pagingSvc'
								],
								directives: [
									'common/directives/adminLte',
									'common/directives/datePicker',
									'common/directives/navMenu',
									'common/directives/pagingCustom'
								],
								filters: ['common/filters/humanizeDoc',
									'common/filters/nospace',
									'common/filters/toHtml',
									'common/filters/age'
								]
							}
						)
					}
				})
				.state("master2", {
					abstract: true,
					templateUrl: 'scripts/common/views/t/master2.html',
					controller: 'mainCtrl',
					resolve: {
						master1: routeConfig.resolveConfig(
							'common/common',
							{
								controllers: [
									'common/controllers/mainCtrl'
								],
								directives: [
									'common/directives/adminLte'
								],
								filters: ['common/filters/humanizeDoc',
									'common/filters/nospace',
									'common/filters/toHtml'
								]
							}
						)
					}
				})
				.state("master1.main", {
					url: "/",
					views: {
						'': {
							templateUrl: 'scripts/common/views/main.html',
							resolve: {
								main: routeConfig.resolveConfig(
									'common/common'
								)
							}
						}
					}
				})
			;
			$urlRouterProvider.otherwise('/');

		}]);
	});
