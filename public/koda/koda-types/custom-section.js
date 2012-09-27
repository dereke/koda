{
	"title"  : "Koda Section Editor",
	"fields" : [
		{
			"id" : "_koda_type",
			"control" : "input-hidden",
			"defaultValue" : "/koda/koda-types/custom-section.js"
		},	
		{
			"id" : "_koda_editor",
			"control" : "input-hidden",
			"defaultValue" : "/koda/koda-editors/generic-editor.html"
		},
		{
			"id" : "_koda_indexes",
			"control" : "input-hidden",
			"defaultValue" : "alias,page_ref"
		},
		{
			"id" : "name",
			"title" : "Section name",
			"description" : "name of the section",
			"control" : "input-text",
			"properties" : "required placeholder='My section'",
			"defaultValue" : ""
		},
		{
			"id" : "alias",
			"title" : "Alias",
			"description" : "This will be generated from the name",
			"control" : "input-readonly",
			"defaultValue" : ""
		},
		{
			"id" : "sectiontitle",
			"title" : "Title",
			"description" : "title of the section",
			"control" : "input-text",
			"properties" : "required placeholder='Welcome to my section'",
			"defaultValue" : ""
		},
		{
			"id" : "page_ref",
			"title" : "Parent page",
			"description" : "The page this section should be displayed on",
			"control" : "collection",
			"ajax" : {
				"url" : "/content/pages",
				"displayfield" : "title",
				"valuefield" : "href"
			}
		},
		{
			"id" : "tip",
			"title" : "Help",
			"description" : "Small help / tip on the page",
			"control" : "input-text",
			"defaultValue" : ""
		},
		{
			"id" : "content",
			"title" : "Content",
			"description" : "The contents",
			"control" : "richtext",
			"defaultValue" : ""
		},
		{
			"id" : "tags",
			"title" : "Tags",
			"description" : "Comma separated",
			"control" : "input-text",
			"defaultValue" : ""
		}
	]
}