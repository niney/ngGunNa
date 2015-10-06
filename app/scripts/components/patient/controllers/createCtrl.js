'use strict';

define('components/patient/controllers/createCtrl', [], function () {
	return ['$scope', 'basicConfig', 'nationList', 'jobList', 'memberSvc','$mdBottomSheet', '$mdToast', '$state',
		function($scope, basicConfig, nationList, jobList, memberSvc, $mdBottomSheet, $mdToast, $state) {

			// 환자
			$scope.user = {};
			$scope.nationality = nationList;
			$scope.jobs = jobList;

			// 등록
			$scope.save = function(user, $event) {

				var memberResource = new memberSvc(user);
				memberResource.$save(function(u) {
					$mdToast.show(
						$mdToast.simple()
							.content('저장 완료')
							.position('top right')
							.hideDelay(1500)
					);

					$mdBottomSheet.show({
						templateUrl: basicConfig.mdBottomSheetTemplateUrl,
						controller: 'createSubCtrl',
						targetEvent: $event
					}).then(function(clickedItem) {
						switch (clickedItem.key) {
							case 1:
								$state.go('master1.patient.receipt');
								break;
							case 2:
								$scope.user = {};
								break;
							default :
								break;
						}
					});
				}, function() {
					//console.log(arguments);
				});

			};

			// 주소 callback
			$scope.oncomplete = function(zoneCode, fullRoadAddr, jibunAddress) {
				$scope.user.postCode = zoneCode;
				$scope.user.address = fullRoadAddr;
				$scope.user.addressJibun = jibunAddress;
			};

	}];
});
