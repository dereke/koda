[
	{	"group" : "koda", 
		"title" : "Koda Types",
		"types" : [
			{
				"title" : "Folder",
				"description" :"A container to hold KodaTypes",
				"icon" : "/koda/images/package.png",
				"editor" : "/koda/koda-editors/collection-editor.html",
				"type"	: "/koda/koda-types/koda-collection.js",
				"allowedin" : "root"
			},
			{
				"title" : "Generic Text",
				"description" :"This will create a simple text document",
				"icon" : "/koda/images/database_table.png",
				"editor" : "/koda/koda-editors/generic-editor.html",
				"type"	: "/koda/koda-types/koda-generictext.js",
				"allowedin" : "collection"
			},
			{
				"title" : "Generic Media",
				"description" :"Image, Video or Audio",
				"icon" : "/koda/images/image_add.png",
				"editor" : "/koda/koda-editors/generic-editor.html",
				"type" : "/koda/koda-types/koda-media.js",
				"allowedin" : "collection"
			},
			{
				"title" : "Generic Json",
				"description" :"This will create a simple json document",
				"icon" : "/koda/images/database_table.png",
				"editor" : "/koda/koda-editors/json-editor.html",
				"type"	: "/koda/koda-types/koda-json.js",
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
				"icon" : "/koda/images/group_add.png",
				"editor" : "/koda/koda-editors/generic-editor.html",
				"type" : "/koda/koda-types/custom-user.js",
				"allowedin" : "collection"
			},
			{
				"title" : "Blog Post",
				"description" :"Blog post item",
				"icon" : "/koda/images/page_white_edit.png",
				"editor" : "/koda/koda-editors/generic-editor.html",
				"type" : "/koda/koda-types/custom-blogpost.js",
				"allowedin" : "collection"
			},
			{
				"title" : "Car Example",
				"description" :"Add a Car item",
				"icon" : "/koda/images/car_add.png",
				"editor" : "/koda/koda-editors/generic-editor.html",
				"type" : "/koda/koda-types/custom-car.js",
				"allowedin" : "collection"
			}
		]
	}
]