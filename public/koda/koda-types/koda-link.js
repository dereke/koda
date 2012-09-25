{
	"title"  : "Koda Link Editor",
	"fields" : [
		{
			"id" : "_koda_type",
			"control" : "input-hidden",
			"defaultValue" : "/koda/koda-types/koda-link.js"
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
			"description" : "The name of the image",
			"control" : "input-text",
			"properties" : "required",
			"defaultValue" : ""
		},
		{
			"id" : "alias",
			"title" : "Alias",
			"description" : "This will be generated from the title",
			"control" : "input-readonly",
			"defaultValue" : ""
		},
		{
			"id" : "tags",
			"title" : "Tags",
			"description" : "Comma separated",
			"control" : "input-text",
			"defaultValue" : ""
		},
		{
			"id" : "_koda_doc_links",
			"title" : "Document Link",
			"description" : "Link to another doc, index or external json endpoint",
			"control" : "kodalinkeditor",
			"defaultValue" : ""
		}
	]
}