'use strict';

define('components/patient/controllers/createSubCtrl', [], function () {
	return ['$scope', 'codeSvc', 'memberSvc', '$mdBottomSheet', function($scope, codeSvc, memberSvc, $mdBottomSheet) {

		$scope.items = [
			{ key: 1, name: '접수화면', icon: 'social:person' },
			{ key: 2, name: '더 등록', icon: 'social:person' }
		];
		$scope.listItemClick = function($index) {
			var clickedItem = $scope.items[$index];
			$mdBottomSheet.hide(clickedItem);
		};

	}];
});
