'use strict';

define('common/directives/version', [], function () {

    return ['appVersion', function () {
		return function (scope, elm, attrs) {
			elm.text("1.0.0");
		}
	}]
});
