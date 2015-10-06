define([], function () {

	var $provide;
	var serviceRegNameList = [];

	function setProvide(value) {
		$provide = value;
	}

	function register(service) {
		if (service) {
			if (!$provide) {
				throw new Error("$setProvide is not set!");
			}
			if(serviceRegNameList.indexOf(service[0]) == -1) {
				$provide.factory(service[0], service[1]);
				serviceRegNameList.push(service[0]);
			}
		} else {
			$provide.factory = null;
		}

	}


	return {
		setProvide: setProvide,
		register: register
	}
});
