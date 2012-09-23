{
	"title"  : "User Access Editor",
	"fields" : [
		{
			"id" : "_koda_type",
			"control" : "input-hidden",
			"defaultValue" : "/koda/koda-types/koda-access.js"
		},
		{
			"id" : "_koda_hidden_file",
			"control" : "input-hidden",
			"defaultValue" : "true"
		},
		{
			"id" : "_koda_editor",
			"control" : "input-hidden",
			"defaultValue" : "/koda/koda-editors/generic-editor.html"
		},
		{
			"id" : "_koda_ref",
			"control" : "input-hidden",
			"defaultValue" : "access-control"
		},
		{
			"id" : "read_users",
			"title" : "Users with read access",
			"description" : "Comma separated users that are allowed to view this collection (* for all, - for admin only)",
			"control" : "input-text",
			"properties" : "required",
			"defaultValue" : "*"
		},
		{
			"id" : "write_users",
			"title" : "Users with write access",
			"description" : "Comma separated users that are allowed to write to this collection (* for all, - for admin only)",
			"control" : "input-text",
			"properties" : "required",
			"defaultValue" : "*"
		},
		{
			"id" : "modify_users",
			"title" : "Users with modify access",
			"description" : "Comma separated users that are allowed to write to this collection (* for all, - for admin only)",
			"control" : "input-text",
			"properties" : "required",
			"defaultValue" : "*"
		}
	]
}