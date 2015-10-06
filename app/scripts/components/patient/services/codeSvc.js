'use strict';

define('components/patient/services/codeSvc', [], function () {
	return ['codeSvc', ['$resource', 'basicConfig', function($resource, basicConfig) {
		var resource = $resource(basicConfig.codeUrl, null, {
			'update': { method:'PUT' }
		});
		resource.pCodeKeyList = {
			nations : 1000,
			jobs : 3000,
			subjects: 2000
		};
		return resource;
	}]];
});

