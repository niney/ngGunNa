'use strict';

define('components/patient/controllers/receiptCtrl', [], function () {
	return ['$rootScope', '$scope', 'basicConfig', 'memberList', 'subjectList', 'memberSvc', 'pagingSvc', '$stateParams', '$state',
		'$mdBottomSheet', '$mdToast',
		function($rootScope, $scope, basicConfig, memberList, subjectList, memberSvc, pagingSvc, $stateParams, $state,
				 $mdBottomSheet, $mdToast) {

			/*memberSvc.query({}, function(data) {
				$scope.members = data;
			});*/

			// init
			$scope.members = memberList;
			$scope.subjects = subjectList;
			$scope.patient = {};
			pagingSvc.pagingEvent($rootScope, $scope, 'members');


			// 환자선택
			$scope.patientSelect = function(member) {
				$scope.patient = member;
			}

		}];
});
