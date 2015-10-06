'use strict';

define([], function() {
	
	var $compileProvider;
	var directiveRegNameList = [];

	function setCompileProvider(value) {
		$compileProvider = value;
	}

	function register(directive) {
		if(directive){
			if (!$compileProvider) {
				throw new Error("$compileProvider is not set!");
			}
			if(directiveRegNameList.indexOf(directive[0]) == -1) {
				$compileProvider.directive.apply(null, directive);
				directiveRegNameList.push(directive[0]);
			}
		}else{
			$compileProvider.directive.apply = null;
		}
	}

	return {
		setCompileProvider: setCompileProvider,
		register: register
	}
	
});