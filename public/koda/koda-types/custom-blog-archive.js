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
			"defaultValue" : "name,alias"
		},
		{
			"id" : "datecreated",
			"control" : "input-hidden",
			"defaultValue" : "<%=timestamp%>"
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
			"id" : "latest_posts_ref",
			"control" : "input-hidden",
			"include" : true, 
			"defaultValue" : "/content/blogposts/filtered/latest?take=10"
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