require([
		'classes/builtin-commands', 
		'specs/doubles/uiobject-double', 
		'specs/doubles/mock-jamservice',
		], function(){
		
		module("describe mkdir command spec")
		
		test("it should fail when trying to create folder anywhere but root", function() {
		  	// arrange
			var service = new MockJamService(null);
			var mkDirCommand = new MkDirCommand(service);
			Session.currentFolder = "articles";

		  	// act
			mkDirCommand.execute(["something"], function(output) {
				
				equal(output, "at the moment folders can only be greated in root dir");
				Session.currentFolder = undefined;
				
			});
			
		});
		
		test("it should create folder if root", function() {
		  	// arrange
			var service = new MockJamService(null, "OK");
			var mkDirCommand = new MkDirCommand(service);
			Session.currentFolder = undefined;

		  	// act
			mkDirCommand.execute(["something"], function(output) {
				
				equal(output, "folder created");
				
			});
			
		});
				
	});