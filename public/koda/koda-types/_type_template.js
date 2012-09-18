{
	"fields" : [

		{
			"id" : "_koda_type",
			"control" : "hiddenstring",
			"defaultValue" : "/koda/koda-types/custom-blogpost.js"
		},	
		{
			"id" : "_koda_editor",
			"control" : "hiddenstring",
			"defaultValue" : "/koda/koda-editors/generic-editor.html"
		},
		{
			"id" : "_koda_indexes",
			"control" : "hiddenstring",
			"defaultValue" : "" // add the indexes of your doc here
		},
		{
			"id" : "name",
			"title" : "Name",
			"description" : "Name of the doc",
			"control" : "textstring",
			"defaultValue" : ""
		},	
		{
			"id" : "_koda_ref",
			"title" : "Alias",
			"description" : "This will be generated from the name",
			"control" : "readonlystring",
			"defaultValue" : ""
		},
/*
	ALL Fields above are required for use with the generic editors. 
	You can specify your own rules if you use your own editor.
	
	add your custom variables below this comment... for example...
*/
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
		},
	]
}