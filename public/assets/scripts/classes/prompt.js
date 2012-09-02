$.Class.extend("Prompt", 
	{
		writeToInput : function(value) {
			
			var self = $(".active:last"), input;	
			input = self.find('textarea');
			input.val(value);
			
		},
				
		getInput : function() {

			var self = $(".active:last"), input;	
			input = self.find('textarea');
			return input.val();

		},		
		
		writeToOutput : function(value, prompt) {
			
			var currentFolder = Session.currentFolder == undefined ? "home" : Session.currentFolder;
			var promptIndicator = prompt == undefined ? currentFolder : prompt;
			
			var self = $(".active:last"), input, line;				
			var text = $('<pre/>').text(value);
			
			line = self.clone();
			if(text) self.append(text);
			self.removeClass('active').addClass("inactive");
			self.attr('disabled', true);
			self.after( line );
			
			$('.prompt:last').text(promptIndicator + " >");
			$('.active textarea').removeClass().addClass(Prompt.multiline ? "multi" : "single")
			$('.active textarea').focus().val('');
			
		},
		
		multiline: false,
		
		promptInputOverride: false,
		
		promptOverrideDelegate: undefined,
	}, 
	{ init : function() {} }
);