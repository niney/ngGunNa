'use strict';

define('common/lib/translate/storageCookie', [], function () {

    return ['$cookieStore', function($cookieStore) {
            return {
                /**
                 * @ngdoc function
                 * @name pascalprecht.translate.$translateCookieStorage#get
                 * @methodOf pascalprecht.translate.$translateCookieStorage
                 *
                 * @description
                 * Returns an item from cookieStorage by given name.
                 *
                 * @param {string} name Item name
                 * @return {string} Value of item name
                 */
                get: function (name) {
                    return $cookieStore.get(name);
                },

                /**
                 * @ngdoc function
                 * @name pascalprecht.translate.$translateCookieStorage#set
                 * @methodOf pascalprecht.translate.$translateCookieStorage
                 *
                 * @description
                 * Sets an item in cookieStorage by given name.
                 *
                 * @deprecated use #put
                 *
                 * @param {string} name Item name
                 * @param {string} value Item value
                 */
                set: function (name, value) {
                    $cookieStore.put(name, value);
                },

                /**
                 * @ngdoc function
                 * @name pascalprecht.translate.$translateCookieStorage#put
                 * @methodOf pascalprecht.translate.$translateCookieStorage
                 *
                 * @description
                 * Sets an item in cookieStorage by given name.
                 *
                 * @param {string} name Item name
                 * @param {string} value Item value
                 */
                put: function (name, value) {
                    $cookieStore.put(name, value);
                }
            }
        }];
});