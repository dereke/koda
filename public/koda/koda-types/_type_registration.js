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
				"title" : "Doc or Index link",
				"description" :"Link to a document or Index",
				"icon" : "/koda/images/feed_link.png",
				"editor" : "/koda/koda-editors/generic-editor.html",
				"type" : "/koda/koda-types/koda-link.js",
				"allowedin" : "collection"
			},
			{
				"title" : "Generic Json",
				"description" :"This will create a simple json document",
				"icon" : "/koda/images/database_table.png",
				"editor" : "/koda/koda-editors/json-editor.html",
				"type"	: "/koda/koda-types/koda-json.js",
				"allowedin" : "collection"
			},
			{
				"title" : "Generic Post",
				"description" :"This will create a simple page document",
				"icon" : "/koda/images/page_white_edit.png",
				"editor" : "/koda/koda-editors/generic-editor.html",
				"type"	: "/koda/koda-types/koda-post.js",
				"allowedin" : "collection"
			},
			{
				"title" : "Twitter Feed",
				"description" :"This will include posts of a twitter feed",
				"icon" : "/koda/images/twitter.png",
				"editor" : "/koda/koda-editors/twitterfeed-editor.html",
				"type"	: "/koda/koda-types/koda-twitterfeed.js",
				"allowedin" : "collection"
			},
			{
				"title" : "Koda User",
				"description" :"This will create a koda user",
				"icon" : "/koda/images/group_add.png",
				"editor" : "/koda/koda-editors/generic-editor.html",
				"type"	: "/koda/koda-types/koda-user.js",
				"allowedin" : "collection"
			}
		]
	},
	{
		"group" : "koda",
		"title" : "User Created",
		"types" : [
			{
				"title" : "Home Page",
				"description" :"For creating a home page",
				"icon" : "/koda/images/layout_add.png",
				"editor" : "/koda/koda-editors/generic-editor.html",
				"type"	: "/koda/koda-types/custom-homepage.js",
				"allowedin" : "collection"
			},
			{
				"title" : "Generic Page",
				"description" :"For creating a generic page",
				"icon" : "/koda/images/layout_add.png",
				"editor" : "/koda/koda-editors/generic-editor.html",
				"type"	: "/koda/koda-types/custom-genericpage.js",
				"allowedin" : "collection"
			},
			{
				"title" : "Slide",
				"description" :"Slides on home page",
				"icon" : "/koda/images/photo_add.png",
				"editor" : "/koda/koda-editors/generic-editor.html",
				"type"	: "/koda/koda-types/custom-slide.js",
				"allowedin" : "collection"
			}
		]
	}
]