'use strict';

define([
		//디펜던시가 걸려있으므로, 아래의 디펜던시가 먼저 로드된 뒤에 아래 콜백이 수행된다.
		'registers/lazy-directives',
		'registers/lazy-services', 
		'registers/lazy-filters'
	],

	//디펜던시 로드뒤 콜백함수
	function (lazyDirectives, lazyServices, lazyFilters) {

		
		var $controllerProvider; //컨트롤러 프로바이더를 받을 변수

		var currentModule = '';

		function setModuleName(value) {
			currentModule = value;
		}

		function getModuleName() {
			return currentModule;
		}

		//컨트롤러 프로바이더 설정 함수
		function setControllerProvider(value) {
			$controllerProvider = value;
		}

		//컴파일 프로바이더 설정 함수
		function setCompileProvider(value) {
			lazyDirectives.setCompileProvider(value);
		}

		//프로바이드 설정 함수
		function setProvide(value) {
			lazyServices.setProvide(value);
		}

		//필터 프로바이더 설정 함수
		function setFilterProvider(value) {
			lazyFilters.setFilterProvider(value);
		}

		function resolveConfig(packageName, controllerPath, lazyResources) {

			return ['$q', '$rootScope', function ($q, $rootScope) {
				//defer 가져오기
				var defer = $q.defer();

				//html에 아무런 값이 없는 경우
				//if (!html) {

					//템플릿 및 컨트롤러 디펜던시 설정
					//var dependencies = ["text!" + templatePath, controllerPath];
					//var dependencies = ["text!" + 'common/views/view2.html', controllerPath];

					var dependencies = [controllerPath];
					//리소스들 추가
					if (lazyResources) {
						dependencies = dependencies.concat(lazyResources.directives);
						dependencies = dependencies.concat(lazyResources.services);
						dependencies = dependencies.concat(lazyResources.filters);
					}

					var depRegister = function () {

						//인디케이터
						var indicator = 0;

						//템플릿
						//var template = arguments[indicator++];

						//컨트롤러
						if (angular.isDefined(controllerPath)) {
							$controllerProvider.register(controllerPath.substring(controllerPath.lastIndexOf("/") + 1), arguments[indicator]);
							indicator++;
						}

						if (angular.isDefined(lazyResources)) {

							var i = 0;
							//다이렉티브
							if (angular.isDefined(lazyResources.directives)) {
								for (i = 0; i < lazyResources.directives.length; i++) {
									lazyDirectives.register(arguments[indicator]);
									indicator++;
								}
							}

							//서비스(value)
							if (angular.isDefined(lazyResources.services)) {
								for (i = 0; i < lazyResources.services.length; i++) {
									lazyServices.register(arguments[indicator]);
									indicator++;
								}
							}

							//필터
							if (angular.isDefined(lazyResources.filters)) {
								for (i = 0; i < lazyResources.filters.length; i++) {
									lazyFilters.register(arguments[indicator]);
									indicator++;
								}
							}
						}

						//딜레이 걸어놓기
						//html = template;
						defer.resolve();
						$rootScope.$apply();
					};

					//디펜던시들 가져오기
					if ('@@isProd') { // dev or prod
						require([packageName], function () {
							require(dependencies, depRegister);
						});
					} else
						require(dependencies, depRegister);

				//} else {
				//	defer.resolve();
				//}
				return defer.promise;
			}];
		}
		
/*
		현재 시점에서 services는 오직 value 값을 정할때만 사용할 수 있다.
		Services는 반드시 factory를 사용해야 한다.
		
		$provide.value('a', 123);
		$provide.factory('a', function() { return 123; });
		$compileProvider.directive('directiveName', ...);
		$filterProvider.register('filterName', ...);
*/
		/*function config(packageName, url ,templatePath, controllerPath, lazyResources) {

			//컨트롤러 프로바이더가 존재하지 않으면 오류!
			if (!$controllerProvider) {
				throw new Error("$controllerProvider is not set!");
			}

			//변수 선언
			var defer,
				html,
				routeDefinition = {};

			//경로 템플릿 설정
			/!*routeDefinition.template = function () {
				return html;
			};*!/

			routeDefinition.url = url;

			routeDefinition.templateUrl = function () {
			 	return templatePath;
			};
			
			//경로 컨트롤러 설정
			routeDefinition.controller = controllerPath.substring(controllerPath.lastIndexOf("/") + 1);

			console.log(this.getModuleName() + ', con : ' + routeDefinition.controller);
			//경로 
			routeDefinition.resolve = {

				delay: ['$q', '$rootScope', function ($q, $rootScope) {

					//defer 가져오기
					defer = $q.defer();
					
					//html에 아무런 값이 없는 경우
					if (!html) {
					
						//템플릿 및 컨트롤러 디펜던시 설정
						//var dependencies = ["text!" + templatePath, controllerPath];
						//var dependencies = ["text!" + 'common/views/view2.html', controllerPath];

						var dependencies= [controllerPath];
						//리소스들 추가
						if (lazyResources) {
							dependencies = dependencies.concat(lazyResources.directives);
							dependencies = dependencies.concat(lazyResources.services);
							dependencies = dependencies.concat(lazyResources.filters);
						}

						var depRegister = function () {

							//인디케이터
							var indicator = 0;

							//템플릿
							//var template = arguments[indicator++];

							//컨트롤러
							if( angular.isDefined( controllerPath ) ) {
								$controllerProvider.register(controllerPath.substring(controllerPath.lastIndexOf("/") + 1), arguments[indicator]);
								indicator++;
							}

							if( angular.isDefined( lazyResources ) ) {

								var i = 0;
								//다이렉티브
								if( angular.isDefined(lazyResources.directives) ) {
									for(i=0; i<lazyResources.directives.length; i++) {
										lazyDirectives.register(arguments[indicator]);
										indicator++;
									}
								}

								//서비스(value)
								if( angular.isDefined(lazyResources.services) ) {
									for(i=0; i<lazyResources.services.length; i++) {
										lazyServices.register(arguments[indicator]);
										indicator++;
									}
								}

								//필터
								if( angular.isDefined(lazyResources.filters) ) {
									for(i=0; i<lazyResources.filters.length; i++) {
										lazyFilters.register(arguments[indicator]);
										indicator++;
									}
								}
							}

							//딜레이 걸어놓기
							//html = template;
							defer.resolve();
							$rootScope.$apply();
						};

						//디펜던시들 가져오기
						if(packageName != undefined) { // dev or prod
							require([packageName], function() {
								require(dependencies, depRegister);
							});
						} else
							require(dependencies, depRegister);

					} else {
						defer.resolve();
					}

					return defer.promise;
				}]
			};

			return routeDefinition;
		}*/

		return {
			setControllerProvider: setControllerProvider,
			setCompileProvider: setCompileProvider,
			setProvide: setProvide,
			setFilterProvider: setFilterProvider,
			//config: config,
			resolveConfig: resolveConfig,
			setModuleName: setModuleName,
			getModuleName: getModuleName
		};
	}
);

