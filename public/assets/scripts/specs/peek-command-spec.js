require([
		'specs/doubles/uiobject-double', 
		'specs/doubles/mock-jamservice'], function(){
					
		module("describe peek command spec")
		
		test("it should write return json to the console if resource", function() {
		  	
			// arrange
			var items = {href:'http://something.com', title:'something'};
			var service = new MockJamService(items);
			var peekCommand = new PeekCommand(service);
			Session.currentFolder = "articles";
			
		  	// act
			peekCommand.execute(["1"], function(output){
				
				equal(output, "{\n  \"href\": \"http://something.com\",\n  \"title\": \"something\"\n}");
				
			});
			
		});
	
	});