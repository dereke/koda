{
	"fields" : [
		{
			"id" : "_koda_type",
			"control" : "hiddenstring",
			"defaultValue" : "/koda/koda-types/custom-genericpage.js"
		},	
		{
			"id" : "_koda_editor",
			"control" : "hiddenstring",
			"defaultValue" : "/koda/koda-editors/generic-editor.html"
		},
		{
			"id" : "_koda_indexes",
			"control" : "hiddenstring",
			"defaultValue" : "title"
		},
		{
			"id" : "name",
			"title" : "Title",
			"description" : "Title of page",
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
			"id" : "maintitle",
			"title" : "Main title of the content",
			"description" : "Shown just above the body",
			"control" : "textstring",
			"defaultValue" : ""
		},
		{
			"id" : "introparagraph",
			"title" : "Main intro of the content",
			"description" : "Shown just under the body title",
			"control" : "textstring",
			"defaultValue" : ""
		},
		{
			"id" : "column1",
			"title" : "Left Column",
			"description" : "Shown on the left",
			"control" : "richtext",
			"defaultValue" : ""
		},
		{
			"id" : "image1",
			"title" : "Left Image",
			"description" : "Upload an image",
			"control" : "imageupload",
			"defaultValue" : ""
		},
		{
			"id" : "column2",
			"title" : "Right Column",
			"description" : "Shown on the right",
			"control" : "richtext",
			"defaultValue" : ""
		},
		{
			"id" : "sidebartext",
			"title" : "Sidebar content",
			"description" : "Shown on the right bottom",
			"control" : "richtext",
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
			"defaultValue" : "/api/slides"
		}
	]
}