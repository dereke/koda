$.Class.extend("MockCommand", 
	{
		key: "mock"
	}, 
	{
		init : function() {	},
		
		execute: function(args, callback) {
			
			var output = StringUtil.empty;
			
			for (var i = 0; i < args.length; i++) {       
				output += args[i].toString();
			}
			
			callback(output);
			
		}
		
	}
);