/*
   ----------------------------------------------------------
	Service 
   ----------------------------------------------------------
*/
	
$.Class.extend("RestService", 
		{}, 
		{
			init : function() {	},

			get: function(path, callback) {

				var location = path != undefined ? path : StringUtil.empty;

				jQuery.ajax({
				    type: "GET",
				    url: Session.kodaUrl+"/"+location + "?" + new Date().getTime(),
				    dataType: "json",
				    success: function(results){
				        callback(results);
				    },
				    error: function(XMLHttpRequest, textStatus, errorThrown){
				        callback(null);
				    }
				});

			},

			delete: function(path, callback) {

				var location = path != undefined ? path : StringUtil.empty;

				jQuery.ajax({
				    type: "DELETE",
				    url: Session.kodaUrl+"/"+location,
				    dataType: "json",
				    success: function(result){
				        callback("OK");
				    },
				    error: function(result){
				        callback(result);
				    }
				});

			},

			put: function(path, resource, callback) {

				var location = path != undefined ? path : StringUtil.empty;

				jQuery.ajax({
				    type: "PUT",
				    url: Session.kodaUrl+"/"+location,
					data: resource,
				    dataType: "json",
				    success: function(result){
				        callback("OK");
				    },
				    error: function(result){
				        if(result.status == "201" || result.status == "200") {
							callback("OK")
						}
						else {
							callback(result.status);
						}
				    }
				});

			},


			post: function(path, resource, callback) {

				var location = path != undefined ? path : StringUtil.empty;

				jQuery.ajax({
				    type: "POST",
				    url: Session.kodaUrl+"/"+location,
					data: resource,
				    dataType: "json",
				    success: function(result){
						callback("OK");
				    },
				    error: function(result){

				        if(result.status == "201" || result.status == "200") {
							callback("OK")
						}
						else {
							callback(result.status);
						}
				    }
				});

			}

		}
	);
	
/*
   ----------------------------------------------------------
	Utils 
   ----------------------------------------------------------
*/ 

$.Class.extend("QueryString", 
{}, 
{
	getItem : function(key) {

	  	key = key.replace(/[\[]/,"\\\[").replace(/[\]]/,"\\\]");
	  	var regex = new RegExp("[\\?&]"+key+"=([^&#]*)");
	  	var qs = regex.exec(window.location.href);

	    if(qs != undefined && qs.length > 0)
			return qs[1];

		return "";

	}
});

$.Class.extend("StringUtil", {

	format: function() {
		  
		var s = arguments[0];
		for (var i = 0; i < arguments.length - 1; i++) {       
			var reg = new RegExp("\\{" + i + "\\}", "gm");             
			s = s.replace(reg, arguments[i + 1]);
		}

		return s;
		
	},
	
	empty: ""
		
}, {});

/*
   ----------------------------------------------------------
	Presenters
   ----------------------------------------------------------
*/

