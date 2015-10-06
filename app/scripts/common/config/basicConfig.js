'use strict';

define('common/config/basicConfig', [], function () {
    return function() {
        var baseUrl = "http://localhost:8080/";
        //var baseUrl = "http://172.30.1.55:8080/";
        var socketUrl = "http://localhost:8699/";

        return {
            "baseUrl": baseUrl,
            "socketUrl": socketUrl,
            "loginUrl": baseUrl + "api/login",
            "logoutUrl": baseUrl + "api/logout",
            "memberUrl": baseUrl + "member/:memberId",
            "codeUrl": baseUrl + "code/:codeId",
            "bbsUrl": baseUrl + "bbs/:bbsId",
            "categoryUrl": baseUrl + "categories/:categoryId",
            "fieldInfoUrl": baseUrl + "fieldInfo/:fieldInfoId",
            "headerResourceKey": "x-resource-data",
            "mdBottomSheetTemplateUrl": "scripts/common/views/t/bottom-sheet-grid-template.html"
        };
    }();
});