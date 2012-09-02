$.Class.extend("UiObjectDouble", {}, 
	{
		init : function() {
			this.value = "";
		},
		
		val: function(value) {
			
			if(value == undefined) {
				return this.value;
			}
			this.value = value;
		}
		
	});