$.Class.extend("ConsolePresenter", 
	{ uiObject: {}, controller: {}, isCtrl: false }, 
	{
		init : function(controller){

			this.Class.controller = controller;
			this.Class.uiObject = $('#console');
		},
		
		attach: function() {
				
			this.Class.uiObject.delegate('.active textarea', 'keyup', this.editorKeyup);
			this.Class.uiObject.delegate('.active textarea', 'keydown', this.editorKeydown);
		},
		
		editorKeyup: function(e) {
			if(e.which == 17) ConsolePresenter.isCtrl=false; // ctrl
		},
		
		editorKeydown: function(e) {
			if (e.which == 9) { // tab
				var self = ConsolePresenter;
			    e.preventDefault();
				var val = Prompt.getInput();
				var autoCompleted = self.controller.autocomplete(val);
				Prompt.writeToInput(autoCompleted);
			
			} else if(!Prompt.multiline && e.which == 13){ //enter
				e.preventDefault();
				val = Prompt.getInput();
				
				if(Prompt.promptInputOverride && Prompt.promptOverrideDelegate) {
					
					Prompt.promptOverrideDelegate(val);
					
				} else {
				
					ConsolePresenter.controller.processLine(val, function(output) {
						Prompt.writeToOutput(output);
					});
				
				}
			} else if(Prompt.multiline && e.which == 17) { // ctrl
				ConsolePresenter.isCtrl=true
			} else if(Prompt.multiline && e.which == 67 && ConsolePresenter.isCtrl == true) { // C
				
				e.preventDefault();
				val = Prompt.getInput();
				
				if(Prompt.promptInputOverride && Prompt.promptOverrideDelegate) {
					
					Prompt.promptOverrideDelegate(val);
					
				} else {
				
					ConsolePresenter.controller.processLine(val, function(output) {
						Prompt.writeToOutput(output);
					});
				
				}
				
			}
		}
		
	}
	
);

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
				cmd.execute([path], function(results){
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
					cmd.execute([path], function(result){});
				});
			}
		},
		
		back: function(e) {
			$('#back-button').remove();
			var self = ExplorerPresenter;
			self.panel.find('ul').hide('slow').remove();
			Window.Presenter.find('');
		},
		
		contextMenuClick : function(action, el, pos) {
			
			var self = Window.Presenter;
			if(action == 'new') {
				self.new(el);
			} else if(action == 'edit') {
				self.edit(el);
			} else if(action == 'delete') {
				self.delete(el);
			}
	
		},
		
		delete : function(item) {
			
			ExplorerPresenter.controller.findCommand('rm', function(cmd) {
				cmd.execute([$(item).find('a').text()], function(result){
					ExplorerPresenter.panel.find('ul').hide('slow').remove();
					Window.Presenter.find($(item).parent().attr('id'));
				});
			});
		
		},
		
		edit : function(item) {
			
			var self = ExplorerPresenter;
			var type = $(item).find('a').attr('class');
			var currentItem = $(item).text();
			if(type == 'collection') {
				Window.Presenter.editDialog(currentItem, false);
			} else {
				Window.Presenter.editDialog(Session.currentFolder + "/" + currentItem, false);
			}
		
		},
		
		new : function(item) {
			
			var self = ExplorerPresenter;
			var type = $(item).find('a').attr('class');
			var currentItem = $(item).text();
			if(type == 'collection') {
				Session.currentFolder = currentItem;
			} 
			
			Window.Presenter.editDialog(Session.currentFolder, true);
		},
		
		editDialog : function(itemPath, isNew){
			
			$("#media-trigger").attr("href", "/editdocument.html?url="+itemPath+"&isnew="+isNew);
			$("#media-trigger").fancybox({
					'transitionIn'	:	'elastic',
					'transitionOut'	:	'elastic',
					'speedIn'		:	600, 
					'speedOut'		:	200, 
					'overlayShow'	:	false,
					'width'			: 	800, 
					'height'		: 	480 
				}).trigger("click");
				
		}
	}
);

/*
   ----------------------------------------------------------
	Console Prompt 
   ----------------------------------------------------------
*/

$.Class.extend("Prompt", 
	{
		writeToInput : function(value) {
			
			var self = $(".active:last"), input;	
			input = self.find('textarea');
			input.val(value);
			
		},
				
		getInput : function() {

			var self = $(".active:last"), input;	
			input = self.find('textarea');
			return input.val();

		},		
		
		writeToOutput : function(value, prompt) {
			
			var currentFolder = Session.currentFolder == undefined ? "home" : Session.currentFolder;
			var promptIndicator = prompt == undefined ? currentFolder : prompt;
			
			var self = $(".active:last"), input, line;				
			var text = $('<pre/>').text(value);
			
			line = self.clone();
			if(text) self.append(text);
			self.removeClass('active').addClass("inactive");
			self.attr('disabled', true);
			self.after( line );
			
			$('.prompt:last').text(promptIndicator + " >");
			$('.active textarea').removeClass().addClass(Prompt.multiline ? "multi" : "single")
			$('.active textarea').focus().val('');
			
		},
		
		multiline: false,
		
		promptInputOverride: false,
		
		promptOverrideDelegate: undefined,
	}, 
	{ init : function() {} }
);

/*
   ----------------------------------------------------------
	Controller 
   ----------------------------------------------------------
*/

$.Class.extend("KodaController", 
	{ commands: [] }, 
	{
		init : function(commands) {
			
			this.Class.commands = commands;
			
		},
				
		autocomplete : function(val){
			
			var line = val.split(' '), returnString = val;
			var lastCommand = line[line.length-1];
			
			$.each(Session.history, function(i, item) {
				
				if(val.indexOf(item) == -1 && item.indexOf(lastCommand) === 0) {
					val += " ";
					returnString = val.replace(lastCommand+" ", item);					
				}
			
			});
			
			return returnString;
				
		},
		
		findCommand: function(val,callback) {
			
			$.each(KodaController.commands, function(index, commandObject) {
				
				if(val == commandObject.Class.key) {
					callback(commandObject);
				}
			
			});
			
		},
		
		processLine : function(val, commandExecuted) {
							
			if ( val == '' ) return;
			var self = this;
				
			var commands = val.split(' & ');
			$.each(commands, function(i, item){
				
				var commandString = item.split(' '), command;
				var commandToExecute = commandString.shift();
				
				self.findCommand(commandToExecute, function(cmd) {
					command = cmd;
					if(command != undefined && command != null) {

						command.execute(commandString, commandExecuted);

					} else {

						commandExecuted("Command not found!");
					}
				});
				
			});
			
		}

	});

	
