$.Class.extend("MockJamService", {
	
	items : {}, result: "", methodCalled: ""
	
}, 
	{
		init : function(items, result) {
			this.Class.items = items;
			this.Class.result = result;			
		},
		
		get: function(path, callback) {
			this.Class.methodCalled = "get";
			callback(this.Class.items);
		},
		
		delete: function(path, callback) {
			this.Class.methodCalled = "delete";
			callback(this.Class.result);
		},
		
		post: function(path, resource, callback) {
			this.Class.methodCalled = "post";
			callback(this.Class.result);
		},
		
		put: function(path, resource, callback) {
			this.Class.methodCalled = "put";
			callback(this.Class.result);
		}
		
	}
);