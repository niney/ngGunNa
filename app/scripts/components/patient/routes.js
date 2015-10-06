'use strict';

define([
		'route-config' //루트를 등록하는 routeConfig를 사용하기 위해 임포트
	],

	function (routeConfig) {
		return function($stateProvider, user_roles, moduleName, masterPage) {
			$stateProvider
				.state(masterPage + ".patient", {
					views: {
						'': {
							templateUrl: 'scripts/common/views/t/content1.html'
						}
					},
					resolve: {
						patient: routeConfig.resolveConfig(
							moduleName,
							{
								services: ['components/patient/services/codeSvc',
									'components/patient/services/memberSvc']
							}
						)
					}
				})
				/*
				 * 신규 등록
				 */
				.state(masterPage + '.patient.create', {
					url: '/pc',
					views: {
						'': {
							templateUrl: 'scripts/components/patient/views/create.html',
							controller: 'createCtrl',
							resolve: {
								patientCreate: routeConfig.resolveConfig(
									moduleName,
									{
										directives: ['components/patient/directives/daumPost'],
										controllers: [
											'components/patient/controllers/createCtrl',
											'components/patient/controllers/createSubCtrl']
									}
								),
								nationList: ['codeSvc',
									function(codeSvc) {
										// 국적
										var result = codeSvc.query({
											pCodeKey: codeSvc.pCodeKeyList.nations
										});
										return result.$promise;
									}
								],
								jobList: ['codeSvc',
									function(codeSvc) {
										// 직업
										var result = codeSvc.query({
											pCodeKey: codeSvc.pCodeKeyList.jobs										});
										return result.$promise;
									}
								]
							}
						}
					}/*,
					 data: {
					 authorizedRoles: [user_roles.admin]
					 }*/
				})
				/*
				 * 환자 접수
				 */
				.state(masterPage + '.patient' + '.receipt', {
					url: '/pr?currentPage&offset&sort&order&q&qt',
					views: {
						'': {
							templateUrl: 'scripts/components/patient/views/receipt.html',
							controller: 'receiptCtrl',
							resolve: {
								patientReceipt: routeConfig.resolveConfig(
									moduleName,
									{
										controllers: ['components/patient/controllers/receiptCtrl'],
										filters: ['components/patient/filters/gender']
									}
								),
								memberList: ['pagingSvc', 'memberSvc', '$stateParams', '$state',
									function(pagingSvc, memberSvc, $stateParams, $state) {
										return pagingSvc.queryLoad(memberSvc, $stateParams, $state).$promise;
									}
								],
								subjectList: ['codeSvc',
									function(codeSvc) {
										// 진료과목
										var result = codeSvc.query({
											pCodeKey: codeSvc.pCodeKeyList.subjects
										});
										return result.$promise;
									}
								]
							}
						}
					}
				})
				// 로그인
				.state('master2' + '.gnDemoLogin', {
					url: '/gnDemoLogin',
					views: {
						'': {
							templateUrl: 'scripts/components/gnDemo/views/gnDemoLogin.html',
							controller: 'gnDemoLoginCtrl',
							resolve: {
								gnDemoLogin: routeConfig.resolveConfig(
									moduleName,
									'components/gnDemo/controllers/gnDemoLoginCtrl'
								)
							}
						}
					}
				})
				.state(masterPage + '.gnDemoPatientSelect', {
					url: '/gnDemoPatientSelect',
					views: {
						'': {
							templateUrl: 'scripts/components/gnDemo/views/gnDemoPatientSelect.html',
							controller: 'gnDemoPatientSelect',
							resolve: {
								gnDemoPatientSelect: routeConfig.resolveConfig(
									moduleName,
									'components/gnDemo/controllers/gnDemoPatientSelect'
								)
							}
						}
					}
				})
			;
		};
	});