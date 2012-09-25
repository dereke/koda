{
	"title"  : "Kodacms.org Editor",
	"fields" : [
		{
			"id" : "_koda_type",
			"control" : "input-hidden",
			"defaultValue" : "/koda/koda-types/custom-blogpost.js"
		},	
		{
			"id" : "_koda_editor",
			"control" : "input-hidden",
			"defaultValue" : "/koda/koda-editors/generic-editor.html"
		},
		{
			"id" : "_koda_indexes",
			"control" : "input-hidden",
			"defaultValue" : "name,tags"
		},
		{
			"id" : "name",
			"title" : "Name",
			"description" : "The name of the content",
			"control" : "input-text",
			"defaultValue" : "",
			"properties" : "required"
		},
		{
			"id" : "alias",
			"title" : "Alias",
			"description" : "This will be generated from the title",
			"control" : "input-readonly",
			"defaultValue" : ""
		},
/*
	ALL Fields above are required for use with the generic editors. 
	You can specify your own rules if you use your own editor.
	
	Add your custom variables below this comment... for example...
*/
		{
			"id" : "tags",
			"title" : "Tags",
			"description" : "Comma separated",
			"control" : "input-text",
			"defaultValue" : ""
		}
	]
}