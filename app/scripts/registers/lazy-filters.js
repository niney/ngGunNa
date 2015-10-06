define([], function () {

	var $filterProvider;
	var filterResNameList = [];

	function setFilterProvider(value) {
		$filterProvider = value;
	}

	function register(filter) {
		if(filter){
			if (!$filterProvider) {
				throw new Error("$setProvide is not set!");
			}
			if(filterResNameList.indexOf(filter[0]) == -1) {
				$filterProvider.register(filter[0], filter[1]);
				filterResNameList.push(filter[0]);
			}

		}else{
			$filterProvider.register = null;
		}

	}

	return {
		setFilterProvider: setFilterProvider,
		register: register
	}
});
