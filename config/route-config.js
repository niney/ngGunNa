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

		function resolveConfig(packageName, lazyResources) {

			return ['$q', '$rootScope', function ($q, $rootScope) {
				//defer 가져오기
				var defer = $q.defer();

				// controllerPath not define(생략)
				/*if(angular.isDefined(controllerPath) && !angular.isString(controllerPath)) {
					lazyResources = controllerPath;
					controllerPath = undefined;
				}*/

				/*if(!angular.isDefined(lazyResources) && !angular.isString(packageName)) {
					lazyResources = packageName;
					packageName = undefined;
				}*/

				var dependencies = [];
				//리소스들 추가
				if (lazyResources) {
					/*if(angular.isDefined(controllerPath))
						{ dependencies = dependencies.concat(controllerPath); }*/
					if(angular.isDefined(lazyResources.controllers))
						{ dependencies = dependencies.concat(lazyResources.controllers); }
					if(angular.isDefined(lazyResources.directives))
						{ dependencies = dependencies.concat(lazyResources.directives); }
					if(angular.isDefined(lazyResources.services))
						{ dependencies = dependencies.concat(lazyResources.services); }
					if(angular.isDefined(lazyResources.filters))
						{ dependencies = dependencies.concat(lazyResources.filters); }
				}

				var depRegister = function () {

					//인디케이터
					var indicator = 0;

					//템플릿
					//var template = arguments[indicator++];

					//컨트롤러
					/*if (angular.isDefined(controllerPath)) {
						$controllerProvider.register(controllerPath.substring(controllerPath.lastIndexOf("/") + 1), arguments[indicator]);
						indicator++;
					}*/

					if (angular.isDefined(lazyResources)) {

						var i = 0;

						//추가 컨트롤러
						if (angular.isDefined(lazyResources.controllers)) {
							for (i = 0; i < lazyResources.controllers.length; i++) {
								var cp = lazyResources.controllers[i];
								$controllerProvider.register(cp.substring(cp.lastIndexOf("/") + 1), arguments[indicator]);
								indicator++;
							}
						}

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
					defer.resolve();
					$rootScope.$apply();
				};

				//디펜던시들 가져오기
				var isProd = eval('@@isProd');
				if (isProd) { // dev or prod
					require([packageName], function () {
						require(dependencies, depRegister);
					});
				} else {
					require(dependencies, depRegister);
				}

				return defer.promise;
			}];
		}
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

