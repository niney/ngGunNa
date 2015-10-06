'use strict';

define('components/patient/filters/gender', [], function () {

    return ['gender', function() {
        return function(input) {
            if(input == 'MALE')
                return '남자';

            return '여자';
        }}];
});


