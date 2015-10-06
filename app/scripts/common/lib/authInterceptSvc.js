'use strict';

define('common/lib/authInterceptSvc', [], function () {

    return ['$rootScope', '$q', '$timeout', '$injector', '$sessionStorage', '$log',
        function($rootScope, $q, $timeout, $injector, $sessionStorage, $log) {
        return {
            request: function (config) {
                config.headers = config.headers || {};
                if ($sessionStorage.access_token) {
                    config.headers['x-auth-token'] = $sessionStorage.access_token;
                }
                return config;
            },
            responseError: function (response) {
                // 미인증 일 때
                if (response.status == 401) {
                    $sessionStorage.access_token = '';
                }
                return $q.reject(response);
            }
        }
    }];
});