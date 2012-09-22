{
	"fields" : [
		{
			"id" : "_koda_type",
			"control" : "input-hidden",
			"defaultValue" : "/koda/koda-types/koda-restriction.js"
		},	
		{
			"id" : "_koda_editor",
			"control" : "input-hidden",
			"defaultValue" : "/koda/koda-editors/generic-editor.html"
		},
		{
			"id" : "_koda_ref",
			"title" : "Restriction Type",
			"description" : "Choose a restriction type",
			"control" : "collection",
			"values" : "restrict-public,restrict-password,restrict-users",
			"defaultValue" : ""
		},
		{
			"id" : "restrict",
			"title" : "Restriction Info",
			"description" : "Either the restriction password or the users (comma seperated)",
			"control" : "input-text",
			"properties" : "",
			"defaultValue" : ""
		}
	]
}