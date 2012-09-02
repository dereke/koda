$.Class.extend("JamService", 
	{}, 
	{
		init : function() {	},
		
		get: function(path, callback) {

			var location = path != undefined ? path : StringUtil.empty;
			
			jQuery.ajax({
			    type: "GET",
			    url: Session.jamUrl+"/"+location + "?" + new Date().getTime(),
			    dataType: "json",
			    success: function(results){
			        callback(results);
			    },
			    error: function(XMLHttpRequest, textStatus, errorThrown){
			        callback(null);
			    }
			});

		},
		
		delete: function(path, callback) {

			var location = path != undefined ? path : StringUtil.empty;
			
			jQuery.ajax({
			    type: "DELETE",
			    url: Session.jamUrl+"/"+location,
			    dataType: "json",
			    success: function(result){
			        callback("OK");
			    },
			    error: function(result){
			        callback(result);
			    }
			});

		},
		
		put: function(path, resource, callback) {

			var location = path != undefined ? path : StringUtil.empty;
			
			jQuery.ajax({
			    type: "PUT",
			    url: Session.jamUrl+"/"+location,
				data: resource,
			    dataType: "json",
			    success: function(result){
			        callback("OK");
			    },
			    error: function(result){
			        if(result.status == "201" || result.status == "200") {
						callback("OK")
					}
					else {
						callback(result.status);
					}
			    }
			});

		},
		
			
		post: function(path, resource, callback) {

			var location = path != undefined ? path : StringUtil.empty;
			
			jQuery.ajax({
			    type: "POST",
			    url: Session.jamUrl+"/"+location,
				data: resource,
			    dataType: "json",
			    success: function(result){
					callback("OK");
			    },
			    error: function(result){

			        if(result.status == "201" || result.status == "200") {
						callback("OK")
					}
					else {
						callback(result.status);
					}
			    }
			});
			
		}
		
	}
);