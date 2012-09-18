{
	"fields" : [
		{
			"id" : "_koda_type",
			"control" : "hiddenstring",
			"defaultValue" : "/koda/koda-types/custom-slide.js"
		},	
		{
			"id" : "_koda_editor",
			"control" : "hiddenstring",
			"defaultValue" : "/koda/koda-editors/generic-editor.html"
		},
		{
			"id" : "_koda_indexes",
			"control" : "hiddenstring",
			"defaultValue" : "name,tags"
		},
		{
			"id" : "name",
			"title" : "Name",
			"description" : "Title of the slide",
			"control" : "textstring",
			"defaultValue" : ""
		},
		{
			"id" : "_koda_ref",
			"title" : "Alias",
			"description" : "This will be generated from the title",
			"control" : "readonlystring",
			"defaultValue" : ""
		},
		{
			"id" : "teaser",
			"title" : "Teaser text",
			"description" : "The bold text under heading",
			"control" : "textstring",
			"defaultValue" : ""
		},
		{
			"id" : "body",
			"title" : "Body text",
			"description" : "The text under the teaser",
			"control" : "richtext",
			"defaultValue" : ""
		},
		{
			"id" : "learnmorelink",
			"title" : "Learn more link",
			"description" : "Link to read more",
			"control" : "textstring",
			"defaultValue" : ""
		},
		{
			"id" : "slidephoto",
			"title" : "Photo",
			"description" : "Include an image in the slide",
			"control" : "imageupload",
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