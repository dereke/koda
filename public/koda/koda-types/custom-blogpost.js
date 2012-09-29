{
	"title"  : "Kodacms.org Part Editor",
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
			"id" : "datecreated",
			"control" : "input-hidden",
			"defaultValue" : "<%=timestamp%>"
		},
		{
			"id" : "publish_date",
			"title" : "Publish date",
			"description" : "The publish date",
			"control" : "input-datetime",
			"defaultValue" : "<%=timestamp%>"
		},
		{
			"id" : "alias",
			"title" : "Alias",
			"description" : "This will be generated from the title",
			"control" : "input-readonly",
			"defaultValue" : ""
		},
		{
			"id" : "title",
			"title" : "Title",
			"description" : "The title of the part",
			"properties" : "required",
			"control" : "input-text"
		},
		{
			"id" : "author_ref",
			"title" : "Author of post",
			"description" : "The author that this post belongs to",
			"control" : "collection",
			"include" : true, 
			"ajax" : {
				"url" : "/content/authors",
				"displayfield" : "title",
				"valuefield" : "href"
			}
		},
		{
			"id" : "teaser",
			"title" : "Teaser",
			"description" : "The teaser of the part",
			"control" : "input-text"
		},
		{
			"id" : "content",
			"title" : "Content",
			"description" : "The contents",
			"control" : "richtext",
			"defaultValue" : ""
		},
		{
			"id" : "contentimage",
			"title" : "Content Image",
			"description" : "Image to display in the content",
			"control" : "imageupload",
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