{
	"fields" : [
		{
			"id" : "_koda_type",
			"control" : "hiddenstring",
			"defaultValue" : "/koda/koda-types/koda-twitterfeed.js"
		},	
		{
			"id" : "_koda_editor",
			"control" : "hiddenstring",
			"defaultValue" : "/koda/koda-editors/twitterfeed-editor.html"
		},
		{
			"id" : "_koda_indexes",
			"control" : "hiddenstring",
			"defaultValue" : "name,tags"
		},
		{
			"id" : "showuserfeed",
			"title" : "Show a user feed?",
			"description" : "Do you want to show a user timeline?",
			"control" : "truefalse",
			"defaultValue" : false
		},
		{
			"id" : "name",
			"title" : "Twitter handle",
			"description" : "The screen name of the twitter feed",
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
			"id" : "user_count",
			"title" : "How many?",
			"description" : "The amount of latest messages to include",
			"control" : "textstring",
			"defaultValue" : ""
		},
		{
			"id" : "showqueriedfeed",
			"title" : "Show a custom query?",
			"description" : "Do you want to show a custom feed based on a query?",
			"control" : "truefalse",
			"defaultValue" : false
		},
		{
			"id" : "query",
			"title" : "Custom query",
			"description" : "The query or tag to search",
			"control" : "textstring",
			"defaultValue" : ""
		},
		{
			"id" : "query_count",
			"title" : "How many?",
			"description" : "The amount of latest messages to include",
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
			"control" : "hiddenstring",
			"defaultValue" : ""
		}
	]
}