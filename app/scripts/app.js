'use strict';

define(
	[
		'angular',
		'route-config', // registers에 각 프로바이더를 제공하기 위해 임포트
		'common/config/basicConfig',
		'common/config/navConfig',
		'common/config/eventConfig',
		'components',
		'common/lib/authInterceptSvc',
		'common/lib/authSvc',
		'common/lib/authUserRoles'
	],
/*
	이 부분도 주의깊게 살펴봐야한다.
	위의 디펜던시들이 모두 로드된 뒤에 아래의 콜백이 실행된다.
	디펜던시들이 리턴하는 객체들을 콜백함수의 파라메터로 받게 되는데,
	자세히보면 route-config와 같이 snake case로 된 파일명이,
	파라메터로 받을 때는 routeConfig와 같이 camel case로 바뀌는 것을 볼 수 있다.
*/	
 	function(angular, routeConfig, basicConfig, navConfig, eventConfig, components,
			 authInterceptSvc, authSvc, authUserRoles) {

 		//모듈 선언
		var modulesName = ['ui.router', 'ngMaterial', 'ngResource',
			'ngAnimate', 'ngMessages', 'ngStorage', 'config', 'ui.bootstrap', 'angular-loading-bar'];
		modulesName = modulesName.concat(modulesName, components);
		var app = angular.module('ngAngularDemo', modulesName,
				['$provide', '$compileProvider', '$controllerProvider', '$filterProvider',
					function ($provide, $compileProvider, $controllerProvider, $filterProvider) {

				routeConfig.setModuleName('main');
				//부트스트랩 과정에서만 가져올 수 있는 프로바이더들을 각 registers와 연계될 수 있도록
				routeConfig.setProvide($provide); //for services
				routeConfig.setCompileProvider($compileProvider);  //for directives
				routeConfig.setControllerProvider($controllerProvider); //for controllers
				routeConfig.setFilterProvider($filterProvider); //for filters
			}])
			.config(['$mdThemingProvider', '$mdIconProvider', 'cfpLoadingBarProvider',
					function ($mdThemingProvider, $mdIconProvider, cfpLoadingBarProvider) {
				$mdIconProvider
					.iconSet('action', 'images/iconsets/action-icons.svg', 24)
					.iconSet('alert', 'images/iconsets/alert-icons.svg', 24)
					.iconSet('av', 'images/iconsets/av-icons.svg', 24)
					.iconSet('communication', 'images/iconsets/communication-icons.svg', 24)
					.iconSet('content', 'images/iconsets/content-icons.svg', 24)
					.iconSet('device', 'images/iconsets/device-icons.svg', 24)
					.iconSet('editor', 'images/iconsets/editor-icons.svg', 24)
					.iconSet('file', 'images/iconsets/file-icons.svg', 24)
					.iconSet('hardware', 'images/iconsets/hardware-icons.svg', 24)
					.iconSet('icons', 'images/iconsets/icons-icons.svg', 24)
					.iconSet('image', 'images/iconsets/image-icons.svg', 24)
					.iconSet('maps', 'images/iconsets/maps-icons.svg', 24)
					.iconSet('navigation', 'images/iconsets/navigation-icons.svg', 24)
					.iconSet('notification', 'images/iconsets/notification-icons.svg', 24)
					.iconSet('social', 'images/iconsets/social-icons.svg', 24)
					.iconSet('toggle', 'images/iconsets/toggle-icons.svg', 24)
				;
				cfpLoadingBarProvider.includeSpinner = false;
			}])
			.factory('authInterceptSvc', authInterceptSvc)
			.factory('authSvc', authSvc)
			.config(['$stateProvider', '$urlRouterProvider', '$httpProvider',
					function ($stateProvider, $urlRouterProvider, $httpProvider) {
				$httpProvider.interceptors.push('authInterceptSvc');
			}])
			.config(['$httpProvider', function($httpProvider) { // ie cache disable
				//initialize get if not there
				if (!$httpProvider.defaults.headers.get) {
					$httpProvider.defaults.headers.get = {};
				}

				// Answer edited to include suggestions from comments
				// because previous version of code introduced browser-related errors

				//disable IE ajax request caching
				$httpProvider.defaults.headers.get['If-Modified-Since'] = 'Mon, 26 Jul 1997 05:00:00 GMT';
				// extra
				$httpProvider.defaults.headers.get['Cache-Control'] = 'no-cache';
				$httpProvider.defaults.headers.get['Pragma'] = 'no-cache';
			}])
			.run(['$rootScope', '$state', '$stateParams', '$sessionStorage', 'authSvc',
					function ($rootScope, $state, $stateParams, $sessionStorage, authSvc) {
				$rootScope.$state = $state;
				$rootScope.$stateParams = $stateParams;

				$rootScope.$on('$stateChangeStart',
					function (event, toState, toParams) {
						authSvc.stateAuthCheck(event, toState, toParams);
					});

				$rootScope.$on('$stateChangeError',
					function(event, toState, toParams, fromState, fromParams, error) {
						authSvc.stateAuthCheck(event, toState, toParams, error);
					});

			}])
		;

		/*
		 config
		 */
		angular.module('config', [])
			.constant('user_roles', authUserRoles)
			.constant('basicConfig', basicConfig)
			.constant('navConfig', navConfig)
			.constant('eventConfig', eventConfig)
		;

		//공통 컨트롤러 설정 - 모든 컨트롤러에서 공통적으로 사용하는 부분들 선언
		app.controller('CommonCtrl', ['$scope', function($scope) {
		
			//스타일시트 업데이트
			 $scope.$on('updateCSS', function(event, args) {
			 
				//파라메터로 받아온 스타일 시트 반영
				$scope.stylesheets = args;
			});

			// 로그인
			function DialogController($scope, $mdDialog) {
				$scope.hide = function() {
					$mdDialog.hide();
				};
				$scope.cancel = function() {
					$mdDialog.cancel();
				};
				$scope.answer = function(answer) {
					$mdDialog.hide(answer);
				};
			}
			$scope.showAlert = function(ev) {
				$mdDialog.show({
					controller: DialogController,
					templateUrl: 'scripts/components/gnDemo/views/gnDemoLogin.html',
					parent: angular.element(document.body),
					targetEvent: ev,
					clickOutsideToClose:true
				})
					.then(function(answer) {
						$scope.status = 'You said the information was "' + answer + '".';
					}, function() {
						$scope.status = 'You cancelled the dialog.';
					});
			};

		}]);

		return app;
	}
);