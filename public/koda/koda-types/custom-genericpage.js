{
	"fields" : [
		{
			"id" : "_koda_type",
			"control" : "input-hidden",
			"defaultValue" : "/koda/koda-types/custom-genericpage.js"
		},	
		{
			"id" : "_koda_editor",
			"control" : "input-hidden",
			"defaultValue" : "/koda/koda-editors/generic-editor.html"
		},
		{
			"id" : "_koda_indexes",
			"control" : "input-hidden",
			"defaultValue" : "title"
		},
		{
			"id" : "name",
			"title" : "Title",
			"description" : "Title of page",
			"control" : "input-text",
			"properties" : "required",
			"defaultValue" : ""
		},
		{
			"id" : "_koda_ref",
			"title" : "Alias",
			"description" : "This will be generated from the title",
			"control" : "input-readonly",
			"defaultValue" : ""
		},
		{
			"id" : "heading",
			"title" : "Heading",
			"description" : "Main heading of page",
			"control" : "input-text",
			"defaultValue" : ""
		},
		{
			"id" : "titleimage",
			"title" : "Title Image",
			"description" : "Upload an image",
			"control" : "imageupload",
			"defaultValue" : ""
		},
		{
			"id" : "teaser",
			"title" : "Teaser",
			"description" : "Shown just under the heading",
			"control" : "input-text",
			"defaultValue" : ""
		},
		{
			"id" : "body",
			"title" : "Main body",
			"description" : "Content of the main page",
			"control" : "richtext",
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
			"description" : "Link to another doc",
			"control" : "kodalinkeditor",
			"defaultValue" : ""
		}
	]
}