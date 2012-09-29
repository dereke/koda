{
	"title"  : "Koda User Editor",
	"fields" : [
		{
			"id" : "_koda_type",
			"control" : "input-hidden",
			"defaultValue" : "/koda/koda-types/koda-user.js"
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
			"id" : "googleid",
			"control" : "input-hidden",
			"defaultValue" : ""
		},
		{
			"id" : "name",
			"title" : "Username",
			"description" : "Prefered Username",
			"control" : "input-text",
			"properties" : "required placeholder='joeblogs'",
			"defaultValue" : ""
		},
		{
			"id" : "alias",
			"title" : "Alias",
			"description" : "This will be generated from the username",
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
			"id" : "isallowed",
			"title" : "Is Allowed",
			"description" : "Is this user allowed in the backoffice?",
			"control" : "truefalse",
			"properties" : "required",
			"defaultValue" : false
		},
		{
			"id" : "isadmin",
			"title" : "Is Admin",
			"description" : "Access to console and can do anything.",
			"control" : "truefalse",
			"properties" : "required",
			"defaultValue" : false
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