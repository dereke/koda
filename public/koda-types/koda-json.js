{
	"id" : "kodaJson",
	"title" : "Generic Json",
	"description" :"This will create a simple json document",
	"icon" : "",
	"editor" : "/koda-editors/json-editor.html",
	"fields" : [
		{
			"id" : "_koda_ref",
			"control" : "hiddenstring",
			"defaultValue" : ""
		},
		{
			"id" : "_koda_type",
			"control" : "hiddenstring",
			"defaultValue" : "/koda-types/koda-json.js"
		},	
		{
			"id" : "_koda_editor",
			"control" : "hiddenstring",
			"defaultValue" : "/koda-editors/json-editor.html"
		},
		{
			"id" : "name",
			"title" : "Name",
			"description" : "The name of the document",
			"control" : "textstring",
			"defaultValue" : ""
		},
		{
			"id" : "content",
			"title" : "Content",
			"description" : "The contents of the document",
			"control" : "textarea",
			"defaultValue" : ""
		}
	]
}