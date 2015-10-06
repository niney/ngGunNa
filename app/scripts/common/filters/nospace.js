'use strict';

define('common/filters/nospace', [], function () {
    return ['nospace', function() {
        return function (value) {
            return (!value) ? '' : value.replace(/ /g, '');
        };
    }];
});


