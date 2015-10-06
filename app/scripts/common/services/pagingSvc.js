'use strict';

define('common/services/pagingSvc', [], function () {
	return ['pagingSvc', ['basicConfig', 'eventConfig',function(basicConfig, eventConfig) {
		var pagingSvc = {
			setLatestResHeader : function(latestResHeader) {
				this.responseHeadersFunc = latestResHeader;
				this.responseHeadersFunc().getParam = function(value, def) {
					def  = def || 0;
					return this[value] || def;
				};
			},
			setState: function(state) {
				this.state = state;
			},
			getState: function() {
				return this.state;
			},
			setStateParams: function(stateParams) {
				this.stateParams = stateParams;
			},
			getStateParams: function() {
				return this.stateParams;
			},
			getParam: function(value, def) {
				def  = def || 0;
				return this.stateParams[value] || def;
			},
			getLatestResHeader : function() {
				return this.responseHeadersFunc();
			},
			getHeaderResourceJSON : function() {
				// x-resource-data
				return eval("("+this.getLatestResHeader()[basicConfig.headerResourceKey]+")");
			},
			getHeaderResourceValue : function(key, def) {
				def  = def || 0;
				return this.getHeaderResourceJSON()[key] || 0;
			},
			pagingSettting : function(rootScope, scope) {
				this.totalItems = this.getHeaderResourceValue('totalCount');
				this.currentPage = this.getParam('currentPage', 1);
				this.itemsPerPage = this.getParam('itemsPerPage', 10);
				this.currentTotalCount = this.totalItems - ((this.currentPage-1) * this.itemsPerPage);
				scope.currentTotalCount = this.currentTotalCount;
				rootScope.$emit(eventConfig.paging.pagingSetting, {
					'totalItems': this.totalItems,
					'currentPage': this.currentPage,
					'itemsPerPage': this.itemsPerPage,
					'currentTotalCount': this.currentTotalCount
				});
			},
			pagingEvent : function(rootScope, scope, dest, goState) {

				// paging
				// dest 가 바뀌면 pagingSettting 을 해야 한다
				var unbindWatch = scope.$watch(
					dest,
					//'categories',
					function(newValue, oldValue) {
						pagingSvc.pagingSettting(rootScope, scope);
					}
				);
				scope.$on('$destroy', unbindWatch);
				var unbindPagingChange = rootScope.$on(eventConfig.paging.pagingChange, function(e, params) {
					goState = goState || pagingSvc.state.current.name;
					pagingSvc.state.go(goState, params, {reload: true});
				});
				scope.$on('$destroy', unbindPagingChange);
			},
			queryLoad: function(resource, stateParams, state, callback) {
				if(angular.isFunction(state))
					callback = state;
				else if(state != undefined)
					pagingSvc.setState(state);

				stateParams.currentPage = stateParams.currentPage || 1;
				stateParams.offset = stateParams.offset || 0;
				stateParams.sort = stateParams.sort || 'id';
				stateParams.order = stateParams.order || 'desc';
				var result = resource.query({
					currentPage : stateParams.currentPage,
					offset : stateParams.offset,
					sort : stateParams.sort,
					order : stateParams.order,
					qt: stateParams.qt,
					q : stateParams.q

				},function(obj, responseHeaders) {
					pagingSvc.setStateParams(stateParams);
					pagingSvc.setLatestResHeader(responseHeaders);
					if(callback != undefined)
						callback(obj, responseHeaders)
				});
				return result;
			}
		}
		return pagingSvc;
	}]];
});
