[
	{	"group" : "koda", 
		"title" : "Koda Types",
		"types" : [
			{
				"title" : "Folder",
				"description" :"A container to hold KodaTypes",
				"icon" : "/assets/images/package.png",
				"editor" : "/koda-editors/collection-editor.html",
				"type"	: "/koda-types/koda-collection.js",
				"allowedin" : "root"
			},
			{
				"title" : "Generic Text",
				"description" :"This will create a simple text document",
				"icon" : "/assets/images/database_table.png",
				"editor" : "/koda-editors/generic-editor.html",
				"type"	: "/koda-types/koda-generictext.js",
				"allowedin" : "collection"
			},
			{
				"title" : "Generic Media",
				"description" :"Image, Video or Audio",
				"icon" : "/assets/images/image_add.png",
				"editor" : "/koda-editors/generic-editor.html",
				"type" : "/koda-types/koda-media.js",
				"allowedin" : "collection"
			},
			{
				"title" : "Generic Json",
				"description" :"This will create a simple json document",
				"icon" : "/assets/images/database_table.png",
				"editor" : "/koda-editors/json-editor.html",
				"type"	: "/koda-types/koda-json.js",
				"allowedin" : "collection"
			}
		]
	},
	{	"group" : "custom", 
		"title" : "Custom Types",
		"types" : [
			{
				"title" : "User",
				"description" :"Add a user item",
				"icon" : "/assets/images/group_add.png",
				"editor" : "/koda-editors/generic-editor.html",
				"type" : "/koda-types/custom-user.js",
				"allowedin" : "collection"
			},
			{
				"title" : "Car",
				"description" :"Add a Car item",
				"icon" : "/assets/images/car_add.png",
				"editor" : "/koda-editors/generic-editor.html",
				"type" : "/koda-types/custom-car.js",
				"allowedin" : "collection"
			}
		]
	}
]