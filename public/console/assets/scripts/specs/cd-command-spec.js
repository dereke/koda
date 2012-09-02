require([
		'classes/builtin-commands', 
		'specs/doubles/uiobject-double', 
		'specs/doubles/mock-jamservice'
		], function(){
		
		module("describe cd command spec")
		
		test("it should write not found to the console if resource", function() {
		  	
			// arrange
			var items = [{href:'http://something.com'}, {href:'http://something.com'}];
			var service = new MockJamService(items);
			var cdCommand = new CdCommand(service);

		  	// act
			cdCommand.execute(["articles"], function(){});
			
			equal(Session.currentFolder, "articles");
			
		});
		
		test("it should write folder not found if result undefined", function() {
		  	// arrange
			var service = new MockJamService(undefined);
			var cdCommand = new CdCommand(service);

		  	// act
			cdCommand.execute(["doesnotexist"], function(output){
				
				equal(output, "folder not found!");
				
			});
			
		});
		
		test("it should write folder not found if result null", function() {
		  	// arrange
			var service = new MockJamService(null);
			var cdCommand = new CdCommand(service);

		  	// act
			cdCommand.execute(["doesnotexist"], function(output){
				
				equal(output, "folder not found!");
				
			});
			
		});
				
	});