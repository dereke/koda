$.Class.extend("JamController", 
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
			
			$.each(JamController.commands, function(index, commandObject) {
				
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