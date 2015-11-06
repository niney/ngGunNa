/*! AdminLTE app.js
 * ================
 * Main JS application file for AdminLTE v2. This file
 * should be included in all pages. It controls some layout
 * options and implements exclusive AdminLTE plugins.
 *
 * @Author  Almsaeed Studio
 * @Support <http://www.almsaeedstudio.com>
 * @Email   <support@almsaeedstudio.com>
 * @version 2.3.0
 * @license MIT <http://opensource.org/licenses/MIT>
 */

/*
 user strict 명령은 엄격하게 JavaScript 룰을 적용하라는 의미이다.
 일부 브라우저의 경우 use strict 명령을 통해 보다 빠르게 동작하는 경우도 존재하는 것 같다.
 잘못된 부분에 대한 검증도 보다 엄격하게 동작한다.
 하지만, 일부 라이브러리의 경우 use strict 명령을 사용하면 동작하지 않는 경우도 있으므로 주의해야 한다.
 */
'use strict';

require.config({

/*
	baseUrl:
	JavaScript 파일이 있는 기본 경로를 설정한다.
	만약 data-main 속성이 사용되었다면, 그 경로가 baseUrl이 된다.
	data-main 속성은 require.js를 위한 특별한 속성으로 require.js는 스크립트 로딩을 시작하기 위해 이 부분을 체크한다.
*/
	baseUrl:'scripts',

/*
    paths: 
    path는 baseUrl 아래에서 직접적으로 찾을 수 없는 모듈명들을 위해 경로를 매핑해주는 속성이다.
    "/"로 시작하거나 "http" 등으로 시작하지 않으면, 기본적으로는 baseUrl에 상대적으로 설정하게 된다.
 
    paths: {
        "exam": "aaaa/bbbb"
    }
 
    의 형태로 설정한 뒤에, define에서 "exam/module" 로 불러오게 되면, 스크립트 태그에서는 실제로는 src="aaaa/bbbb/module.js" 로 잡을 것이다.
    path는 또한 아래와 같이 특정 라이브러리 경로 선언을 위해 사용될 수 있는데, path 매핑 코드는 자동적으로 .js 확장자를 붙여서 모듈명을 매핑한다.
*/
	paths: {
		"jquery": "../vendor/jquery/dist/jquery",
		"bootstrap": "../vendor/bootstrap/dist/js/bootstrap",
		"angular": "../vendor/angular/angular",
		"angular-route": "../vendor/angular-route/angular-route",
		"angular-ui-router": "../vendor/angular-ui-router/release/angular-ui-router",
		"angular-resource": "../vendor/angular-resource/angular-resource",
		"angular-cookies": "../vendor/angular-cookies/angular-cookies",
		"angular-animate": "../vendor/angular-animate/angular-animate",
		"angular-aria": "../vendor/angular-aria/angular-aria",
		"angular-messages": "../vendor/angular-messages/angular-messages",
		"angular-material": "../vendor/angular-material/angular-material",
		"angular-bootstrap": "../vendor/angular-bootstrap/ui-bootstrap-tpls",
		"ngStorage": "../vendor/ngstorage/ngStorage",
		"md-chips-select": "../vendor/md-chips-select/dist/md-chips-select",
		"moment": "../vendor/moment/moment",
		"datePicker": "../vendor/bootstrap-datepicker/dist/js/bootstrap-datepicker",
		"datePicker-kr": "../vendor/bootstrap-datepicker/js/locales/bootstrap-datepicker.kr",
		"angular-loading-bar": "../vendor/angular-loading-bar/build/loading-bar",
		"angular-translate": "../vendor/angular-translate/angular-translate",
		//"angular-translate-loader-partial": "common/lib/loader-partial",
		//"angular-translate-storage-cookie": "common/lib/storage-cookie",
		"angular-sanitize": "../vendor/angular-sanitize/angular-sanitize"
	},
/*
	shim:
	AMD 형식을 지원하지 않는 라이브러리의 경우 아래와 같이 SHIM을 사용해서 모듈로 불러올 수 있다.
	참고 : http://gregfranko.com/blog/require-dot-js-2-dot-0-shim-configuration/
*/
	shim: {
		'angular': {
			deps: ['jquery'],
			exports: 'angular'
		},
		'angular-ui-router': {
			deps: ['angular']
		},
		'angular-resource': {
			deps: ['angular']
		},
		'angular-cookies': {
			deps: ['angular']
		},
		'angular-animate': {
			deps: ['angular']
		},
		'angular-aria': {
			deps: ['angular']
		},
		'angular-messages': {
			deps: ['angular']
		},
		'angular-material': {
			deps: ['angular']
		},
		'angular-bootstrap': {
			deps: ['angular']
		},
		'ngStorage': {
			deps: ['angular']
		},
		'app': {
			deps: ['angular', 'angular-ui-router']
		},
		'routes': {
			deps: ['angular', 'angular-ui-router']
		},
		'bootstrap': {
			deps: ['jquery']
		},
		'datePicker': {
			deps: ['bootstrap']
		},
		'datePicker-kr': {
			deps: ['datePicker']
		},
		'angular-loading-bar': {
			deps: ['angular']
		},
		'angular-translate': {
			deps: ['angular']
		},
		/*'angular-translate-loader-partial': {
			deps: ['angular-translate']
		},
		'angular-translate-storage-cookie': {
			deps: ['angular-translate']
		},*/
		'angular-sanitize': {
			deps: ['angular']
		}
	},

	/*
		package main
	 */
	//packages : ['components']
	packages : ['components',
		{ name: 'components/patient', main: 'app' },
		{ name: 'components/bbs', main: 'app' }
	]

});

require(
	[
		'jquery',
		'angular',
		'angular-ui-router',
		'angular-resource',
		'angular-cookies',
		'angular-animate',
		'angular-aria',
		'angular-messages',
		'angular-material',
		'angular-bootstrap',
		'ngStorage',
		'bootstrap',
		'moment',
		'datePicker',
		'datePicker-kr',
		'angular-loading-bar',
		'angular-translate',
		'angular-sanitize',
		'app', // app.js
		'routes' // routes.js
	],
	function($, angular) {
		
		$(document).ready(function () {

			//위의 디펜던시 중 Application 이 포함된 app.js가 로드된 이후에 아래가 수행된다.
			//임의로 앵귤러 부트스트래핑을 수행한다.
			angular.bootstrap(document, ['ngAngularDemo']);
			
		});
	}
);