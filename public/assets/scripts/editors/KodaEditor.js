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
	var isNew = getParam('isnew') == 'true';
	
	return {
			
			isNew: isNew,
			
			itemUrl: itemUrl,

			get: function(path, callback) {

				jQuery.ajax({
				    type: "GET",
				    url: path + "?" + new Date().getTime(),
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

				jQuery.ajax({
				    type: "DELETE",
				    url: path,
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

				jQuery.ajax({
				    type: "PUT",
				    url: path,
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

				jQuery.ajax({
				    type: "POST",
				    url: path,
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