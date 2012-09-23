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
				"title" : "Text File",
				"description" :"This will create a simple text document",
				"icon" : "/koda/images/database_table.png",
				"editor" : "/koda/koda-editors/generic-editor.html",
				"type"	: "/koda/koda-types/koda-generictext.js",
				"allowedin" : "collection"
			},
			{
				"title" : "Media File",
				"description" :"Image, Video or Audio",
				"icon" : "/koda/images/image_add.png",
				"editor" : "/koda/koda-editors/generic-editor.html",
				"type" : "/koda/koda-types/koda-media.js",
				"allowedin" : "collection"
			},
			{
				"title" : "Link to a document",
				"description" :"Link to a document or Index",
				"icon" : "/koda/images/feed_link.png",
				"editor" : "/koda/koda-editors/generic-editor.html",
				"type" : "/koda/koda-types/koda-link.js",
				"allowedin" : "collection"
			},
			{
				"title" : "Twitter Feed",
				"description" :"This will include posts of a twitter feed",
				"icon" : "/koda/images/twitter.png",
				"editor" : "/koda/koda-editors/twitterfeed-editor.html",
				"type"	: "/koda/koda-types/koda-twitterfeed.js",
				"allowedin" : "collection"
			}
		]
	},
	{
		"group" : "admin",
		"title" : "Administration",
		"admin_users" : true,
		"types" : [
			{
				"title" : "Koda User",
				"description" :"This will create a koda user",
				"icon" : "/koda/images/group_add.png",
				"editor" : "/koda/koda-editors/generic-editor.html",
				"type"	: "/koda/koda-types/koda-user.js",
				"allowedin" : "collection"
			},
			{
				"title" : "Koda Access",
				"description" :"Control access to a folder",
				"icon" : "/koda/images/group_key.png",
				"editor" : "/koda/koda-editors/generic-editor.html",
				"type"	: "/koda/koda-types/koda-access.js",
				"allowedin" : "collection"
			}
		]
	},
	{
		"group" : "custom",
		"title" : "Custom",
		"types" : [
			{
				"title" : "Generic Page",
				"description" :"For creating a generic page",
				"icon" : "/koda/images/layout_add.png",
				"editor" : "/koda/koda-editors/generic-editor.html",
				"type"	: "/koda/koda-types/custom-genericpage.js",
				"allowedin" : "collection"
			}
		]
	}
]