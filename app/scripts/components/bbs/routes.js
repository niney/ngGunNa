'use strict';

define([
		'route-config' //루트를 등록하는 routeConfig를 사용하기 위해 임포트
	],

	function (routeConfig) {
		return function($stateProvider) {
			$stateProvider
				.state("view11",
				routeConfig.config(
					'components/bbs/bbs',
					'/view11',
					'scripts/components/bbs/views/view11.html',
					'components/bbs/controllers/bbsCtrl',
					{
						directives: ['components/bbs/directives/version'],
						services: [],
						filters: ['components/bbs/filters/reverse']
					}
				))
			;
		};
	});

/*
'use strict';

define([
		'app', //생성한 앵귤러 모듈에 루트를 등록하기 위해 임포트
		'route-config' //루트를 등록하는 routeConfig를 사용하기 위해 임포트
	],

	function (app, routeConfig) {

		//app은 생성한 myApp 앵귤러 모듈
		return app.config(function ($routeProvider) {

			//view1 경로 설정
			$routeProvider.when('/view1', routeConfig.config('../partials/view1.html', 'controllers/first', {
				directives: ['directives/version'],
				services: [],
				filters: ['filters/reverse']
			}));

			/!*$routeProvider
				.when('/view2', {
					template: 'view2 입니당',
					controller: 'first'
				});*!/

			//view2 경로 설정
			$routeProvider.when('/view2', routeConfig.config('../partials/view2.html', 'controllers/second', {
				directives: ['directives/version'],
				services: ['services/tester'],
				filters: []
			}));

			//grid 경로 설정
			$routeProvider.when('/grid', routeConfig.config('../partials/grid.html', 'controllers/grid'));

			//admin 경로 설정
			$routeProvider.when('/admin', routeConfig.config('../partials/admin.html', 'controllers/third'));

			//기본 경로 설정
			$routeProvider.otherwise({redirectTo:'/view1'});

		});
});
*/
