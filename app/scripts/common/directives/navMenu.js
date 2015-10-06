'use strict';

define('common/directives/navMenu', [], function () {

    return ['navMenu', ['$rootScope', 'navConfig', '$state', function ($rootScope, navConfig, $state) {

        return {
            restrict: 'AE',
            link: function (scope, elem, attrs) {

                var getTitle = function(navName) {
                    var title = eval("navConfig." + navName  + ".getTitle()");
                    return title;
                };
                var getEngTitle = function(navName) {
                    var title = eval("navConfig." + navName  + ".getEngTitle()");
                    return title;
                };
                var getNav = function(name) {
                    if(name == '')
                        return '';
                    var val = eval('navConfig.' + name);
                    var nm = name.substring(0,name.lastIndexOf('.'));
                    if(nm == '')
                        return val.getTitle();

                    return getNav(nm);
                };
                var navMenuSetting = function(name) {
                    var navName = name;
                    var title = getTitle(navName);
                    var engTitle = getEngTitle(navName);
                    var nav = getNav(navName);
                    scope.title = title;
                    scope.engTitle = engTitle;
                    scope.nav = nav;
                };

                // 1. 초기화 세팅
                navMenuSetting($state.current.name);

                // 2. 이벤트 받기
                $rootScope.$on('$stateChangeSuccess', function (event, toState, toParams) {
                    navMenuSetting(toState.name);
                });

            }
        };
    }]]
});