{
	"fields" : [
		{
			"id" : "_koda_ref",
			"control" : "hiddenstring",
			"defaultValue" : ""
		},
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
			"title" : "Url slug",
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
			"id" : "mainbody",
			"title" : "Main body of the content",
			"description" : "Shown just under the intro paragraph",
			"control" : "richtext",
			"defaultValue" : ""
		},
		{
			"id" : "bottomlefttitle",
			"title" : "Bottom Left Title",
			"description" : "The title of the part on the lower left side of page",
			"control" : "textstring",
			"defaultValue" : ""
		},
		{
			"id" : "bottomleftintro",
			"title" : "Bottom Left Intro",
			"description" : "Small heading under title",
			"control" : "textstring",
			"defaultValue" : ""
		},
		{
			"id" : "bottomleftbody",
			"title" : "Bottom Left Body",
			"description" : "The body of the summary",
			"control" : "richtext",
			"defaultValue" : ""
		},
		{
			"id" : "bottomleftlink",
			"title" : "Bottom Left Link",
			"description" : "The 'learn more' link",
			"control" : "textstring",
			"defaultValue" : ""
		},		
		{
			"id" : "bottomrighttitle",
			"title" : "Bottom Right Title",
			"description" : "The bottom right section title",
			"control" : "textstring",
			"defaultValue" : ""
		},
		{
			"id" : "bottomrightbody",
			"title" : "Bottom Right Body",
			"description" : "The bottom right section body",
			"control" : "richtext",
			"defaultValue" : ""
		},	
		{
			"id" : "bottomrightlink",
			"title" : "Bottom Right Link",
			"description" : "The bottom right section link",
			"control" : "textstring",
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