'use strict';

define('common/lib/authUserRoles', [], function () {
    return {
        all: '*',
        member: 'ROLE_MEMBER',
        admin: 'ROLE_ADMIN',
        guest: 'GUEST'
    };
});