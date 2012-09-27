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
				"title" : "BlogStarterKit Author",
				"description" :"Custom type for KodaCMS.org",
				"icon" : "/koda/images/layout_add.png",
				"editor" : "/koda/koda-editors/generic-editor.html",
				"type"	: "/koda/koda-types/custom-author.js",
				"allowedin" : "collection"
			},
			{
				"title" : "BlogStarterKit Blogpost",
				"description" :"Custom type for KodaCMS.org",
				"icon" : "/koda/images/layout_add.png",
				"editor" : "/koda/koda-editors/generic-editor.html",
				"type"	: "/koda/koda-types/custom-blogpost.js",
				"allowedin" : "collection"
			},
			{
				"title" : "BlogStarterKit Page",
				"description" :"Custom type for KodaCMS.org",
				"icon" : "/koda/images/layout_add.png",
				"editor" : "/koda/koda-editors/generic-editor.html",
				"type"	: "/koda/koda-types/custom-page.js",
				"allowedin" : "collection"
			},
			{
				"title" : "BlogStarterKit Blog Archive Page",
				"description" :"Custom type for KodaCMS.org",
				"icon" : "/koda/images/layout_add.png",
				"editor" : "/koda/koda-editors/generic-editor.html",
				"type"	: "/koda/koda-types/custom-blog-archive.js",
				"allowedin" : "collection"
			},
			{
				"title" : "BlogStarterKit Section",
				"description" :"Custom type for KodaCMS.org",
				"icon" : "/koda/images/layout_add.png",
				"editor" : "/koda/koda-editors/generic-editor.html",
				"type"	: "/koda/koda-types/custom-section.js",
				"allowedin" : "collection"
			}
		]
	}
]