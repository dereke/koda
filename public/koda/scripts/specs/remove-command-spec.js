require([
		'specs/doubles/uiobject-double', 
		'specs/doubles/mock-jamservice',
		'classes/builtin-commands'], function(){
		
		module("describe remove command spec")
		
		test("it should display success when OK result", function() {
		  	
			// arrange
			var service = new MockJamService(undefined, "OK");
			var removeCommand = new RemoveCommand(service);

		  	// act
			removeCommand.execute(["somefile"], function(output){

				equal(output, "the item was deleted");
				
			});

		});
		
		test("it should display failure when non-OK result", function() {
		  	
			// arrange
			var service = new MockJamService(undefined, "failure");
			var removeCommand = new RemoveCommand(service);

		  	// act
			removeCommand.execute(["somefile"], function(output){

				ok(output.indexOf("failed to delete the item") != -1);
				
			});
			
		});
	});