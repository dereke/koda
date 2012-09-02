$.Class.extend("Session", {history:[]}, {});

(function(){
	var url = window.location.href
	var arr = url.split("/");
	var result = arr[0] + "//" + arr[2]
	
	Session.jamUrl = result;
	
	var service = new JamService();
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

	var controller = new JamController(commands);
	
	controller.findCommand("ls", function(command){
		command.execute(undefined, function(result){
			console.log(result);
			controller.findCommand("upload", function(command){
				command.execute(undefined, function(result){
					console.log(result);
				});
			});
		});
	});
	
})();

