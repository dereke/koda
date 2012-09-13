require([
			"classes/jam-controller",
			"classes/builtin-commands",
			"specs/doubles/uiobject-double",
			"specs/doubles/mock-command"
		], function(){ 

			module("describe JamController autocomplete")

			test("it should autocomplete a command based on history", function() {

				Session.history.push("autocompleted");
				var controller = new JamController([new MockCommand()]);
				var value = controller.autocomplete("au");

				ok(value == 'autocompleted' || value == 'autocompleted ', value);

			});

			test("it should autocomplete a multiple commands in the string", function() {

				Session.history.push("autocompleted");
				Session.history.push("somethingelse");

				var controller = new JamController([new MockCommand()]);
				var value = controller.autocomplete("auto");

				ok(value == 'autocompleted' || value == 'autocompleted ', value);
				
				var value2 = controller.autocomplete("autocompleted som");
			
				equal(value2, "autocompleted somethingelse", "was "+value2);

			});

			module("describe JamController processLine")

			test("it should execute command based on input", function() {

				var controller = new JamController([new MockCommand()]);
				var value = controller.processLine("mock 123", function(output){

					ok(output.indexOf('123') != -1, output);

				});

			});

			test("it should pass all parameters to the command found", function() {

				// arrange
				var jamController = new JamController([new MockCommand()]);
				Session.currentFolder = undefined;

				// act
				jamController.processLine("mock 1 2 3 4", function(output){
					ok(output == '1234', output);

				});

			})

			test("it should execute multiple commands split by ' & '", function() {

				var controller = new JamController([new MockCommand()]);
				var times = 1;
				controller.processLine("mock 1234 & mock 5678", function(output){

					if(times == 1) {
						ok(output.indexOf('1234') != -1, output);
						times++;
					} else {
						ok(output.indexOf('5678') != -1, output);
					}

				});

			});

			test("it should inform user if command not found", function() {

				// arrange
				var jamController = new JamController([new MockCommand()]);
				Session.currentFolder = undefined;

				// act
				jamController.processLine("doesntexist 1 2 3 4", function(output){

					ok(output.indexOf('Command not found') != -1, output);

				});

			})
			
 });