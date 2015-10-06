'use strict';

/*require.config({

    /!*
     package main
     *!/
    packages: [
        {
            name: 'components/bbs',
            main: 'app'
        }
    ]
});*/

define(
    [
        'components/patient',
        'components/bbs'
    ],
    function() {
        var moduleNameArr = [];
        for(var i = 0; i < arguments.length; i++) {
            moduleNameArr.push(arguments[i].name);
        }
        return moduleNameArr;
    }
);