'use strict';

define('common/filters/age', [], function () {
    return ['age', function() {
        return function (birthday, format) {
            if(!!birthday) {
                var ageDifMs = Date.now() - new Date(birthday);
                var ageDate = new Date(ageDifMs); // miliseconds from epoch
                var age = Math.abs(ageDate.getUTCFullYear() - 1970);
                return format.replace("xx", age);
            }
        };
    }];
});