/*
   ----------------------------------------------------------
	Commands 
   ----------------------------------------------------------
*/

$.Class.extend("MountCommand", 
	{
		key: "mount",
		help: "usage: 'mount http://demo.boxjson.com'"
	}, 
	{
		init : function() { 
		},
		
		execute: function(args, callback) {

			if(args && args.length > 0) {
				Session.kodaUrl = args[0]
				callback("mounted "+Session.kodaUrl);
			} else {
				
				callback("Currently mounted at "+Session.kodaUrl);
				
			}
			
		}
		
	}
);

$.Class.extend("CdCommand", 
	{
		key: "cd",
		help: "usage: 'cd articles' and 'cd ..'",
		restService: {}
	}, 
	{
		init : function(restService) { 
			this.Class.restService = restService; 
		},
		
		execute: function(args, callback) {

			if(args[0] == ".."){
				Session.currentFolder = undefined;
				callback();
			} else {
			
				this.Class.restService.get(args[0], function(data) {

					if(data != undefined && data != null) {
						Session.currentFolder = args[0];	
						callback();			
					} else {
						callback("folder not found!");
					}

				});				
				
			}
			
		}
		
	}
);

$.Class.extend("MkDirCommand", 
	{
		key: "mkdir",
		help: "usage: 'mkdir [dirname]' creates a folder",
		restService: {}
	}, 
	{
		init : function(restService) { 
			this.Class.restService = restService; 
		},
		
		execute: function(args, callback) {

			path = Session.currentFolder == undefined ? StringUtil.empty : Session.currentFolder;
			if(path == StringUtil.empty) {
				
				MkDirCommand.restService.post(args[0], '{"_koda_ref":"_delete"}', function(sdata) {

					if(sdata == "OK") {					
						MkDirCommand.restService.delete(args[0] + "/_delete", function(ddata) {

							if(ddata == "OK"){
								callback("folder created");					
							}

						});					
					} else {				
						callback("folder could not be created");				
					}

				});
			
			} else {
				
				callback("at the moment folders can only be greated in root dir");
				
			}
			
		}
		
	}
);

$.Class.extend("EditCommand", 
	{  
		key: "edit", 
		help: "usage: 'edit [resource]' (will create if not exist)", 
		restService: {}  
	}, 
	{
		init : function(restService) { 
			this.Class.restService = restService; 
		},
		
		execute: function(args, callback) {			
			
			path = Session.currentFolder == undefined ? StringUtil.empty : Session.currentFolder;
			if(path == StringUtil.empty || path.indexOf("_koda_media") != -1) {
				
				callback("cannot create resources in either root or media folder");

			} else {

				Session.currentEditor = {};
				Prompt.multiline = true;
				var editor = this.editor;
				Session.currentEditor.path = path + "/" + args[0];

				Session.currentEditor.callback = callback;
			
				EditCommand.restService.get(Session.currentEditor.path, function(data) {

					Prompt.writeToOutput("--hit CTRL+C when done---", "")
			
					if(data == null) {					
						Prompt.writeToInput('{"_koda_ref":"'+args[0]+'"}')				
						Session.currentEditor.state = "NEW";
					} else {
						Prompt.writeToInput(JSON.stringify(data, null, 2))
						Session.currentEditor.state = "OLD";
					}				
			
					Prompt.promptInputOverride = true;
					Prompt.promptOverrideDelegate = editor;
			
				});
				
			}
			
		},
		
		editor: function(input) {

			Prompt.promptInputOverride = false;
			Prompt.promptOverrideDelegate = undefined;
			Prompt.multiline = false;
			var callback = Session.currentEditor.callback;

			if(Session.currentEditor.state == "NEW") {
				
				EditCommand.restService.post(Session.currentFolder, input, function(data) {

					if(data == "OK") {					
						callback("the item was created");					
					} else {				
						callback("server unavailable or not valid json: ");				
					}

				});	
					
			} else {
				
				EditCommand.restService.put(Session.currentEditor.path, input, function(data) {

					if(data == "OK") {					
						callback("the item was saved");					
					} else {				
						callback("server unavailable or not valid json: ");			
					}

				});
				
			}			

			
		}
		
	}
);

