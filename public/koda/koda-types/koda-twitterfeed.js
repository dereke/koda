{
	"title"  : "Koda Twitter Feed Editor",
	"fields" : [
		{
			"id" : "_koda_type",
			"control" : "input-hidden",
			"defaultValue" : "/koda/koda-types/koda-twitterfeed.js"
		},	
		{
			"id" : "_koda_editor",
			"control" : "input-hidden",
			"defaultValue" : "/koda/koda-editors/twitterfeed-editor.html"
		},
		{
			"id" : "_koda_indexes",
			"control" : "input-hidden",
			"defaultValue" : "name,tags"
		},
		{
			"id" : "datecreated",
			"control" : "input-hidden",
			"defaultValue" : "<%=timestamp%>"
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
			"control" : "input-text",
			"defaultValue" : ""
		},
		{
			"id" : "alias",
			"title" : "Alias",
			"description" : "This will be generated from the title",
			"control" : "input-readonly",
			"defaultValue" : ""
		},
		{
			"id" : "user_count",
			"title" : "How many?",
			"description" : "The amount of latest messages to include (1-10)",
			"control" : "input-range",
			"defaultValue" : "",
			"properties" : "min='1' max='10'"
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
			"control" : "input-text",
			"defaultValue" : ""
		},
		{
			"id" : "query_count",
			"title" : "How many?",
			"description" : "The amount of latest messages to include (1-10)",
			"control" : "input-range",
			"defaultValue" : "",
			"properties" : "min='1' max='10'"
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