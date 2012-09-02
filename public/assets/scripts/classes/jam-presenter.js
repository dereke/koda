$.Class.extend("JamPresenter", 
	{ uiObject: {}, controller: {}, isCtrl: false }, 
	{
		init : function(controller){

			this.Class.controller = controller;
			this.Class.uiObject = $('#console');
		},
		
		listen: function() {
				
			this.Class.uiObject.delegate('.active textarea', 'keyup', this.editorKeyup);
			this.Class.uiObject.delegate('.active textarea', 'keydown', this.editorKeydown);
		},
		
		editorKeyup: function(e) {
			if(e.which == 17) JamPresenter.isCtrl=false; // ctrl
		},
		
		editorKeydown: function(e) {
			if (e.which == 9) { // tab
				var self = JamPresenter;
			    e.preventDefault();
				var val = Prompt.getInput();
				var autoCompleted = self.controller.autocomplete(val);
				Prompt.writeToInput(autoCompleted);
			
			} else if(!Prompt.multiline && e.which == 13){ //enter
				e.preventDefault();
				val = Prompt.getInput();
				
				if(Prompt.promptInputOverride && Prompt.promptOverrideDelegate) {
					
					Prompt.promptOverrideDelegate(val);
					
				} else {
				
					JamPresenter.controller.processLine(val, function(output) {
						Prompt.writeToOutput(output);
					});
				
				}
			} else if(Prompt.multiline && e.which == 17) { // ctrl
				JamPresenter.isCtrl=true
			} else if(Prompt.multiline && e.which == 67 && JamPresenter.isCtrl == true) { // C
				
				e.preventDefault();
				val = Prompt.getInput();
				
				if(Prompt.promptInputOverride && Prompt.promptOverrideDelegate) {
					
					Prompt.promptOverrideDelegate(val);
					
				} else {
				
					JamPresenter.controller.processLine(val, function(output) {
						Prompt.writeToOutput(output);
					});
				
				}
				
			}
		}
		
	}
	
);