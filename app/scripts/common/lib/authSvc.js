'use strict';

define('common/lib/authSvc', [], function () {

    return ['$sessionStorage', '$log', '$state', '$mdDialog', function ($sessionStorage, $log, $state, $mdDialog) {
        var authService = {};

        // 로그인
        function DialogController($scope, $mdDialog) {

            $scope.login = function() {
                $mdDialog.hide();
            };
            $scope.hide = function() {
                $mdDialog.hide();
            };
            $scope.cancel = function() {
                $mdDialog.cancel();
            };
            $scope.answer = function(answer) {
                $mdDialog.hide(answer);
            };
        }

        authService.dialogShow = function(options) {
            options = options || {};
            if(!options.hasOwnProperty('isClickOutsideToClose'))
                options['isClickOutsideToClose'] = true;
            return $mdDialog.show({
                controller: DialogController,
                templateUrl: 'scripts/components/gnDemo/views/gnDemoLogin.html',
                parent: angular.element(document.body),
                clickOutsideToClose: options['isClickOutsideToClose']
            });
        };

        /**
         * state 이동시 인증 및 권한 검사
         * @param event
         * @param toState
         * @param toParams
         * @returns {boolean}
         */
        authService.stateAuthCheck = function (event, toState, toParams, error) {
            if (toState.data != undefined) {
                var authorizedRoles = toState.data.authorizedRoles;
                // 인증검사
                if (!authService.isAuthenticated()) {
                    event.preventDefault();
                    /*loginModal()
                        .then(function () {
                            return $state.go(toState.name, toParams);
                        })
                        .catch(function () {
                        });*/
                    this.dialogShow()
                        .then(function(answer) {
                            //$scope.status = 'You said the information was "' + answer + '".';
                            $state.go(toState.name, toParams);
                        }, function() {
                            //$scope.status = 'You cancelled the dialog.';
                        });
                    return false;
                }

                // 권한검사
                if (!authService.isAuthorized(authorizedRoles)) {
                    event.preventDefault();
                    /*loginModal()
                        .then(function () {
                            return $state.go(toState.name, toParams);
                        })
                        .catch(function () {
                        });*/

                    return false;
                }

            }

            return true;
        };

        /**
         * 인증 확인
         * @returns {boolean}
         */
        authService.isAuthenticated = function () {
            if ($sessionStorage.access_token == undefined
                || $sessionStorage.access_token == '')
                return false;

            return true;
        };

        /**
         * 권한 확인
         * @param authorizedRoles
         * @returns {boolean}
         */
        authService.isAuthorized = function (authorizedRoles) {
            if (!authService.isAuthenticated())
                return false;
            if (authorizedRoles == undefined)
                return true;
            if (!angular.isArray(authorizedRoles)) {
                authorizedRoles = [authorizedRoles];
            }
            var isRole = false;
            for (var i = 0; i < $sessionStorage.roles.length; i++) {
                isRole = authorizedRoles.indexOf($sessionStorage.roles[i]) != -1 ? true : false;
                if (isRole)
                    break;
            }
            return isRole;
        };
        return authService;
    }];
});