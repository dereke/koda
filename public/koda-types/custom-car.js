{
	"id" : "carCustomType",
	"title" : "Custom - Car",
	"description" :"Add a Car item",
	"icon" : "/assets/images/car_add.png",
	"editor" : "/koda-editors/generic-editor.html",
	"fields" : [
		{
			"id" : "_koda_ref",
			"control" : "hiddenstring",
			"defaultValue" : ""
		},
		{
			"id" : "_koda_type",
			"control" : "hiddenstring",
			"defaultValue" : "/koda-types/custom-car.js"
		},	
		{
			"id" : "_koda_editor",
			"control" : "hiddenstring",
			"defaultValue" : "/koda-editors/generic-editor.html"
		},
		{
			"id" : "name",
			"title" : "Name",
			"description" : "Name",
			"control" : "textstring",
			"defaultValue" : ""
		},
		{
			"id" : "make",
			"title" : "Make",
			"description" : "Make of the car",
			"control" : "textstring",
			"defaultValue" : ""
		},
		{
			"id" : "model",
			"title" : "Model",
			"description" : "Model of the car",
			"control" : "textstring",
			"defaultValue" : ""
		},
		{
			"id" : "year",
			"title" : "Year",
			"description" : "Year made",
			"control" : "textstring",
			"defaultValue" : ""
		},
		{
			"id" : "carImage",
			"title" : "Car Image",
			"description" : "Upload an image",
			"control" : "mediaupload",
			"defaultValue" : ""
		},
		{
			"id" : "specs",
			"title" : "Technical Specs",
			"description" : "Mode details of the car",
			"control" : "textarea",
			"defaultValue" : ""
		}
	]
}