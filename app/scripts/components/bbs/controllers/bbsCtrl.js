'use strict';

define('components/bbs/controllers/bbsCtrl', [], function () {

	//컨트롤러 선언
	return ['$scope', function _controller($scope) {

		//CSS 설정
		$scope.$emit('updateCSS', ['css/css1.css']);

		$scope.message = "I'm the 1st controller!";
		$scope.greeting = "Hello world!";
	}];
});
