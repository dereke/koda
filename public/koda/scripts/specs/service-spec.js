require(["classes/jam-service"], function(){
		
		module("describe get method")
		
		test("it should return a set of collections from mongojamspoon.tryjam.com", function() {

			stop();  
			// arrange
			Session.jamUrl = "http://mongojamspoon.tryjam.com";
			var jamService = new JamService();
			
			// act
			jamService.get("", function(data) {
				// assert
				ok(data != undefined, "value was " + data);
				ok(data.length > 0, "data length was "+ data.length)
				start();
			});
			
		});
		
		test("it should return a list of resources from mongojamspoon.tryjam.com", function() {

			stop();  
			// arrange
			Session.jamUrl = "http://mongojamspoon.tryjam.com";
			var jamService = new JamService();
			
			// act
			jamService.get("articles", function(data) {
				// assert
				ok(data != undefined, "value was " + data);
				ok(data.length > 0, "data length was "+data.length)
				start();
			});
			
		});
		
		test("it should return a list of resources from mongojamspoon.tryjam.com and be able to get that resource", function() {
			
			stop();
			// arrange
			Session.jamUrl = "http://mongojamspoon.tryjam.com";
			var jamService = new JamService();
			
			// act
			jamService.get("articles", function(data) {
				
				var jamRef = data[0].title;
				jamService.get("articles"+"/"+data[0].title, function(resource){
					// assert
					ok(resource.ref == jamRef, "value was " + data.ref);				
					start();
				})
			
			});
			
		});
		
		module("describe post method")
		
		
		test("it should post a resources to mongojamspoon.tryjam.com and delete it", function() {
			
			stop();
			// arrange
			Session.jamUrl = "http://mongojamspoon.tryjam.com";
			var jamService = new JamService();
			
			// act
			jamService.post("articles", "{\"ref\":\"testing123\"}", function(data) {

				var jamRef = "testing123";
				jamService.get("articles/testing123", function(resource){
					// assert
					ok(resource.ref == jamRef, "value was " + data.ref);				
					start();
					
					jamService.delete("articles/testing123");
				})
			
			});
			
		});	
	});