$.Class.extend("HelpCommand", 
	{
		key: "help",
		help: "usage: type 'help' at any time",
		commands: []
	}, 
	{
		init : function(commands) {
		
			if(commands != undefined){
				this.Class.commands = commands;
			} else {
				this.Class.commands = Session.commands;				
			}
			
		},
		
		execute: function(args, callback) {
			
			var output = StringUtil.empty;
			
			$.each(this.Class.commands, function(i, item){
			
				output += StringUtil.format("{0} - {1}\n", item.Class.key, item.Class.help);
				
			});
		
			callback(output);
		}
		
	}
);

$.Class.extend("LsCommand", 
	{
		key: "ls",
		help: "usage: 'ls' in any folder to list resources",
		restService: {}
	}, 
	{
		init : function(restService) { 
			this.Class.restService = restService; 
		},
		
		execute: function(args, callback) {
			
			if(args != undefined && args.length > 0){
				
				callback("wrong number of arguments!");
			
			} else {
				
				var lookup = Session.currentFolder == undefined ? StringUtil.empty : Session.currentFolder;
				Session.history = [];
				this.Class.restService.get(lookup, function(data) {
					var output = StringUtil.empty;
					
					if(data.constructor == Array) {
						$.each(data, function(i, item){
							
							var href = item.href;
							var count = href.split("/").length - 1
							var indicator = count > 1 ? "<FILE>  " : "<DIR>  ";
							output += indicator+item.title + "\n";
							Session.history.push(item.title);
						
						});					
					} else {
						output += "<FILE>  "+data.title + "\n";
						Session.history.push(data.title);
					}
					
					callback(output);

				});
				
			}
			
		}
		
	}
);

$.Class.extend("ListCommand", 
	{
		key: "list",
		help: "usage: 'list' in any folder to list resources as array",
		restService: {}
	}, 
	{
		init : function(restService) { 
			this.Class.restService = restService; 
		},
		
		execute: function(args, callback) {

			this.Class.restService.get(args[0].toLowerCase(), function(data) {
				var output = [];

				if(data.constructor == Array) {
					$.each(data, function(i, item){

						var href = item.href;
						var count = href.split("/").length - 1
						var indicator = count > 1 ? "file" : "collection";
						output.push({ title: item.title, type: indicator});

					});					
				} else {
					output.push({ title: item.title, type: "file"});
				}

				callback(output);

			});
			
		}
		
	}
);

$.Class.extend("OpenCommand", 
	{
		key: "open",
		help: "usage: 'open [resource]' this will open the resource in a window",
		kodaUrl: ''
	}, 
	{
		init : function() { 
			this.Class.kodaUrl = Session.kodaUrl; 
		},
		
		execute: function(args, callback) {
			
			var lookup = Session.currentFolder == undefined ? StringUtil.empty : Session.currentFolder;
			var url = this.Class.kodaUrl + "/" + lookup + "/" +args[0];
			
			$("#media-trigger").attr("href", url.toLowerCase());
			$("#media-trigger").fancybox({
					'transitionIn'	:	'elastic',
					'transitionOut'	:	'elastic',
					'speedIn'		:	600, 
					'speedOut'		:	200, 
					'overlayShow'	:	false,
					'width'			: 	800, 
					'height'		: 	600 
				}).trigger("click");
				
			$('#fancybox-frame').addClass('prettyprint');
			callback("opening...");				
						
		}
		
	}
);

$.Class.extend("UploadCommand", 
	{
		key: "upload",
		help: "usage: 'upload' this will open the upload manager in a window and store your media in the _koda_media folder",
		kodaUrl: ''
	}, 
	{
		init : function() { 
			this.Class.kodaUrl = Session.kodaUrl; 
		},
		
		execute: function(args, callback) {
			
			var url = this.Class.kodaUrl + "/_koda_media";
			
			$("#media-trigger").attr("href", "/media_poster.html?url="+url);
			$("#media-trigger").fancybox({
					'transitionIn'	:	'elastic',
					'transitionOut'	:	'elastic',
					'speedIn'		:	600, 
					'speedOut'		:	200, 
					'overlayShow'	:	false,
					'width'			: 	800, 
					'height'		: 	480 
				}).trigger("click");
			callback("opening...");				
						
		}
		
	}
);

