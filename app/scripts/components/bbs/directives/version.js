'use strict';

define('components/bbs/directives/version', [], function () {

    return ['appVersion2', function () {
		return function (scope, elm, attrs) {
			elm.text("1.0.0");
		}
	}]
});
