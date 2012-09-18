{
	"fields" : [
		{
			"id" : "_koda_type",
			"control" : "hiddenstring",
			"defaultValue" : "/koda/koda-types/koda-post.js"
		},	
		{
			"id" : "_koda_editor",
			"control" : "hiddenstring",
			"defaultValue" : "/koda/koda-editors/generic-editor.html"
		},
		{
			"id" : "_koda_indexes",
			"control" : "hiddenstring",
			"defaultValue" : "author,title,tags"
		},
		{
			"id" : "name",
			"title" : "Title",
			"description" : "Title of post",
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
			"title" : "Teaser",
			"description" : "Teaser text",
			"control" : "textstring",
			"defaultValue" : ""
		},
		{
			"id" : "author",
			"title" : "Author",
			"description" : "Your name",
			"control" : "textstring",
			"defaultValue" : ""
		},
		{
			"id" : "postimage",
			"title" : "Post Image",
			"description" : "Upload an image",
			"control" : "imageupload",
			"defaultValue" : ""
		},
		{
			"id" : "body",
			"title" : "Body",
			"description" : "The content of the post",
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
			"defaultValue" : ""
		}
	]
}