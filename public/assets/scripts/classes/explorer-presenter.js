$.Class.extend("ExplorerPresenter", 
	{ panel: {}, kodaTypes:{}, controller: {}, isCtrl: false }, 
	{
		init : function(controller){

			this.Class.controller = controller;
			this.Class.panel = $('#explorer-panel');
			this.Class.kodaTypes = $('.kodaType');
			this.Class.panel.delegate('li', 'click', this.selectItem);
		},
		
		attach: function() {
			this.find('');
		},
		
		find: function(path) {	
			var self = this;
			
			self.Class.controller.findCommand('list', function(cmd) {
				cmd.execute(path, function(results){
					var list = $('<ul/>').attr('id', path);
					$.each(results, function(i, item) {
						if(item.title.indexOf('_koda_media') == -1) {
							var listItem = $('<li />').attr('id', item.title);
							var link = $('<a />').text(self.toTitleCase(item.title)).addClass(item.type);
							listItem.append(link).appendTo(list);
							$(listItem).contextMenu({
								menu : 'Actions'
							}, self.contextMenuClick);
						}
					});
					list.appendTo(self.Class.panel);
				});
			});
		},
		
		toTitleCase: function(str) {
		    return str.replace(/(?:^|\s)\w/g, function(match) {
		        return match.toUpperCase();
		    });
		},
		
		selectItem: function(e) {
			var self = ExplorerPresenter;
			var type = $(this).find('a').attr('class');
			var currentItem = $(this).text();
			
			console.log(type);
			if(type == 'collection') {
				$('#back-button').remove();
				var backButton = $('<div id="back-button"><a>Back</a></div>').appendTo(self.panel);
				backButton.click(Window.Presenter.back);
				self.panel.find('ul').remove();
				Session.currentFolder = currentItem;
				Window.Presenter.find(currentItem);				
			} else {
				var path = currentItem;
				self.controller.findCommand('open', function(cmd) {
					cmd.execute(path, function(result){
						console.log('opened');
					});
				});
			}
		},
		
		back: function(e) {
			console.log('here');
			$('#back-button').remove();
			var self = ExplorerPresenter;
			self.panel.find('ul').hide('slow').remove();
			Window.Presenter.find('');
		},
		
		contextMenuClick : function(action, el, pos) {
			var self = Window.Presenter;
			console.log(action);
			if(action == 'new') {
				self.new(el);
			} else if(action == 'edit') {
				self.edit(el);
			} else if(action == 'delete') {
				self.delete(el);
			}
		},
		
		delete : function(item) {
			console.log(item);
			ExplorerPresenter.controller.findCommand('rm', function(cmd) {
				cmd.execute($(item).find('a').text(), function(result){
					ExplorerPresenter.panel.find('ul').hide('slow').remove();
					Window.Presenter.find($(item).parent().attr('id'));
				});
			});
		},
		
		edit : function(item) {
			
		},
		
		new : function(item) {
			
		}
	}
);