$.Class.extend("PeekCommand", 
	{
		key: "peek",
		help: "usage: 'peek [resource]' will show contents if json",
		restService: {}
	}, 
	{
		init : function(restService) { 
			this.Class.restService = restService; 
		},
		
		execute: function(args, callback) {

			var lookup = Session.currentFolder == undefined ? StringUtil.empty : Session.currentFolder;

			this.Class.restService.get(lookup + "/" +args[0], function(data) {

				callback(JSON.stringify(data, null, 2));
				
			});
			
		}
		
	}
);

$.Class.extend("RemoveCommand", 
	{  
		key: "rm", 
		help: "usage: 'rm [resource]' removes a resource",
		restService: {}  
	}, 
	{
		init : function(restService) { 
			
			this.Class.restService = restService; 
		
		},
		
		execute: function(args, callback) {			
			
			console.log(args);
			var lookup = Session.currentFolder == undefined ? args[0] : Session.currentFolder + "/" + args[0];
			
			this.Class.restService.delete(lookup.toLowerCase(), function(data) {

				if(data == "OK"){
					callback("the item was deleted");					
				} else{
					callback("failed to delete the item: "+data.toString());
				}
				
			});			
			
		}
		
	}
);

$.Class.extend("SaveCommand",
	{
		key: "save",
		help: 'not for use in console'
	},
	{
		init : function(restService) { 
			
			this.Class.restService = restService; 
		
		},
		
		execute: function(args, callback) {			
			
			if(args == undefined || args.length < 2){
				callback("wrong number of arguments!");
			}
				
			var lookup = Session.currentFolder == undefined ? args[0] : Session.currentFolder + "/" + args[0];
			
			this.Class.restService.put(lookup, args[1], function(data) {

				if(data == "OK") {					
					callback("the item was saved");					
				} else {				
					callback("server unavailable or not valid json: ");			
				}

			});	
			
		}
	}
);

$.Class.extend("NewCommand",
	{
		key: "new",
		help: 'not for use in console'
	},
	{
		init : function(restService) { 
			
			this.Class.restService = restService; 
		
		},
		
		execute: function(args, callback) {			
			
			if(args == undefined || args.length < 2){	
				callback("wrong number of arguments!");
			}
			
			var lookup = Session.currentFolder == undefined ? args[0] : Session.currentFolder + "/" + args[0];
			
			this.Class.restService.post(lookup, args[1], function(data) {

				if(data == "OK") {					
					callback("the item was created");					
				} else {				
					callback("server unavailable or not valid json: ");				
				}

			});		
			
		}
	}
);

$.Class.extend("Session", {history:[]}, {});

/* 

	Entries
	
*/

$.Class.extend("Explorer", {}, {
	init: function(currentUrl) {
		var url = currentUrl;
		var arr = url.split("/");
		var result = arr[0] + "//" + arr[2]

		Session.kodaUrl = result;

		var service = new RestService();
		var commands = Session.commands = [];

		commands.push(new HelpCommand());
		commands.push(new MountCommand());
		commands.push(new PeekCommand(service));
		commands.push(new CdCommand(service));
		commands.push(new ListCommand(service));
		commands.push(new EditCommand(service));
		commands.push(new RemoveCommand(service));
		commands.push(new OpenCommand());
		commands.push(new MkDirCommand(service));
		commands.push(new UploadCommand());

		var controller = new KodaController(commands);
		Window.Presenter = new ExplorerPresenter(controller);
		Window.Presenter.attach();
	}
});

$.Class.extend("Console", {}, {
	init: function(currentUrl) {
		var url = currentUrl;
		var arr = url.split("/");
		var result = arr[0] + "//" + arr[2]

		Session.kodaUrl = result;

		var service = new RestService();
		var commands = Session.commands = [];

		commands.push(new HelpCommand());
		commands.push(new MountCommand());
		commands.push(new PeekCommand(service));
		commands.push(new CdCommand(service));
		commands.push(new LsCommand(service));
		commands.push(new EditCommand(service));
		commands.push(new RemoveCommand(service));
		commands.push(new OpenCommand());
		commands.push(new MkDirCommand(service));
		commands.push(new UploadCommand());

		var controller = new KodaController(commands);
		Window.Presenter = new ConsolePresenter(controller);
		Window.Presenter.attach();
	}
});

$.Class.extend("Editor", {}, {
	init: function(currentUrl, isNew) {
		alert(currentUrl);
		alert(isNew);
	}
});

/* Static Void Main */

(function() {
	if(Window.Application == "Explorer") {
		new Explorer(window.location.href);
	} else if(Window.Application == "Console") {
		new Console(window.location.href);
	} else if(Window.Application == "Editor") {
		var queryString = new QueryString();
		new Editor(queryString.getItem("url"), queryString.getItem("isnew"));
	}
})()