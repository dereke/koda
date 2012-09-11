{
	"id" : "kodaGenericText",
	"title" : "Generic Text",
	"description" :"This will create a simple text document",
	"icon" : "",
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
			"defaultValue" : "/koda-types/koda-generictext.js"
		},	
		{
			"id" : "_koda_editor",
			"control" : "hiddenstring",
			"defaultValue" : "/koda-editors/generic-editor.html"
		},
		{
			"id" : "name",
			"title" : "Name",
			"description" : "The name of the content",
			"control" : "textstring",
			"defaultValue" : ""
		},
		{
			"id" : "content",
			"title" : "Content",
			"description" : "The contents",
			"control" : "textarea",
			"defaultValue" : ""
		}
	]
}