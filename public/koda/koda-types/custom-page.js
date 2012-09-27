{
	"title"  : "Koda Page Editor",
	"fields" : [
		{
			"id" : "_koda_type",
			"control" : "input-hidden",
			"defaultValue" : "/koda/koda-types/custom-page.js"
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
			"title" : "Page name",
			"description" : "name of the page",
			"control" : "input-text",
			"properties" : "required placeholder='About Us'",
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
			"id" : "pagetitle",
			"title" : "Title",
			"description" : "title of the page",
			"control" : "input-text",
			"properties" : "required placeholder='About KodaCMS'",
			"defaultValue" : ""
		},
		{
			"id" : "sections_ref",
			"control" : "input-hidden",
			"include" : true, 
			"defaultValue" : "/content/search/sections?page_ref=/<%=alias%>/"
		},
		{
			"id" : "tip",
			"title" : "Help",
			"description" : "Small help / tip on the page",
			"control" : "input-text",
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