require([
		'specs/doubles/uiobject-double', 
		'specs/doubles/mock-jamservice',
		'specs/doubles/mock-prompt',
		'classes/builtin-commands'], function(){
		
		module("describe edit command spec")
		
		test("it should create session object which indicates new state", function() {
			// arrange
			var service = new MockJamService(undefined, "OK");
			var editCommand = new EditCommand(service);
			Session.currentFolder = "article";

		  	// act
			editCommand.execute(["somefile"], function(){});
			equal(Session.currentEditor.state, "NEW")
		});
		
		test("it should create session object which indicates old state", function() {
			// arrange
			var service = new MockJamService("{something}", "OK");
			var editCommand = new EditCommand(service);
			Session.currentFolder = "article";

		  	// act
			editCommand.execute(["somefile"], function(){});
			equal(Session.currentEditor.state, "OLD")
		});

		test("it should add correct path to session object when new", function() {
			// arrange
			var service = new MockJamService(undefined, "OK");
			var editCommand = new EditCommand(service);
			Session.currentFolder = "/articles";

		  	// act
			editCommand.execute(["somefile"], function(){});
			equal(Session.currentEditor.path, "/articles/somefile")
		});

		
		test("it should add correct path to session object when old", function() {
			// arrange
			var service = new MockJamService("{something}", "OK");
			var editCommand = new EditCommand(service);
			Session.currentFolder = "/articles";

		  	// act
			editCommand.execute(["somefile"], function(){});
			equal(Session.currentEditor.path, "/articles/somefile")
		});
		
		test("it should call post when new item", function() {
			// arrange
			var service = new MockJamService(undefined, "OK");
			var editCommand = new EditCommand(service);

		  	// act
			editCommand.execute(["somefile"], function(){});
			Prompt.promptOverrideDelegate("1");
			equal(service.Class.methodCalled, "post");
		});
		
		test("it should call put when old item", function() {
			// arrange
			var service = new MockJamService("{}", "OK");
			var editCommand = new EditCommand(service);

		  	// act
			editCommand.execute(["somefile"], function(){});
			Prompt.promptOverrideDelegate("1");
			equal(MockJamService.methodCalled, "put");
		});
				
	});