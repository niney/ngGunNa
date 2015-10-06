'use strict';

define('common/config/navConfig', [], function () {
    return {
        // 제품 그룹
        'master1': {
            getTitle: function () {
                return '홈';
            },
            main : {
                getTitle: function () {
                    return '메인'
                },
                getEngTitle: function() {
                    return 'main';
                }
            },
            'patient': {
                getTitle: function () {
                  return '환자';
                },
                'create': {
                    getTitle: function () {
                        return '등록';
                    },
                    getEngTitle: function() {
                        return 'registration';
                    }
                },
                'receipt': {
                    getTitle: function () {
                        return '접수';
                    },
                    getEngTitle: function() {
                        return 'receipt';
                    }
                }
            }
        }
    }
});