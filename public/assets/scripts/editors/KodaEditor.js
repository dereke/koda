/*
   ----------------------------------------------------------
	KodaEditor 
   ----------------------------------------------------------
*/
	
KodaEditor = function(rootUrl) {
	
	function getParam(key) {

	  	key = key.replace(/[\[]/,"\\\[").replace(/[\]]/,"\\\]");
	  	var regex = new RegExp("[\\?&]"+key+"=([^&#]*)");
	  	var qs = regex.exec(window.location.href);

	    if(qs != undefined && qs.length > 0)
			return qs[1];

		return "";

	}
	
	var itemUrl = getParam('url');
	var isNew = getParam('isnew');
	
	return {
			
			isNew: isNew,
			
			itemUrl: itemUrl,

			get: function(path, callback) {

				var location = path != undefined ? path : '';

				jQuery.ajax({
				    type: "GET",
				    url: rootUrl+"/"+location + "?" + new Date().getTime(),
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

				var location = path != undefined ? path : '';

				jQuery.ajax({
				    type: "DELETE",
				    url: rootUrl+"/"+location,
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

				var location = path != undefined ? path : '';

				jQuery.ajax({
				    type: "PUT",
				    url: rootUrl+"/"+location,
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

				var location = path != undefined ? path : '';

				jQuery.ajax({
				    type: "POST",
				    url: rootUrl+"/"+location,
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
	};