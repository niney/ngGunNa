'use strict';

define('common/filters/toHtml', [], function () {

    return ['toHtml', ['$sce', function($sce) {
        return function(str) {
            return $sce.trustAsHtml(str);
        };
    }]];
});


