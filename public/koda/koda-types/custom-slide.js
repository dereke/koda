{
	"fields" : [
		{
			"id" : "_koda_type",
			"control" : "input-hidden",
			"defaultValue" : "/koda/koda-types/custom-slide.js"
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
			"description" : "Title of the slide",
			"control" : "input-text",
			"defaultValue" : "",
			"properties" : "required"
		},
		{
			"id" : "_koda_ref",
			"title" : "Alias",
			"description" : "This will be generated from the title",
			"control" : "input-readonly",
			"defaultValue" : ""
		},
		{
			"id" : "teaser",
			"title" : "Teaser text",
			"description" : "The bold text under heading",
			"control" : "input-text",
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
			"control" : "input-text",
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