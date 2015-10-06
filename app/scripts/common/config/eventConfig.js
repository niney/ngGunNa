'use strict';

define('common/config/eventConfig', [], function () {
    return {
        // 검색
        search: {
            click: 'searchClickEventParamsIsQtAndQ'
        },
        paging: {
            pagingChange: 'pagingChange',
            pagingSetting: 'pagingSettingEventParamsTotalItemsAndCurrentPageAndItemPerPageAndCurrentTotalCount'
        },
        auth: {
            notAuthenticated: 'notAuthenticated',
            notAuthorized: 'notAuthorized',
            sessionTimeout: 'sessionTimeout'
        }
    }
});