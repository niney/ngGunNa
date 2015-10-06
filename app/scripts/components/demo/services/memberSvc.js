'use strict';

define('components/demo/services/memberSvc', [], function () {
	return ['memberSvc', ['$resource', 'basicConfig', function($resource, basicConfig) {
		var resource = $resource(basicConfig.memberUrl, null, {
			'update': { method:'PUT' }
		});
		return resource;
	}]]
});

