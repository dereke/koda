{
	"fields" : [
		{
			"id" : "_koda_type",
			"control" : "hiddenstring",
			"defaultValue" : "/koda/koda-types/koda-user.js"
		},	
		{
			"id" : "_koda_editor",
			"control" : "hiddenstring",
			"defaultValue" : "/koda/koda-editors/generic-editor.html"
		},
		{
			"id" : "_koda_indexes",
			"control" : "hiddenstring",
			"defaultValue" : "name,email"
		},
		{
			"id" : "googleid",
			"control" : "hiddenstring",
			"defaultValue" : ""
		},
		{
			"id" : "name",
			"title" : "Username",
			"description" : "Prefered Username",
			"control" : "textstring",
			"defaultValue" : ""
		},
		{
			"id" : "_koda_ref",
			"title" : "Alias",
			"description" : "This will be generated from the username",
			"control" : "readonlystring",
			"defaultValue" : ""
		},
		{
			"id" : "email",
			"title" : "Email address",
			"description" : "email address of user",
			"control" : "textstring",
			"defaultValue" : ""
		},
		{
			"id" : "isadmin",
			"title" : "Is Allowed",
			"description" : "Is this user allowed in the backoffice?",
			"control" : "truefalse",
			"defaultValue" : ""
		},
		{
			"id" : "tags",
			"title" : "Tags",
			"description" : "Comma separated",
			"control" : "textstring",
			"defaultValue" : ""
		},
		{
			"id" : "_koda_doc_links",
			"title" : "Document Link",
			"description" : "Link to another doc",
			"control" : "kodalinkeditor",
			"defaultValue" : ""
		}
	]
}