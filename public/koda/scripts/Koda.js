$.fn.spin = function(opts) {
  this.each(function() {
    var $this = $(this),
        data = $this.data();

    if (data.spinner) {
      data.spinner.stop();
      delete data.spinner;
    }
    if (opts !== false) {
      data.spinner = new Spinner($.extend({color: $this.css('color')}, opts)).spin(this);
    }
  });
  return this;
};

var spinnerOpts = {
  lines: 9, // The number of lines to draw
  length: 0, // The length of each line
  width: 5, // The line thickness
  radius: 10, // The radius of the inner circle
  corners: 0.9, // Corner roundness (0..1)
  rotate: 0, // The rotation offset
  color: '#000', // #rgb or #rrggbb
  speed: 1.2, // Rounds per second
  trail: 30, // Afterglow percentage
  shadow: false, // Whether to render a shadow
  hwaccel: false, // Whether to use hardware acceleration
  className: 'spinner', // The CSS class to assign to the spinner
  zIndex: 2e9, // The z-index (defaults to 2000000000)
  top: 'auto', // Top position relative to parent in px
  left: 'auto' // Left position relative to parent in px
};

/*
   ----------------------------------------------------------
	Service 
   ----------------------------------------------------------
*/
	
$.Class.extend("RestService", 
		{}, 
		{
			init : function() {	},
			
			getError : function(error) {
				if(error.status == 405){
					return 'You were not allowed to perform this action!'
				}
				
				return error.statusText;
			},

			get: function(path, callback) {

				var location = path != undefined ? path : StringUtil.empty;
				self = this;

				jQuery.ajax({
				    type: "GET",
				    url: Session.kodaUrl+"/"+location + "?include=false&" + new Date().getTime(),
				    dataType: "json",
				    success: function(results){
				        callback(results);
				    },
				    error: function(XMLHttpRequest, textStatus, errorThrown){
				        callback({error: self.getError(XMLHttpRequest), code: XMLHttpRequest.status});
				    }
				});

			},
			
			getExternal: function(path, callback) {
				self = this;
				
				jQuery.ajax({
				    type: "GET",
				    url: path + "?" + new Date().getTime(),
				    dataType: "json",
				    success: function(results){
				        callback(results);
				    },
				    error: function(XMLHttpRequest, textStatus, errorThrown){
				        callback({error: self.getError(XMLHttpRequest), code: XMLHttpRequest.status});
				    }
				});

			},

			delete: function(path, callback) {

				var location = path != undefined ? path : StringUtil.empty;
				self = this;				

				jQuery.ajax({
				    type: "DELETE",
				    url: Session.kodaUrl+"/"+location,
				    dataType: "json",
				    success: function(result){
				        callback("OK");
				    },
				    error: function(XMLHttpRequest){
				        callback({error: self.getError(XMLHttpRequest), code: XMLHttpRequest.status});
				    }
				});

			},

			put: function(path, resource, callback) {

				var location = path != undefined ? path : StringUtil.empty;
				self = this;
				
				jQuery.ajax({
				    type: "PUT",
				    url: Session.kodaUrl+"/"+location,
					data: resource,
				    dataType: "json",
				    success: function(result){
				        callback("OK");
				    },
				    error: function(XMLHttpRequest){
				        if(XMLHttpRequest.status == "201" || XMLHttpRequest.status == "200") {
							callback("OK")
						}
						else {
							callback({error: self.getError(XMLHttpRequest), code: XMLHttpRequest.status});
						}
				    }
				});

			},


			post: function(path, resource, callback) {

				var location = path != undefined ? path : StringUtil.empty;
				self = this;
				
				jQuery.ajax({
				    type: "POST",
				    url: Session.kodaUrl+"/"+location,
					data: resource,
				    dataType: "json",
				    success: function(result){
						callback("OK");
				    },
				    error: function(XMLHttpRequest){

				        if(XMLHttpRequest.status == "201" || XMLHttpRequest.status == "200") {
							callback("OK")
						}
						else {
							callback({error: self.getError(XMLHttpRequest), code: XMLHttpRequest.status});
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
		init : function(controller, kodaTypes){

			this.Class.controller = controller;
			this.Class.panel = $('#explorer-panel');
			this.Class.panel.delegate('li', 'click', this.selectItem);
			this.Class.kodaTypes = kodaTypes;
		},
		
		toggleRoot: function(root) {
			if(root){
				$('.allowed-in-root').show();
				$('.allowed-in-collection').hide();
			} else {
				$('.allowed-in-root').hide();
				$('.allowed-in-collection').show();
			}
			
			// rebind events
			$('.kodaType a.new').unbind('click');
			$('.kodaType a.new').click(this.new);
		},
		
		showInfo : function(message){	
			$('#status-text').text(message);
			$('#status-text').addClass('alert alert-warning');
			$('#status-text').show().fadeOut(7000);
		},
		
		attach: function() {
			
			var self = this;
			
			$.each(this.Class.kodaTypes, function(i, group){
				
				if(group.admin_users && !Window.current_user.isadmin) {
					return;
				}
				var header = '<li class="nav-header">'+group.title+'</li>'
				$(header).appendTo('ul.nav-list')
				$.each(group.types, function(i, kodaType){
					var li = $('<li class="kodaType allowed-in-'+kodaType.allowedin+'"></li>');
					var a_img = '<img src="'+kodaType.icon+'" class="img-icon" /><a class="new" data-editor-url="'+kodaType.editor+'" data-type-url="'+kodaType.type+'" title="'+kodaType.description+'">'+kodaType.title+'</a>'
					$(a_img).appendTo(li);
					$(li).appendTo('ul.nav-list');
				});				
			});
			
			$('.navbar-link').click(function(evt){
				Session.currentFolder = 'users';
				self.edit($(this).text(), 'file');
			});
			
			this.find('');
			this.toggleRoot(true);
		},
		
		find: function(path) {	
			
			var self = this;
			var spinner = $('#spinner').spin(spinnerOpts);
			self.Class.controller.findCommand('list', function(cmd) {
				cmd.execute([path], function(results){
					$('#spinner').data().spinner.stop();
					if(results.error){
						self.showInfo(results.error);
						return;
					}
					
					var list = $('<ul class="explorer-items"/>').attr('id', path);
					$.each(results, function(i, item) {

						if(item.id.indexOf('_koda_media') == -1 && item.id.indexOf('objectlabs-system') == -1) {
														
							var listItem = $('<li class="well" id="'+item.id+'"/>');
							var link = $('<a id="'+item.id+'"/>').text(item.name).addClass(item.type);
							
							if(item.type != "collection"){
								self.findType(item._koda_type, function(kodaType){
									if(kodaType != undefined) {
										var img = $('<img />').attr('src', kodaType.icon);
										listItem.append(img);
									}
								});
							}
							
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
		
		findType : function(type, callback){
			
			var self = this;
			
			$.each(self.Class.kodaTypes, function(i, item){
				$.each(item.types, function(i, kodaType){
					if(kodaType.type == type) {
						callback(kodaType);
					}
				})
			})
			
			return callback(undefined);
			
		},
		
		toTitleCase: function(str) {
			
		    return str.replace(/(?:^|\s)\w/g, function(match) {
		        return match.toUpperCase();
		    });
		
		},
		
		selectItem: function(e) {
			
			var self = Window.Presenter;
			var type = $(this).find('a').attr('class');
			var currentItem = $(this).find('a').attr('id');
			
			if(type == 'collection') {
				$('#back-button').remove();
				var backButton = $('<div id="back-button" class="well"><a>Back</a></div>').appendTo(self.Class.panel);
				backButton.click(self.back);
				self.Class.panel.find('ul').remove();
				Session.currentFolder = currentItem;
				self.find(currentItem);
				self.toggleRoot(false);	
			} else {
				self.edit(currentItem, type);
			}
			
		},
		
		refresh : function(collection){
			
			var self = Window.Presenter;
			$('#back-button').remove();
			if(collection == undefined || collection == '') {
				Session.currentFolder = undefined;
				self.Class.panel.find('ul').remove();
				self.find('');
				self.toggleRoot(true);
			} else {
				var backButton = $('<div id="back-button" class="well"><a>Back</a></div>').appendTo(self.Class.panel);
				backButton.click(self.back);
				self.Class.panel.find('ul').remove();
				Session.currentFolder = collection;
				self.find(collection);		
				self.toggleRoot(false);		
			}
		},
		
		back: function(e) {
			
			$('#back-button').remove();
			var self = Window.Presenter;
			Session.currentFolder = undefined;
			self.Class.panel.find('ul').hide('slow').remove();
			self.find('');
			self.toggleRoot(true);
			
		},
		
		contextMenuClick : function(action, el, pos) {
			
			var self = Window.Presenter;
			if(action == 'edit') {
				var type = $(el).find('a').attr('class');
				var currentItem = $(el).find('a').attr('id');				
				self.edit(currentItem, type);
			} else if(action == 'delete') {
				self.delete(el);
			}
	
		},
		
		delete : function(item) {
			
			var self = Window.Presenter;
			
			self.Class.controller.findCommand('rm', function(cmd) {
				cmd.execute([$(item).find('a').attr('id')], function(result){
					if(result.error){
						self.showInfo(result.error);
						return;
					}
					self.Class.panel.find('ul').hide('slow').remove();
					self.find($(item).parent().attr('id'));
				});
			});
		
		},
		
		edit : function(ref, type) {
			
			var self = Window.Presenter;
			
			var currentItem = ref;
			
			if(type == 'collection') {
				self.editDialog(currentItem, "collection", function(item) {
					self.refresh(Session.currentFolder);
				});
			} else {
				self.editDialog(Session.currentFolder + "/" + currentItem, "document", function(item) {
					self.refresh(Session.currentFolder);
				});
			}
			
		},
		
		new : function(item) {
			
			var self = Window.Presenter;
			var editorUrl = $(this).data('editor-url');
			var typeUrl = $(this).data('type-url');
			
			self.launchEditor(editorUrl, typeUrl, Session.currentFolder, true, function(item) {
				self.refresh(item);
			});
			
		},
		
		editDialog : function(itemUrl, type, callback){
			
			var self = Window.Presenter;
			
			if(type=="collection"){
				self.launchEditor('/koda/koda-editors/collection-editor.html', '', itemUrl, false, callback);
			} else {
				self.Class.controller.findCommand('get', function(cmd) {
					cmd.execute([itemUrl], function(result) {
						if('_koda_editor' in result) {
							self.launchEditor(result._koda_editor, result._koda_type, itemUrl, false, callback);
						} else {
							self.launchEditor('/koda/koda-editors/json-editor.html', '', itemUrl, false, callback);
						}
					});
				});
			}
			 	
		},
		
		launchEditor: function(base, typeUrl, itemUrl, isNew, callback) {
			
			var fullUrl = base + "?url="+itemUrl+"&kodatype="+typeUrl+"&isnew="+isNew+"&date=" + new Date().getTime();

			$("#media-trigger").attr("href", fullUrl);
			$("#media-trigger").fancybox({
					'transitionIn'	:	'elastic',
					'transitionOut'	:	'elastic',
					'speedIn'		:	300, 
					'speedOut'		:	100, 
					'overlayShow'	:	true,
					'width'			: 	800, 
					'height'		: 	680,
					onClosed : function() {
						callback(itemUrl);
					}
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
			
			$.each(this.Class.commands, function(index, commandObject) {
				
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
				
				MkDirCommand.restService.post(args[0], '{"alias":"_delete"}', function(sdata) {

					if(sdata == "OK") {					
						MkDirCommand.restService.delete(args[0] + "/_delete", function(ddata) {

							if(ddata == "OK"){
								callback("folder created");					
							}

						});					
					} else {				
						callback("folder could not be created, "+sdata);				
					}

				});
			
			} else {
				
				callback("at the moment folders can only be created in root dir");
				
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
			
				this.Class.restService.get(Session.currentEditor.path, function(data) {

					Prompt.writeToOutput("--hit CTRL+C when done---", "")
			
					if(data == null) {					
						Prompt.writeToInput('{"alias":"'+args[0]+'"}')				
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
							var indicator = count > 2 ? "<FILE>  " : "<DIR>  ";
							output += indicator+item.alias + "\n";
							Session.history.push(item.alias);
						
						});					
					} else {
						output += "<FILE>  "+data.alias + "\n";
						Session.history.push(data.alias);
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

				if(data.error){
					callback(data);
					return;
				}
				var output = [];

				if(data.constructor == Array) {
					$.each(data, function(i, item){
						var href = item.href;
						var count = href.split("/").length - 1
						var indicator = count > 2 ? "file" : "collection";
						var name = item.name ? item.name : item.title
						output.push({ id: item.alias, name : name, _koda_type : item._koda_type, type: indicator});

					});					
				} else {
					var name = item.name ? item.name : item.title
					output.push({ id: data.alias, name : name, _koda_type : data._koda_type, type: 'file'});
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

$.Class.extend("GetCommand", 
	{
		key: "get",
		help: "view: not for use with console",
		restService: {}
	}, 
	{
		init : function(restService) { 
			this.Class.restService = restService; 
		},
		
		execute: function(args, callback) {

			this.Class.restService.get(args[0].toLowerCase(), function(data) {

				callback(data);
				
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
			
			var lookup = Session.currentFolder == undefined ? args[0] : Session.currentFolder + "/" + args[0];
			
			this.Class.restService.delete(lookup.toLowerCase(), function(data) {

				if(data == "OK"){
					callback("the item was deleted");					
				} else{
					callback(data);
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
		var result = arr[0] + "//" + arr[2] + '/api'

		Session.kodaUrl = result;

		var service = new RestService();
		var commands = Session.commands = [];
		commands.push(new CdCommand(service));
		commands.push(new ListCommand(service));
		commands.push(new RemoveCommand(service));
		commands.push(new OpenCommand());
		commands.push(new MkDirCommand(service));
		commands.push(new GetCommand(service));
		
		service.getExternal('/session/current_user', function(user){
			
			Window.current_user = user;
			
			service.getExternal('/koda/koda-types/_type_registration.js?23423442', function(data){
				var controller = new KodaController(commands);
				Window.Presenter = new ExplorerPresenter(controller, data);
				Window.Presenter.attach();	
			})
			
		});
	}
});

$.Class.extend("Console", {}, {
	init: function(currentUrl) {
		var url = currentUrl;
		var arr = url.split("/");
		var result = arr[0] + "//" + arr[2] + '/api'

		Session.kodaUrl = result;

		var service = new RestService();
		var commands = Session.commands = [];

		commands.push(new HelpCommand());
		commands.push(new PeekCommand(service));
		commands.push(new CdCommand(service));
		commands.push(new LsCommand(service));
		commands.push(new EditCommand(service));
		commands.push(new RemoveCommand(service));
		commands.push(new OpenCommand());
		commands.push(new MkDirCommand(service));
		
		var controller = new KodaController(commands);
		Window.Presenter = new ConsolePresenter(controller);
		Window.Presenter.attach();
	}
});

/* Static Void Main */

(function() {
	if(Window.Application == "Explorer") {
		new Explorer(window.location.href);
	} else if(Window.Application == "Console") {
		new Console(window.location.href);
	}
})()