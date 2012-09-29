{
	"title"  : "Koda Author Editor",
	"fields" : [
		{
			"id" : "_koda_type",
			"control" : "input-hidden",
			"defaultValue" : "/koda/koda-types/custom-author.js"
		},	
		{
			"id" : "_koda_editor",
			"control" : "input-hidden",
			"defaultValue" : "/koda/koda-editors/generic-editor.html"
		},
		{
			"id" : "_koda_indexes",
			"control" : "input-hidden",
			"defaultValue" : "name,email"
		},
		{
			"id" : "datecreated",
			"control" : "input-hidden",
			"defaultValue" : "<%=timestamp%>"
		},
		{
			"id" : "name",
			"title" : "Author full name",
			"description" : "full name of the author",
			"control" : "input-text",
			"properties" : "required placeholder='Joe Blog'",
			"defaultValue" : ""
		},
		{
			"id" : "alias",
			"title" : "Alias",
			"description" : "This will be generated from the name",
			"control" : "input-readonly",
			"defaultValue" : ""
		},
		{
			"id" : "email",
			"title" : "Email address",
			"description" : "email address of user",
			"control" : "input-email",
			"properties" : "required placeholder='joe@blogs.com'",
			"defaultValue" : ""
		},
		{
			"id" : "bio",
			"title" : "Small Bio",
			"description" : "Small biography",
			"control" : "textarea",
			"defaultValue" : ""
		},
		{
			"id" : "authorphoto",
			"title" : "Author photo",
			"description" : "Photo of the author",
			"control" : "imageupload",
			"defaultValue" : ""
		},
		{
			"id" : "tags",
			"title" : "Tags",
			"description" : "Comma separated",
			"control" : "input-text",
			"defaultValue" : ""
		}
	]
}