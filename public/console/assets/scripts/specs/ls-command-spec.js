require([
		'classes/builtin-commands', 
		'specs/doubles/uiobject-double', 
		'specs/doubles/mock-jamservice'
		], function(){
		
		module("describe ls command spec")
		
		test("it should write return items to the console if list", function() {
		  	
			// arrange
			var items = [{title:'item1', href:"/articles/item2"}, {title:'item2', href:"/articles/item2"}];
			var service = new MockJamService(items);
			var lsCommand = new LsCommand(service);
			Session.currentFolder = "articles";
			
		  	// act
			lsCommand.execute(null, function(output){
				
				equal(output, "<FILE>  item1\n<FILE>  item2\n");
				
			});
			
			
		});
		
		test("it should write the same item to console if resource", function() {
		  	
			// arrange
			var items = {title:'item1', href:"/articles/item1"};
			var service = new MockJamService(items);
			var lsCommand = new LsCommand(service);
			Session.currentFolder = "articles";
			
		  	// act
			lsCommand.execute(null, function(output){
				
				equal(output, "<FILE>  item1\n");
				
			});

		});
		
		test("it should write error when arguments given", function() {
		  	
			// arrange
			var items = {title:'item1'};
			var service = new MockJamService(items);
			var lsCommand = new LsCommand(service);
			Session.currentFolder = "articles";
			
		  	// act
			lsCommand.execute(["something", "something"], function(output){
				
				equal(output, "wrong number of arguments!");
			
			});
			
		});
				
	});