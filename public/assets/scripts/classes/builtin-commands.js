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
				Session.jamUrl = args[0]
				callback("mounted "+Session.jamUrl);
			} else {
				
				callback("Currently mounted at "+Session.jamUrl);
				
			}
			
		}
		
	}
);

$.Class.extend("CdCommand", 
	{
		key: "cd",
		help: "usage: 'cd articles' and 'cd ..'",
		jamService: {}
	}, 
	{
		init : function(jamService) { 
			this.Class.jamService = jamService; 
		},
		
		execute: function(args, callback) {

			if(args[0] == ".."){
				Session.currentFolder = undefined;
				callback();
			} else {
			
				this.Class.jamService.get(args[0], function(data) {

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
		jamService: {}
	}, 
	{
		init : function(jamService) { 
			this.Class.jamService = jamService; 
		},
		
		execute: function(args, callback) {

			path = Session.currentFolder == undefined ? StringUtil.empty : Session.currentFolder;
			if(path == StringUtil.empty) {
				
				MkDirCommand.jamService.post(args[0], '{"_koda_ref":"_delete"}', function(sdata) {

					if(sdata == "OK") {					
						MkDirCommand.jamService.delete(args[0] + "/_delete", function(ddata) {

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
		jamService: {}  
	}, 
	{
		init : function(jamService) { 
			this.Class.jamService = jamService; 
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
			
				EditCommand.jamService.get(Session.currentEditor.path, function(data) {

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
				
				EditCommand.jamService.post(Session.currentFolder, input, function(data) {

					if(data == "OK") {					
						callback("the item was created");					
					} else {				
						callback("server unavailable or not valid json: ");				
					}

				});	
					
			} else {
				
				EditCommand.jamService.put(Session.currentEditor.path, input, function(data) {

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
		jamService: {}
	}, 
	{
		init : function(jamService) { 
			this.Class.jamService = jamService; 
		},
		
		execute: function(args, callback) {
			
			if(args != undefined && args.length > 0){
				
				callback("wrong number of arguments!");
			
			} else {
				
				var lookup = Session.currentFolder == undefined ? StringUtil.empty : Session.currentFolder;
				Session.history = [];
				this.Class.jamService.get(lookup, function(data) {
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
		jamService: {}
	}, 
	{
		init : function(jamService) { 
			this.Class.jamService = jamService; 
		},
		
		execute: function(args, callback) {

			this.Class.jamService.get(args.toLowerCase(), function(data) {
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
		jamUrl: ''
	}, 
	{
		init : function() { 
			this.Class.jamUrl = Session.jamUrl; 
		},
		
		execute: function(args, callback) {
			
			var lookup = Session.currentFolder == undefined ? StringUtil.empty : Session.currentFolder;
			var url = this.Class.jamUrl + "/" + lookup + "/" +args;
			
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
		jamUrl: ''
	}, 
	{
		init : function() { 
			this.Class.jamUrl = Session.jamUrl; 
		},
		
		execute: function(args, callback) {
			
			var url = this.Class.jamUrl + "/_koda_media";
			
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
		jamService: {}
	}, 
	{
		init : function(jamService) { 
			this.Class.jamService = jamService; 
		},
		
		execute: function(args, callback) {

			var lookup = Session.currentFolder == undefined ? StringUtil.empty : Session.currentFolder;

			this.Class.jamService.get(lookup + "/" +args[0], function(data) {

				callback(JSON.stringify(data, null, 2));
				
			});
			
		}
		
	}
);

$.Class.extend("RemoveCommand", 
	{  
		key: "rm", 
		help: "usage: 'rm [resource]' removes a resource",
		jamService: {}  
	}, 
	{
		init : function(jamService) { 
			
			this.Class.jamService = jamService; 
		
		},
		
		execute: function(args, callback) {			
			
			var lookup = Session.currentFolder == undefined ? args[0] : Session.currentFolder + "/" + args[0];
			
			this.Class.jamService.delete(lookup, function(data) {

				if(data == "OK"){
					callback("the item was deleted");					
				} else{
					callback("failed to delete the item: "+data.toString());
				}
				
			});			
			
		}
		
	}
);