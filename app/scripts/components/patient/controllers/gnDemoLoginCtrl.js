'use strict';

define('components/gnDemo/controllers/gnDemoLoginCtrl', [], function () {
    return ['$scope', 'authSvc', function($scope, authSvc) {
        authSvc.dialogShow({
            isClickOutsideToClose: false
        });
    }];
});
