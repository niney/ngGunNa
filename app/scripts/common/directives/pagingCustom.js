'use strict';

define('common/directives/pagingCustom', [], function () {

    return ['pagingCustom', ['$rootScope', '$state', 'eventConfig', '$compile',
        function($rootScope, $state, eventConfig, $compile) {

            return {
                require: '?ngModel',
                restrict: 'AE',
                scope: {
                    pick12HourFormat: '@',
                    language: '@',
                    useCurrent: '@',
                    location: '@'
                },
                link: function (scope, elem, attrs) {
                    var html = '';

                    html = '<pagination boundary-links="true" total-items="totalItems" max-size="10"';
                    html += '    ng-model="currentPage"  ng-change="pageChanged()"';
                    html += '    class="pagination-sm" items-per-page="itemsPerPage"';
                    html += '    previous-text="&lsaquo;" next-text="&rsaquo;"';
                    html += '    first-text="&laquo;" last-text="&raquo;">';
                    html += '</pagination>';
                    elem.append($compile(html)(scope));

                    // paging 관련 setting
                    var unbindPagingSetting = $rootScope.$on(eventConfig.paging.pagingSetting, function(e, params) {
                        scope.totalItems = params.totalItems;
                        scope.currentPage = params.currentPage;
                        scope.itemsPerPage = params.itemsPerPage;
                        scope.currentTotalCount = params.currentTotalCount;
                    });
                    scope.$on('$destroy', unbindPagingSetting);

                    // 페이지 변경 했을 때 이벤트 발생
                    scope.pageChanged = function () {
                        var params = {
                            currentPage: scope.currentPage,
                            offset: (scope.currentPage - 1) * scope.itemsPerPage
                        };
                        scope.$emit(eventConfig.paging.pagingChange, params);
                    };

                }
            };
    }]]
});