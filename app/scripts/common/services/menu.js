'use strict';

define('common/services/menu', [], function () {
	return ['menu', ['$rootScope', '$location','demoConfig', function($rootScope, $location, demoConfig) {
		var sections = [{
			name: 'Getting Started',
			url: '/getting-started',
			type: 'link'
		}];

		var demoDocs = [];
		angular.forEach(demoConfig, function(componentDemos) {
			demoDocs.push({
				name: componentDemos.label,
				url: componentDemos.url
			});
		});

		sections.push({
			name: 'Demos',
			pages: demoDocs.sort(sortByName),
			type: 'toggle'
		});

		/*var docsByModule = {};
		var apiDocs = {};
		menuConfig.forEach(function(component) {
			component.docs.forEach(function(doc) {
				if (angular.isDefined(doc.private)) return;
				apiDocs[doc.type] = apiDocs[doc.type] || [];
				apiDocs[doc.type].push(doc);

				docsByModule[doc.module] = docsByModule[doc.module] || [];
				docsByModule[doc.module].push(doc);
			});
		});*/

		//console.log(config);

		function sortByName(a,b) {
			return a.name < b.name ? -1 : 1;
		}

		var self;

		var onLocationChange = function() {
			var path = $location.path();
			var matchPage = function(section, page) {
				if (path === page.url) {
					self.selectSection(section);
					self.selectPage(section, page);
				}
			};
			sections.forEach(function(section) {
				if(section.children) {
					// matches nested section toggles, such as API or Customization
					section.children.forEach(function(childSection){
						if(childSection.pages){
							childSection.pages.forEach(function(page){
								matchPage(childSection, page);
							});
						}
					});
				}
				else if(section.pages) {
					// matches top-level section toggles, such as Demos
					section.pages.forEach(function(page) {
						matchPage(section, page);
					});
				}
				else if (section.type === 'link') {
					// matches top-level links, such as "Getting Started"
					matchPage(section, section);
				}
			});
		};

		$rootScope.$on('$locationChangeSuccess', onLocationChange);

		return self = {
			sections: sections,
			isPageSelected: function(page) {
				return self.currentPage === page;
			},
			isSectionSelected: function(section) {
				return self.openedSection === section;
			},
			toggleSelectSection: function(section) {
				self.openedSection = (self.openedSection === section ? null : section);
			},
			selectSection: function(section) {
				self.openedSection = section;
			},
			selectPage: function(section, page) {
				self.currentSection = section;
				self.currentPage = page;
			}
		}
	}]]
});
