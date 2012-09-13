$.Class.extend("Prompt", 
	{
		value: "",
		input: "",
		output: "",
		
		writeToInput : function(value) {
			
			Prompt.input += value;
			
		},
		
		getInput : function() {

			return Prompt.value;

		},
		
		writeToOutput : function(value, prompt) {
			
			Prompt.output += value;
			
		},
		
		promptInputOverride: false,
		
		promptOverrideDelegate: undefined
	}, 
	{ init : function() {} }
);